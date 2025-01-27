import React, {useContext} from 'react'
import { Outlet, Navigate } from 'react-router';
import { LoginContext } from './components/admin/Login';

const ProtectedRoutes = () => {
    const { loginState } = useContext(LoginContext);

    return loginState ? <Outlet /> : <Navigate to="/"/> // Redirect to login if not authenticated
}

export default ProtectedRoutes;