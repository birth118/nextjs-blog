import Layout from '../../components/layout'
import Date from '../../components/date'
import Head from 'next/head'
import { getAllPostIdsAPI, getPostDataAPI } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next' // For typescript

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // {params} will change per requested page
  // this built-in callback fetches a single data for the params.id and return it as props
  //console.log(params);

  const postData = await getPostDataAPI(params!.id as string)
  console.log(postData);
  //const aPost = JSON.parse(postData)
  return {
    props: {
      postData,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // this built-in callback will return an array of values of srting 'id'

  const paths = await getAllPostIdsAPI()
  //const paths = JSON.parse(json)


  // const paths = [
  //   { params: { id: '1' } },
  //   { params: { id: '2' } },
  //   { params: { id: '3' } },
  //   { params: { id: '4' } }

  // ]

  // paths that looks like this:
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

  return {
    paths,
    fallback: false, //'false': any paths not returned by getStaticPaths will result in a 404 page.
  }
}

interface PostData {
  title: string
  body: string
  id: string
}

const Post = ({ postData }: { postData: PostData }) => {
  return (


    <Layout>
      <Head>
        <title>blog_{postData.id} </title>
      </Head>


      <h1 className={`${utilStyles.headingXl} ${utilStyles.lightText}`}>{postData.title} </h1>
      <br />
      <h4 className={utilStyles.headingLg}>{postData.body} </h4>


    </Layout>
  )
}

export default Post
