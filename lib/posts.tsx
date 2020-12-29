import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import axios from 'axios'
import { defaultCoreCipherList } from 'constants'



const postsDir = path.join(process.cwd(), 'posts')


/* 

getSortedPostsData: returns allPostsData
getAllPostIds: returns id from API data objects
getPostData; returns post by its id 
 */



interface Post {
  // <-- Typescript code which means here Todo 'interface 'is a object withe the three properties
  id: string
  // userId: number
  title: string
  body: string
}

interface PostIds {
  params: {
    id: string
  }
}




export const getSortedPostsData = () => {
  const fileNames = fs.readdirSync(postsDir)
  const allPostsData = fileNames.map((file) => {
    const id = file.replace(/\.md$/, '')

    const fullPath = path.join(postsDir, file)
    const fileContent = fs.readFileSync(fullPath)

    const matterResult = matter(fileContent)
    // console.log(matterResult);
    return {
      id, ...(matterResult.data as { date: string, title: string })
    }

  })

  // console.log(allPostsData)

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}


export const getSortedPostsDataAPI = async () => {

  const url = 'https://jsonplaceholder.typicode.com/posts'




  const { data } = await axios.get(url)

  //console.log(data);
  const json = JSON.stringify(data)
  return json



}

// console.log(getSortedPostsDataAPI())

export const getAllPostIds = () => {

  const fileNames = fs.readdirSync(postsDir)
  /* 
    Example for publick API  -  Instead of the file system,  fetch post data from an external API endpoint
    const res = await fetch('..')
    const posts = await res.json()
  */

  const allPostIds = fileNames.map((file) => {

    return {
      params: {
        id: file.replace(/\.md$/, '')
      }
    }
  })

  return allPostIds

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]

}

export const getAllPostIdsAPI = async () => {

  const url = 'https://jsonplaceholder.typicode.com/posts/'
  const { data } = await axios.get(url)

  const postIds = data.map((post: Post): PostIds => {
    return {
      params: {
        id: post.id + 'A'
      }
    }

  })

  // const json = JSON.stringify(postIds)
  return postIds
}


export const getPostData = async (id: string) => {
  const fullPath = path.join(postsDir, `${id}.md`)
  const fileContent = fs.readFileSync(fullPath)

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContent)

  // Use remark to convert markdown into HTML string
  const content = await remark().use(html).process(matterResult.content)
  const contentHtml = content.toString()
  return {
    id, contentHtml, ...(matterResult.data as { title: string, date: string })
  }
}

export const getPostDataAPI = async (id: string) => {
  const idMinusA = id.slice(0, id.length - 1)
  const url = `https://jsonplaceholder.typicode.com/posts/${idMinusA}`
  const { data } = await axios.get(url)

  //const json = JSON.stringify(data)

  return data

}
