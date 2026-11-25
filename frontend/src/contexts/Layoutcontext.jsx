import { createContext, useState, useEffect, useContext, useMemo } from "react";
// import { CONST, getDecryptedItem } from "../utls/constants";

export const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [activeNavItem, setActiveNavItem] = useState(0)
  // const menus = JSON.parse(getDecryptedItem(CONST.USER_MENUS));
  // const permission = JSON.parse(getDecryptedItem(CONST.USER_PERMISSIONS));
  
  const contextValue = useMemo(
    () => ({
      activeNavItem,
      setActiveNavItem
      // menus,
      // permission
    }),
    [activeNavItem] 
  );

  return <LayoutContext.Provider value={contextValue}>{children}</LayoutContext.Provider>;
};
