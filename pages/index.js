import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (


    <Layout home>
      <Head>
        <title>{siteTitle}</title>

      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello I am Seongsoo.</p>
        <p>Software Engineer & a muso.</p>
        <p> Follow me on <a
          class="btn btn-outline-light btn-social mx-1"
          href="https://twitter.com/lompur"
        ><i classname="faw fa-fw fa-twitter"> </i
        >Twitter</a></p>
        <p>This is exercise webpage using Next.JS, a React framwork, helps easy way to build React application </p>
      </section>
    </Layout>



  )



}
