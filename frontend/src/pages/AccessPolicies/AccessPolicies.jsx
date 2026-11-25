
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FiPlus,
  FiShield,
} from "react-icons/fi";

import {
  PageContainer,
  PageHeader,
  PageTitle,
  PageDescription,
  CreateButton,
  SectionTitle,
  PolicyGrid,
  PolicyCard,
  PolicyIcon,
  PolicyName,
  PolicyDescription,
  PolicyFooter,
  PermissionCount,
  PolicyBadge,
} from "./AccessPolicies.style";
import CreatePolicyModal from "../../components/CreatePolicyModal/CreatePolicyModal";
import { useRBACStore } from "../../store/rbacStore";
import { LayoutContext } from "../../contexts/Layoutcontext";

const AccessPolicies = () => {
  const {setActiveNavItem} = useContext(LayoutContext)
  const {
      policies,
      fetchPolicies,
      deletePolicy,
  } = useRBACStore();

  useEffect(() => {
      fetchPolicies();
      setActiveNavItem(3);
  }, [fetchPolicies]);

  const [showModal, setShowModal] = useState(false);

  const totalPermissions = (permissions) => {
    return Object.values(permissions).reduce(
      (total, permissions) => total + permissions.length,
      0
    );
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this policy?")) return;

    try {
        await deletePolicy(id);
        toast.success("Polucy deleted successfully");
    } catch (error) {
        toast.error(
            error.response?.data?.message || "Unable to delete policy"
        );
    }
  };

  return (
    <PageContainer>
      <PageHeader>
        <div>
          <PageTitle>Access Policy</PageTitle>
          <PageDescription>
            Manage access policies and module permissions.
          </PageDescription>
        </div>

        <CreateButton onClick={() => setShowModal(true)}>
          <FiPlus size={18} />
          Create New Policy
        </CreateButton>
      </PageHeader>

      <SectionTitle>Default Policies</SectionTitle>

      <PolicyGrid>
        {policies?.map((policy, index) => (
          <PolicyCard key={policy.id}>
            <PolicyIcon>
              {policy.icon || <FiShield />}
            </PolicyIcon>

            <PolicyName>{policy.name}</PolicyName>

            <PolicyDescription>
              {policy.description}
            </PolicyDescription>

            <PolicyFooter>
              <PermissionCount>
                {totalPermissions(policy.permissions)} Permissions
              </PermissionCount>

              {policy?.is_default
                ? 
                <PolicyBadge>
                  Default
                </PolicyBadge>
                : 
                <button
                    className="delete-btn"
                    onClick={() => handleDelete(policy.id)} 
                >
                    Delete
                </button>
              }
            </PolicyFooter>
          </PolicyCard>
        ))}
      </PolicyGrid>

      <CreatePolicyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </PageContainer>
  );
};

export default AccessPolicies;
