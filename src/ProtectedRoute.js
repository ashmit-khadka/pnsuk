import React, {useContext} from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { LoginContext } from './components/admin/Login';

const ProtectedRoutes = () => {
    const { setLoginData } = useContext(LoginContext);

    return setLoginData ? <Outlet /> : <Navigate to="/"/> // Redirect to login if not authenticated
}

export default ProtectedRoutes;