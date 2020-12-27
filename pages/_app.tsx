// import Glbal CSS. Only possible in pages/_app.js
import '../styles/global.css'
//import 'bootstrap/dist/css/bootstrap.css'
import { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return < Component {...pageProps} />
}

export default App