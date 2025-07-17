import { setModalAttribute } from "@redux/reducers/base/modalAttribute.reducers";
import { setActiveMenu } from "@redux/reducers/editor/activeMenu.reducers";
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

  const handleCloseModal = () => {
    batch(() => {
      dispatch(setActiveMenu(null));
      dispatch(setModalAttribute({ ...modalAttribute, isVisible: false }));
    });
  };

  return (
    <ModalLib
      isOpen={_.get(modalAttribute, ["isVisible"])}
      onRequestClose={() => handleCloseModal()}
      style={CustomStyles}
      closeTimeoutMS={250}
      shouldCloseOnOverlayClick={true}
    >
      {children}
    </ModalLib>
  );
};
