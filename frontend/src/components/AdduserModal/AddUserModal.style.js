
import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 2000;
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 520px;
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: modalOpen 0.25s ease;

  @keyframes modalOpen {
    from {
      opacity: 0;
      transform: translateY(15px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 25px;
  border-bottom: 1px solid #e5e7eb;

  h3 {
    font-size: 19px;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
  }

  p {
    font-size: 13px;
    color: #94a3b8;
    margin: 5px 0 0;
  }
`;

export const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 7px;
  background: #f1f5f9;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background: #e2e8f0;
  }
`;

export const ModalBody = styled.div`
  padding: 25px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  grid-column: ${({ $fullWidth }) =>
    $fullWidth ? "1 / -1" : "auto"};

  label {
    font-size: 13px;
    font-weight: 600;
    color: #475569;
  }
`;

export const Input = styled.input`
  height: 42px;
  padding: 0 12px;
  border: 1px solid ${({ $error }) =>
    $error ? "#ef4444" : "#e2e8f0"};
  border-radius: 7px;
  outline: none;
  color: #334155;
  font-size: 14px;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.08);
  }

  &::placeholder {
    color: #b0bac8;
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 1px solid #e2e8f0;
  border-radius: 7px;
  outline: none;
  background: #ffffff;
  color: #334155;
  font-size: 14px;

  &:focus {
    border-color: #2563eb;
  }
`;

export const ErrorText = styled.span`
  color: #ef4444;
  font-size: 11px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 18px 25px;
  border-top: 1px solid #e5e7eb;
  background: #fafbfc;
`;

export const Button = styled.button`
  padding: 10px 18px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
`;

export const CancelButton = styled(Button)`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  color: #64748b;

  &:hover {
    background: #f1f5f9;
  }
`;

export const SubmitButton = styled(Button)`
  background: #2563eb;
  border: 1px solid #2563eb;
  color: #ffffff;

  &:hover {
    background: #1d4ed8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
