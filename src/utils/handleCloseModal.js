import { store } from "@redux/store";
import { setModalAttribute } from "@redux/reducers/base/modalAttribute.reducers";

export const handleCloseModal = () => {
  // const state = store.getState();
  // const modalAttribute = state?.modalAttribute?.data;
  store.dispatch(
    setModalAttribute({
      // ...modalAttribute,
      type: null,
      isVisible: false,
    }),
  );
  // setTimeout(() => {
  //   store.dispatch(
  //     setModalAttribute({
  //       isVisible: false,
  //       type: null,
  //     }),
  //   );
  // }, 150);
};
