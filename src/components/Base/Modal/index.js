import { setActiveMenu } from "@redux/reducers/editor/activeMenu.reducers";
import { handleCloseModal } from "@utils/handleCloseModal";
import _ from "lodash";
import React from "react";
import ModalLib from "react-modal";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";

const CustomStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1000,
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: 0,
    border: "none",
    transform: "translate(-50%, -50%)",
    borderRadius: "12px",
    overflow: "hidden",
  },
};

export const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const modalAttribute = useSelector((state) => state?.modalAttribute?.data, shallowEqual);

  const onRequestClose = () => {
    batch(() => {
      dispatch(setActiveMenu(null));
      // dispatch(setActiveMenu(null));
    });
    handleCloseModal();
  };

  return (
    <ModalLib
      isOpen={_.get(modalAttribute, ["isVisible"])}
      onRequestClose={() => onRequestClose()}
      style={CustomStyles}
      closeTimeoutMS={250}
      shouldCloseOnOverlayClick={true}
    >
      {children}
    </ModalLib>
  );
};
