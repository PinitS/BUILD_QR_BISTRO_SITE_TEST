import { Provider } from "react-redux";
import { store } from "@redux/store";
import "@styles/globals.css";
import "@assets/fonts/fonts.css";
import Modal from "react-modal";

Modal.setAppElement("#__next");

export default ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};
