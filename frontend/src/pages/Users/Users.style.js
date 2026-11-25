
import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;

  @media (max-width: 600px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const PageTitle = styled.h2`
  font-size: 23px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

export const PageDescription = styled.p`
  font-size: 14px;
  color: #94a3b8;
  margin: 5px 0 0;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 18px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #1d4ed8;
  }
`;

export const TableCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
`;

export const TableToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  padding: 18px 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchInput = styled.input`
  width: 280px;
  padding: 10px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 7px;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #2563eb;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;

  th {
    padding: 14px 20px;
    background: #f8fafc;
    color: #64748b;
    font-size: 12px;
    font-weight: 700;
    text-align: left;
    text-transform: uppercase;
    border-top: 1px solid #f1f5f9;
    border-bottom: 1px solid #e5e7eb;
  }

  td {
    padding: 16px 20px;
    font-size: 14px;
    color: #475569;
    border-bottom: 1px solid #f1f5f9;
  }

  tbody tr:hover {
    background: #f8fafc;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
  .action_field {
    display: flex;
    gap: 8px;
  }

  .delete-btn {
    background: #fee2e2;
    color: #dc2626;
    border: none;
    padding: 6px 12px;
    border-radius: 5px;
    cursor: pointer;
  }

  .delete-btn:hover {
    background: #fecaca;
  }

  .view-btn {
    background: #7eecb0ff;
    color: #067a40ff;
    border: none;
    padding: 6px 12px;
    border-radius: 5px;
    cursor: pointer;
  }

  .view-btn:hover {
    background: #20dd8eff;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #eff6ff;
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
`;

export const UserName = styled.div`
  color: #1e293b;
  font-weight: 600;
`;

export const UserEmail = styled.div`
  color: #94a3b8;
  font-size: 12px;
  margin-top: 3px;
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 5px 11px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;

  background: ${({ $status }) =>
    $status ? "#dcfce7" : "#fee2e2"};

  color: ${({ $status }) =>
    $status ? "#15803d" : "#dc2626"};
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 18px 20px;
  border-top: 1px solid #e5e7eb;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const PaginationInfo = styled.span`
  color: #64748b;
  font-size: 13px;
`;

export const PaginationButtons = styled.div`
  display: flex;
  gap: 6px;
`;

export const PageButton = styled.button`
  min-width: 34px;
  height: 34px;
  padding: 0 9px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: ${({ $active }) =>
    $active ? "#2563eb" : "#ffffff"};
  color: ${({ $active }) =>
    $active ? "#ffffff" : "#64748b"};
  cursor: pointer;
  font-size: 13px;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    border-color: #2563eb;
  }
`;

export const EmptyMessage = styled.td`
  text-align: center !important;
  padding: 35px !important;
  color: #94a3b8 !important;
`;
