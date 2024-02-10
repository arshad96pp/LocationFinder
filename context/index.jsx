import { createContext, useState } from "react";
import React from "react-native";

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [storLocation, setStorLocation] = useState([]);
  const getAllSelectedLocation = (value) => {
    setStorLocation((priv) => [...priv, value]);
  };
  return (
    <AppContext.Provider value={{ getAllSelectedLocation,storLocation }}>{children}</AppContext.Provider>
  );
}

export { AppContextProvider };
