import Layout from '../../components/layout'
import Date from '../../components/date'
import Head from 'next/head'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next' // For typescript

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // {params} will change per requested page
  // this built-in callback fetches a single data for the params.id and return it as props

  const postData = await getPostData(params!.id as string)
  //console.log(postData);
  return {
    props: {
      postData,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // this built-in callback will return an array of values of 'id'
  const paths = getAllPostIds()

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
  date: string
  contentHtml: string
  id: string
}

const Post = ({ postData }: { postData: PostData }) => {
  return (
    <Layout>
      <Head>
        <title>{postData.id}</title>
      </Head>

      <h1 className={utilStyles.headingXl}>{postData.title} </h1>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>

      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  )
}

export default Post
