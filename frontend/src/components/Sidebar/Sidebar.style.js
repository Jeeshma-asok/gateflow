
import styled from "styled-components";

export const SidebarContainer = styled.aside`
  width: ${({ $isOpen }) => ($isOpen ? "250px" : "0")};
  min-width: ${({ $isOpen }) => ($isOpen ? "250px" : "0")};
  height: 93vh;
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 32px;
  overflow: hidden;
  transition: all 0.3s ease;
`;

export const MenuLabel = styled.p`
  color: #94a3b8;
  font-size: 11px;
  font-weight: 700;
  padding: 0 12px;
  letter-spacing: 1px;
  white-space: nowrap;
`;

export const MenuItem = styled.a`
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 12px;
  margin-top: 8px;
  border-radius: 8px;
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: 0.2s ease;

  svg {
    font-size: 19px;
    flex-shrink: 0;
  }

  &:hover,
  &.active {
    background: #eff6ff;
    color: #2563eb;
  }
`;

export const SidebarFooter = styled.div`
  border-top: 1px solid #e5e7eb;
`;
