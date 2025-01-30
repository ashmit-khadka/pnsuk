import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router';
import LoginContext from './LoginContext';


const ProtectedRoutes = () => {
  const { loginState } = useContext(LoginContext);

  return loginState ? <Outlet /> : <Navigate to="/admin" />; // Redirect to login if not authenticated
};

export default ProtectedRoutes;