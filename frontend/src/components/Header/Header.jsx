
import React from "react";
import { FiMenu, FiBell, FiUser } from "react-icons/fi";

import {
  HeaderContainer,
  HeaderLeft,
  HeaderRight,
  Brand,
  IconButton,
  Profile,
  Avatar,
} from "./Header.style";

const Header = ({ toggleSidebar }) => {
  return (
    <HeaderContainer>
      <HeaderLeft>
        <IconButton onClick={toggleSidebar}>
          <FiMenu />
        </IconButton>

        <Brand>GateFlow</Brand>
      </HeaderLeft>

      <HeaderRight>
        <IconButton>
          <FiBell />
        </IconButton>

        <Profile>
          <Avatar>
            <FiUser />
          </Avatar>
          <span>Admin</span>
        </Profile>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;
