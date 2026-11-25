
import styled, { keyframes } from "styled-components";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const gradientRightAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  animation: ${gradientAnimation} 10s ease infinite;
  background: linear-gradient(
    -45deg, #ff6b6b, #ff8e53, #f06292, #ce93d8
  );
  background-size: 400% 400%;
`;

export const LoginLeftSection = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  box-sizing: border-box;

  @media (max-width: 900px) {
    width: 100%;
    min-height: 200px;
  }
`;

export const LoginRightSection = styled.div`
  width: 50%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  box-sizing: border-box;

  background: linear-gradient(
    135deg, #ca7481, #c94f62, #a53a4d
  );
  background-size: 300% 300%;
  animation: ${gradientRightAnimation} 12s ease infinite;

  @media (max-width: 900px) {
    width: 100%;
    min-height: 500px;
    padding: 24px;
  }
`;

export const LoginForm = styled.form`
  width: 100%;
  max-width: 400px;
`;

export const WelcomeHeading = styled.h1`
  color: #f6eced;
  font-size: 3rem;
  font-weight: 700;
`;

export const LoginHeading = styled.h2`
  color: #f5e8ea;
  font-size: 2rem;
  margin-bottom: 24px;
`;

export const ErrorMessage = styled.p`
  color: white;
  font-size: 14px;
  margin: 12px 0;
`;

export const InputWrapper = styled.div`
  width: 100%;
  margin: 16px 0;
`;

export const StyledInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  font-size: 1rem;
  color: #333;
  background: white;
  border: 1px solid ${({ $hasError }) =>
    $hasError ? "#ffffff" : "#ddd"};
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #792830;
    box-shadow: 0 0 0 2px rgba(121, 40, 48, 0.15);
  }
`;

export const HelperText = styled.span`
  display: block;
  color: white;
  font-size: 12px;
  margin-top: 5px;
`;

export const LoginButton = styled.button`
  width: 100%;
  margin-top: 24px;
  padding: 12px 16px;
  background: #792830;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #5f1e26;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
