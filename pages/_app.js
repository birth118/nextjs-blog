// import Glbal CSS. Only possible in pages/_app.js
import '../styles/global.css'
//import 'bootstrap/dist/css/bootstrap.css'

const App = ({ Component, pageProps }) => {
  return < Component {...pageProps} />
}

export default App