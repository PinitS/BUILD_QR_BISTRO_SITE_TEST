import { createContext, useContext } from "react";

const ContainerDimensionContext = createContext();

export const useContainerDimensionContext = () => {
  return useContext(ContainerDimensionContext);
};

export default ContainerDimensionContext;
