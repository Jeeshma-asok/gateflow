
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
} from "./AddUserModal.style";
import { useRBACStore } from "../../store/rbacStore";



const AddUserModal = ({ isOpen, onClose, onSubmit, isEdit, selectedUser }) => {
  if (!isOpen) return null;
  
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const initialValues = isEdit ? selectedUser : {
    first_name: "",
    last_name: "",
    email: "",
    roles: "",
    password: "",
    confirmPassword: "",
  };
  
  const validationSchema = Yup.object({
    first_name: Yup.string()
      .trim()
      .required("Full name is required"),
    
    last_name: Yup.string()
      .trim(),
  
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  
    roles: Yup.array()
      .min(1, "Select at least one role")
      .required("Role is required"),
  
    password: isEdit
      ? Yup.string()
          .nullable()
          .notRequired()
      : Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),

    confirmPassword: isEdit
      ? Yup.string()
          .nullable()
          .notRequired()
      : Yup.string()
          .oneOf([Yup.ref("password")], "Passwords do not match")
          .required("Confirm your password"),
  });

  const {
    roles,
    fetchRoles,
    addUser,
    updateUser
  } = useRBACStore()

  useEffect(() => {
    fetchRoles()
  },[fetchRoles])

  const handleSubmit = (values, { setSubmitting }) => {
    const data = {"username": values?.email, ...values}
    if(isEdit) {
      updateUser(selectedUser?.id, data).then(({data, status}) => {
        if (status !== 200) {
          setSubmitting(false);
        }
        setSubmitting(false);
        onSubmit();
        onClose();
      })
    } else {
      addUser(data).then(({data, status}) => {
        if (status !== 200) {
          setSubmitting(false);
        }
        setSubmitting(false);
        onSubmit();
        onClose();
      })
    }
  };

  return (
    <Overlay onMouseDown={handleOverlayClick}>
      <ModalContainer
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-user-title"
      >
        <ModalHeader>
          <div>
            <h3 id="add-user-title">Add New User</h3>
            <p>Create a new user account for GateFlow.</p>
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
                  <FormGroup>
                    <label>First Name *</label>
                    <Field
                      as={Input}
                      name="first_name"
                      placeholder="Enter full name"
                      $error={touched.first_name && errors.first_name}
                    />
                    {touched.first_name && errors.first_name && (
                      <ErrorText>{errors.first_name}</ErrorText>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <label>Last Name</label>
                    <Field
                      as={Input}
                      name="last_name"
                      placeholder="Enter full name"
                      $error={touched.last_name && errors.last_name}
                    />
                    {touched.last_name && errors.last_name && (
                      <ErrorText>{errors.last_name}</ErrorText>
                    )}
                  </FormGroup>

                  <FormGroup $fullWidth>
                    <label>Email Address *</label>
                    <Field
                      as={Input}
                      name="email"
                      type="email"
                      placeholder="Enter email"
                      $error={touched.email && errors.email}
                    />
                    {touched.email && errors.email && (
                      <ErrorText>{errors.email}</ErrorText>
                    )}
                  </FormGroup>

                  <FormGroup $fullWidth>
                    <label>Roles *</label>

                    <Field
                      as={Select}
                      name="roles"
                      multiple
                      style={{ minHeight: "110px" }}
                    >
                      {roles.map((role) => (
                        <option key={role.uuid} value={role.uuid}>
                          {role.name}
                        </option>
                      ))}
                    </Field>

                    <small>Hold Ctrl (Windows/Linux) or Cmd (Mac) to select multiple roles.</small>

                    {touched.roles && errors.roles && (
                      <ErrorText>{errors.roles}</ErrorText>
                    )}
                  </FormGroup>
                  {!isEdit && (
                    <FormGroup>
                      <label>Password *</label>
                      <Field
                        as={Input}
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        $error={touched.password && errors.password}
                      />
                      {touched.password && errors.password && (
                        <ErrorText>{errors.password}</ErrorText>
                      )}
                    </FormGroup>
                  )}
                  {!isEdit && (
                    <FormGroup>
                      <label>Confirm Password *</label>
                      <Field
                        as={Input}
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        $error={
                          touched.confirmPassword && errors.confirmPassword
                        }
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <ErrorText>{errors.confirmPassword}</ErrorText>
                      )}
                    </FormGroup>
                  )}
                </FormGrid>
              </ModalBody>

              <ModalFooter>
                <CancelButton type="button" onClick={onClose}>
                  Cancel
                </CancelButton>

                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isEdit ? isSubmitting ? "Updating..." : "Update User" : isSubmitting ? "Creating..." : "Create User"}
                </SubmitButton>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContainer>
    </Overlay>
  );
};

export default AddUserModal;
