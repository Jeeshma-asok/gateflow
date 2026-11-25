
import React, { useEffect, useState } from "react";
import { FiX, FiUsers, FiShield, FiSettings, FiFileText } from "react-icons/fi";

import {
  Overlay,
  ModalContainer,
  ModalHeader,
  CloseButton,
  ModalBody,
  PolicyDetails,
  FormGroup,
  Input,
  TextArea,
  PermissionHeader,
  ModuleList,
  ModuleCard,
  ModuleHeader,
  ModuleName,
  PermissionOptions,
  CheckboxLabel,
  ModalFooter,
  CancelButton,
  SaveButton,
} from "./CreatePolicyModal.style";
import { useRBACStore } from "../../store/rbacStore";

export const permissionModules = [
  {
    id: "users",
    name: "User Management",
    icon: <FiUsers />,
    permissions: ["View", "Create", "Edit", "Delete", "Export"],
  },
  {
    id: "roles",
    name: "Role Management",
    icon: <FiShield />,
    permissions: ["View", "Create", "Edit", "Delete"],
  },
  {
    id: "permissions",
    name: "Permission Management",
    icon: <FiFileText />,
    permissions: ["View", "Create", "Edit", "Delete", "Assign"],
  },
  {
    id: "settings",
    name: "System Settings",
    icon: <FiSettings />,
    permissions: ["View", "Edit", "Update"],
  },
];

const CreatePolicyModal = ({ isOpen, onClose, onCreate }) => {
  if (!isOpen) return null;

  const [policyName, setPolicyName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState({});
  
  
  const { 
    permissions,
    fetchPermissions,
    addPolicy 
  } = useRBACStore ();

  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  const togglePermission = (moduleId, permission) => {
    setSelectedPermissions((prev) => {
      const current = prev[moduleId] || [];
      
      const updated = current.includes(permission)
      ? current.filter((item) => item !== permission)
      : [...current, permission];
      
      return {
        ...prev,
        [moduleId]: updated,
      };
    });
  };
  
  const toggleModule = (module) => {
    setSelectedPermissions((prev) => {
      const current = prev[module.id] || [];
      
      return {
        ...prev,
        [module.id]:
        current.length === module.permissions.length
        ? []
        : [...module.permissions],
      };
    });
  };
  
  const totalSelected = Object.values(selectedPermissions)
  .reduce((total, permissions) => total + permissions.length, 0);
  
  const handleSubmit = async () => {
    if (!policyName.trim()) {
      alert("Please enter a policy name");
      return;
    }

    if (totalSelected === 0) {
      alert("Please select at least one permission");
      return;
    }

    const payload = {
      name: policyName.trim(),
      description,
      permissions: selectedPermissions,
    };

    await addPolicy(payload).then(() => {
        setPolicyName("");
        setDescription("");
        setSelectedPermissions({});
        onClose();
      })
  };

  const handleClose = () => {
    setPolicyName("");
    setDescription("");
    setSelectedPermissions({});
    onClose();
  };

  return (
    <Overlay onMouseDown={(e) => {
      if (e.target === e.currentTarget) handleClose();
    }}>
      <ModalContainer>
        <ModalHeader>
          <div>
            <h3>Create New Policy</h3>
            <p>Define modules and permissions for this policy.</p>
          </div>

          <CloseButton onClick={handleClose}>
            <FiX />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <PolicyDetails>
            <FormGroup>
              <label>Policy Name *</label>
              <Input
                placeholder="Enter policy name"
                value={policyName}
                onChange={(e) => setPolicyName(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <label>Description</label>
              <Input
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
          </PolicyDetails>

          <PermissionHeader>
            <h4>Module Permissions</h4>
            <span>{totalSelected} selected</span>
          </PermissionHeader>

          <ModuleList>
            {permissions.map((module) => {
              const selected = selectedPermissions[module.id] || [];

              const isAllSelected =
                selected.length === module.permissions.length;

              return (
                <ModuleCard key={module.id}>
                  <ModuleHeader>
                    <ModuleName>
                      {module.icon}
                      {module.name}
                    </ModuleName>

                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={() => toggleModule(module)}
                      />
                      Select All
                    </CheckboxLabel>
                  </ModuleHeader>

                  <PermissionOptions>
                    {module.permissions.map((permission) => (
                      <CheckboxLabel key={permission?.name}>
                        <input
                          type="checkbox"
                          checked={selected.includes(permission?.uuid)}
                          onChange={() =>
                            togglePermission(module.id, permission?.uuid)
                          }
                        />
                        {permission?.name}
                      </CheckboxLabel>
                    ))}
                  </PermissionOptions>
                </ModuleCard>
              );
            })}
          </ModuleList>
        </ModalBody>

        <ModalFooter>
          <CancelButton onClick={handleClose}>
            Cancel
          </CancelButton>

          <SaveButton onClick={handleSubmit}>
            Create Policy
          </SaveButton>
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
};

export default CreatePolicyModal;
