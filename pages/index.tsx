import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getAllPostIds, getSortedPostsData, getSortedPostsDataAPI } from '../lib/posts'
import axios from 'axios'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next' // For typescript

export const getStaticProps: GetStaticProps = async (context) => {


  //const url = 'https://jsonplaceholder.typicode.com/posts'

  //const { data: allPostData } = await axios.get(url)
  //console.log(data);

  const data = await getSortedPostsDataAPI()
  const allPostData = JSON.parse(data)

  return {
    props: {
      allPostData
    }

  }
}



export default function Home({ allPostData }: {
  allPostData: {
    id: string, title: string, body: string
  }[]
}) {

  return (


    <Layout home>
      <Head>
        <title>{siteTitle}</title>

      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello I am Seongsoo.</p>
        <p>Software Engineer & a muso.</p>
        <p> Follow me on <a
          // class="btn btn-outline-light btn-social mx-1"
          href="https://twitter.com/lompur"
        >Twitter</a></p>
        <p>This is exercise webpage using Next.JS, a React framwork, helps easy way to build React application </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blogs</h2>

        <ul>
          {allPostData.map((post) => {
            return (<li key={post.id} className={utilStyles.listItem}>
              <Link href={`/posts/${post.id}A`}>
                <a >{post.title} </a>
              </Link>
            </li>)
          })}
        </ul>

      </section>
    </Layout>



  )



}
