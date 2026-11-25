
import React, { useContext, useState } from "react";
import {
  FiHome,
  FiUsers,
  FiShield,
  FiSettings,
  FiFileText,
  FiLogOut,
} from "react-icons/fi";

import {
  SidebarContainer,
  MenuLabel,
  MenuItem,
  SidebarFooter,
} from "./Sidebar.style";
import { useNavigate } from "react-router-dom";
import { LayoutContext } from "../../contexts/Layoutcontext";

const navItems = [
  { title: "Home", icon: <FiHome />, path: "/home" },
  { title: "Users", icon: <FiUsers />, path: "/users" },
  { title: "Roles", icon: <FiShield />, path: "/roles" },
  { title: "Access Policies", icon: <FiFileText />, path: "/policies" },
];


const Sidebar = ({ isOpen }) => {

  const {activeNavItem, setActiveNavItem} = useContext(LayoutContext)
  const navigate = useNavigate()
  const handleLogOut = () => {
    localStorage.clear();
    navigate('/login')
  }

  return (
    <SidebarContainer $isOpen={isOpen}>
      <div>
        {navItems.map((item, index) => (
          <MenuItem
            key={item.path}
            className={index === activeNavItem ? "active" : ""}
            onClick={() => {
              setActiveNavItem(index);
              navigate(item?.path);
            }}
          >
            {item.icon}
            <span>{item.title}</span>
          </MenuItem>
        ))}
      </div>

      <SidebarFooter>
        <MenuItem onClick={handleLogOut}>
          <FiLogOut />
          <span>Logout</span>
        </MenuItem>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;
