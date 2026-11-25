
import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 750px;
  max-height: 90vh;
  background: #ffffff;
  border-radius: 13px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
`;

export const ModalHeader = styled.div`
  padding: 22px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e5e7eb;

  h3 {
    color: #1e293b;
    font-size: 19px;
    margin: 0;
    font-weight: 700;
  }

  p {
    color: #94a3b8;
    font-size: 13px;
    margin: 5px 0 0;
  }
`;

export const CloseButton = styled.button`
  border: none;
  background: #f1f5f9;
  color: #64748b;
  border-radius: 7px;
  width: 32px;
  height: 32px;
  font-size: 18px;
  cursor: pointer;
`;

export const ModalBody = styled.div`
  padding: 22px 25px;
  overflow-y: auto;
`;

export const PolicyDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 25px;

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  label {
    font-size: 13px;
    font-weight: 600;
    color: #475569;
  }
`;

export const Input = styled.input`
  height: 40px;
  padding: 0 12px;
  border: 1px solid #e2e8f0;
  border-radius: 7px;
  outline: none;
  font-size: 13px;

  &:focus {
    border-color: #2563eb;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 40px;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 7px;
  resize: vertical;
  outline: none;
  font-size: 13px;

  &:focus {
    border-color: #2563eb;
  }
`;

export const PermissionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  gap: 10px;

  h4 {
    font-size: 15px;
    color: #1e293b;
    margin: 0;
    font-weight: 700;
  }

  span {
    font-size: 12px;
    color: #64748b;
  }
`;

export const ModuleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ModuleCard = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 9px;
  overflow: hidden;
`;

export const ModuleHeader = styled.div`
  padding: 13px 15px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const ModuleName = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #334155;
  font-weight: 600;
`;

export const PermissionOptions = styled.div`
  padding: 14px 16px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 13px;

  @media (max-width: 550px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #64748b;
  cursor: pointer;

  input {
    width: 15px;
    height: 15px;
    accent-color: #2563eb;
    cursor: pointer;
  }
`;

export const ModalFooter = styled.div`
  padding: 17px 25px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  border-top: 1px solid #e5e7eb;
  background: #fafbfc;
`;

export const FooterButton = styled.button`
  padding: 10px 18px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

export const CancelButton = styled(FooterButton)`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  color: #64748b;
`;

export const SaveButton = styled(FooterButton)`
  background: #2563eb;
  border: 1px solid #2563eb;
  color: #ffffff;

  &:hover {
    background: #1d4ed8;
  }
`;
