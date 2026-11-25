
import React, { useState } from "react";
import { Outlet } from 'react-router-dom';

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

import {
  LayoutContainer,
  MainContainer,
  Content,
} from "./Layout.style";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <LayoutContainer>
      <Header
        toggleSidebar={() => setIsOpen((prev) => !prev)}
      />

      <MainContainer>
        <Sidebar isOpen={isOpen} />

        <Content>
          <Outlet />
        </Content>
      </MainContainer>
    </LayoutContainer>
  );
};

export default Layout;
