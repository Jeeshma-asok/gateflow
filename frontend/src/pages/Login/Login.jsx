
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import {
  LoginContainer,
  LoginLeftSection,
  LoginRightSection,
  LoginForm,
  WelcomeHeading,
  LoginHeading,
  ErrorMessage,
  InputWrapper,
  StyledInput,
  HelperText,
  LoginButton,
} from "./Login.style";
import { useAuthStore } from "../../store/authStore";

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required"),
});

const Login = ({}) => {

  const [loginError, setLoginError] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      await login(values);
      navigate("/");
    } catch (error) {
      const errMsg =
        error.response?.data?.detail ===
        "No active account found with the given credentials"
          ? "Invalid credentials"
          : error.response?.data?.detail || error.message || "Login failed";

      setLoginError(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LoginContainer>

      <LoginLeftSection>
        <WelcomeHeading>
          GateFlow.
        </WelcomeHeading>
      </LoginLeftSection>

      <LoginRightSection>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}
        >
          {({
            errors,
            touched,
            isSubmitting,
          }) => (
            <LoginForm as={Form}>

              <LoginHeading>
                Login.
              </LoginHeading>

              {loginError && (
                <ErrorMessage>
                  {loginError}
                </ErrorMessage>
              )}

              <InputWrapper>
                <Field
                  as={StyledInput}
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="email"
                  $hasError={touched.email && !!errors.email}
                />

                {touched.email && errors.email && (
                  <HelperText>
                    {errors.email}
                  </HelperText>
                )}
              </InputWrapper>

              <InputWrapper>
                <Field
                  as={StyledInput}
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  $hasError={
                    touched.password && !!errors.password
                  }
                />

                {touched.password && errors.password && (
                  <HelperText>
                    {errors.password}
                  </HelperText>
                )}
              </InputWrapper>

              <LoginButton
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </LoginButton>

            </LoginForm>
          )}
        </Formik>
      </LoginRightSection>

    </LoginContainer>
  );
};

export default Login;
