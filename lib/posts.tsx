import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import axios from 'axios'


const postsDir = path.join(process.cwd(), 'posts')


/* 

getSortedPostsData: returns allPostsData
getAllPostIds: returns id from API data objects
getPostData; returns post by its id 
 */

// export const getAllPostIdsAPI = async () => {


//   const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
//   console.log(data.length)


//   const postIds = [{
//     params: {
//       id: '1'
//     }
//   }, {
//     params: {
//       id: '1'
//     }
//   }]


//   return postIds
// }

// export const getPostDataAPI = async (id: string) => {

//   // const post = await fetch('https://jsonplaceholder.typicode.com/posts/', id)
//   const { data: post } = await axios.get(`https://jsonplaceholder.typicode.com/posts/`, id)


//   return { post }
// }

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
