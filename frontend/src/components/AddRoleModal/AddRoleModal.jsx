
import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FiX } from "react-icons/fi";

import {
  Overlay,
  ModalContainer,
  ModalHeader,
  CloseButton,
  ModalBody,
  FormGrid,
  FormGroup,
  Input,
  Select,
  ErrorText,
  ModalFooter,
  CancelButton,
  SubmitButton,
} from "../AdduserModal/AddUserModal.style";
import { useRBACStore } from "../../store/rbacStore";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Role name is required"),

  description: Yup.string(),

  policies: Yup.array()
    .of(Yup.string())
    .min(1, "Select at least one policy"),
});


const AddRoleModal = ({ isOpen, onClose, onSubmit, isEdit, selectedRole }) => {
  if (!isOpen) return null;
  
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const initialValues = isEdit ? selectedRole : {
    name: "",
    description: "",
    policies: [],
  };
  
  const {
    policies,
    fetchPolicies,
    addRole,
    updateRole
  } = useRBACStore();

  useEffect(() => {
    fetchPolicies();
  }, [fetchPolicies]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if(isEdit) {
        updateRole(selectedRole?.id, values).then(({status}) => {
          if (status !== 200) {
            setSubmitting(false);
          }
          setSubmitting(false);
          onSubmit();
          onClose();
        })
      } else {
        await addRole(values).then(() => {
          setSubmitting(false);
          onSubmit();
          onClose();
        })
      }
    } catch (error) {
      console.error("Role creation failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Overlay onMouseDown={handleOverlayClick}>
      <ModalContainer
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-Role-title"
      >
        <ModalHeader>
          <div>
            <h3 id="add-Role-title">Add New Role</h3>
            <p>Create a new Role account for GateFlow.</p>
          </div>

          <CloseButton type="button" onClick={onClose}>
            <FiX />
          </CloseButton>
        </ModalHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <ModalBody>
                <FormGrid>

                  <FormGroup $fullWidth>
                    <label>Role Name *</label>

                    <Field
                      as={Input}
                      name="name"
                      placeholder="Enter role name"
                      $error={touched.name && errors.name}
                    />

                    {touched.name && errors.name && (
                      <ErrorText>{errors.name}</ErrorText>
                    )}
                  </FormGroup>

                  <FormGroup $fullWidth>
                    <label>Description</label>

                    <Field
                      as={Input}
                      name="description"
                      placeholder="Enter role description"
                    />
                  </FormGroup>

                  <FormGroup $fullWidth>
                    <label>Assign Policies *</label>

                    <Field
                      as={Select}
                      name="policies"
                      multiple
                      style={{ minHeight: "120px" }}
                    >
                      {policies.map((policy) => (
                        <option key={policy.uuid} value={policy.uuid}>
                          {policy.name}
                        </option>
                      ))}
                    </Field>

                    {touched.policies && errors.policies && (
                      <ErrorText>{errors.policies}</ErrorText>
                    )}
                  </FormGroup>

                </FormGrid>
              </ModalBody>

              <ModalFooter>
                <CancelButton type="button" onClick={onClose}>
                  Cancel
                </CancelButton>

                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isEdit ? isSubmitting ? "Updating..." : "Update User" : isSubmitting ? "Creating..." : "Create Role"}
                </SubmitButton>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContainer>
    </Overlay>
  );
};

export default AddRoleModal;
