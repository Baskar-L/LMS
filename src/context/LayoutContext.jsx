import {
  createContext,
  useContext,
  useState,
} from "react";

const LayoutContext =
  createContext();

export const LayoutProvider = ({
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <LayoutContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () =>
  useContext(LayoutContext);