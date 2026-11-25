
import styled from "styled-components";

export const HomeContainer = styled.div`
  padding: 30px;
`;

export const WelcomeSection = styled.div`
  margin-bottom: 30px;

  h2 {
    font-size: 26px;
    font-weight: 700;
    color: #172554;
    margin-bottom: 8px;
  }

  p {
    color: #64748b;
    font-size: 15px;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 25px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  }

  span {
    font-size: 32px;
  }
`;

export const StatTitle = styled.p`
  color: #64748b;
  font-size: 14px;
  margin: 0 0 5px;
`;

export const StatValue = styled.h3`
  color: #172554;
  font-size: 27px;
  font-weight: 700;
  margin: 0;
`;

export const InfoSection = styled.div`
  margin-top: 30px;
  padding: 25px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;

  h4 {
    color: #172554;
    font-weight: 600;
    margin-bottom: 12px;
  }

  p, li {
    color: #64748b;
    font-size: 14px;
    line-height: 1.8;
  }

  ul {
    padding-left: 20px;
    margin-bottom: 0;
  }
`;
