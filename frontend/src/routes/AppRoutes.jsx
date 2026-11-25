import React, { Suspense } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import ErrorPage from "../pages/ErrorPage";
import { LayoutProvider } from "../contexts/Layoutcontext";
import Layout from "../components/Layout/Layout";
import ProtectedRoutes from "./ProtectedRoutes";
import Users from "../pages/Users/Users";
import Roles from "../pages/Roles/Roles";
import AccessPolicies from "../pages/AccessPolicies/AccessPolicies";
import Home from "../pages/Home/Home";

function AppRoutes() {
  return (
    <LayoutProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="*" element={<Navigate to="/page-not-found" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/page-not-found" element={<ErrorPage />} />
          <Route 
            element={
                <ProtectedRoutes>

                <Suspense 
                  fallback ={
                    <div className="global-loader">
                      <div className="loader"></div>
                      <img src="../assets/logo.png" alt="GateFlow" className='logoLoader'/>
                    </div>
                  }
                >
                  <Layout />
                </Suspense>
              </ProtectedRoutes>
            }
          >
            <Route
              path="/home"
              element={
                <Home />
              }
            />
            <Route
              path="/users"
              element={
                <Users />
              }
            />
            <Route
              path="/roles"
              element={
                <Roles />
              }
            />
            <Route
              path="/policies"
              element={
                <AccessPolicies />
              }
            />
          </Route>
        </Routes>
      </Router>
    </LayoutProvider>
    
  );
}

export default AppRoutes;
