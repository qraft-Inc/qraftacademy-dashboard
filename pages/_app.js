import "../styles/global.css";
import UserContextProvider from "../contexts/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";

  function MyApp({ Component, pageProps}) {
  return (
    <SessionProvider session={pageProps.session}>
      <UserContextProvider>
        <ToastContainer autoClose={1000} />
          <Component {...pageProps} />
      </UserContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
