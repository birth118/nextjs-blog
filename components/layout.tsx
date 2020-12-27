import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Head from 'next/head'
import Link from 'next/link'
const name = 'Seongsoo Yim'
export const siteTitle = 'Next.js Sample Exercise'

const Layout = ({ children, home }: {
  children: React.ReactNode, home?: boolean
}) => {
  return <div className={styles.container}>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta
        property="og:image"
        content={`https://og-image.now.sh/${encodeURI(siteTitle)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      <meta name="og:title" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <script
        src="https://use.fontawesome.com/releases/v5.15.1/js/all.js"
        crossOrigin="anonymous"
      ></script>

    </Head>


    <header className={styles.header}>
      {home ? (

        <div>
          <img src="/images/10239451.jpeg"
            className={`{styles.headerImage} ${utilStyles.borderCircle}`}
            alt={name} />
          <h1 className={utilStyles.heading2Xl}>{name}</h1>
        </div>

      ) : (
          <div>
            <Link href="/">
              <a>
                <img src="/images/10239451.jpeg"
                  className={`{styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={name} />
              </a>
            </Link>
            <h2>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </div>
        )}
    </header>

    <main>
      {children}
    </main>

    {!home && (
      <div className={styles.backHome}>
        <Link href="/">
          <a> Back to home</a>
        </Link>
      </div>
    )}


  </div>
}

export default Layout