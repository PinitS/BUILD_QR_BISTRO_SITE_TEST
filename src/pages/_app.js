import { Provider } from "react-redux";
import { store } from "@redux/store";
import "@styles/globals.css";
import "@assets/fonts/fonts.css";
import Modal from "react-modal";
import { ContainerDimensionProvider } from "@contexts/containerDimension/ContainerDimensionProvider";

Modal.setAppElement("#__next");

export default ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <ContainerDimensionProvider>
        <Component {...pageProps} />
      </ContainerDimensionProvider>
    </Provider>
  );
};
