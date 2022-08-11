import '../styles/globals.css'
import { AuthProvider } from "../contexts/AuthContext";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {PrivateRoute} from './PrivateRoute'
import Axios from "axios";


function MyApp({ Component, pageProps }) {
  return (
    <>
    <Provider store={store}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
    </>
  )
}

export default MyApp
