
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

export const CreateButton = styled.button`
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

  &:hover {
    background: #1d4ed8;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 15px;
`;

export const PolicyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    }
    `;

export const PolicyCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  transition: 0.2s;
  
  &:hover {
    border-color: #bfdbfe;
    box-shadow: 0 5px 15px rgba(37, 99, 235, 0.06);
    }
    `;

export const PolicyIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eff6ff;
  color: #2563eb;
  font-size: 21px;
  margin-bottom: 15px;
`;

export const PolicyName = styled.h4`
  font-size: 16px;
  color: #1e293b;
  font-weight: 700;
  margin: 0 0 7px;
`;

export const PolicyDescription = styled.p`
  font-size: 13px;
  line-height: 1.6;
  color: #94a3b8;
  margin: 0 0 18px;
  min-height: 40px;
`;

export const PolicyFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #f1f5f9;
  padding-top: 14px;
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
`;

export const PermissionCount = styled.span`
  font-size: 12px;
  color: #64748b;
`;

export const PolicyBadge = styled.span`
  padding: 5px 10px;
  border-radius: 20px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 11px;
  font-weight: 600;
`;

export const EmptyState = styled.div`
  background: #ffffff;
  padding: 35px;
  text-align: center;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
  color: #94a3b8;
`;
