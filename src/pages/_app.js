import { Provider } from "react-redux";
import { store } from "@redux/store";
import "@styles/globals.css";
import "@assets/fonts/fonts.css";

export default ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};
