
import styled from "styled-components";

export const HeaderContainer = styled.header`
  height: 65px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const Brand = styled.h3`
  color: #2563eb;
  font-size: 22px;
  font-weight: 700;
  margin: 0;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const IconButton = styled.button`
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 21px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: #2563eb;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #334155;
`;

export const Avatar = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #e8efff;
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
`;
