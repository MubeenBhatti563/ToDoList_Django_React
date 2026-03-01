import React, { useContext } from "react";
import { ListProvider } from "./ListsContext";

const useLists = () => {
  const context = useContext(ListProvider);
  if (context === undefined)
    throw new Error("useLists used outside of ListProvider");
  return context;
};

export default useLists;
