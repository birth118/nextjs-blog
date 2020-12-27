import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {

  const allPostData = getSortedPostsData()

  return {
    props: {
      allPostData
    }
  }
}



export default function Home({ allPostData }: {
  allPostData: {
    id: string, title: string, date: string
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

          {allPostData.map(({ id, title, date }: {
            id: string, title: string, date: string
          }) =>
          (<li className={utilStyles.listItem} key={id}>

            <Link href={`/posts/${id}`}>
              <a >{title} </a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>

          </li>)
          )}
        </ul>

      </section>
    </Layout>



  )



}
