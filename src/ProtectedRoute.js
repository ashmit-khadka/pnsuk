import React, { useContext, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router';
import LoginContext from './LoginContext';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router';

const ProtectedRoutes = () => {
  const { loginState, setLoginState } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    const currentLoginState = Cookies.get('login') === 'true';
    if (currentLoginState) {
      setLoginState(true);
      navigate("/admin/dashboard/articles");
    }
  }, []);

  return loginState ? <Outlet /> : <Navigate to="/admin" />; // Redirect to login if not authenticated
};

export default ProtectedRoutes;