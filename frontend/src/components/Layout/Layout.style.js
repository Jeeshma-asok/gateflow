
import styled from "styled-components";

export const LayoutContainer = styled.div`
  min-height: 100vh;
`;

export const MainContainer = styled.div`
  display: flex;
`;

export const Content = styled.main`
  flex: 1;
  min-width: 0;
  padding: 25px;
  background: #f5f7fb;
  overflow-x: auto;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;
