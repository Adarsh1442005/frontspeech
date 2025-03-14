import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const Protect = () => {
    const isAuthenticated =Cookies.get('token') !== undefined && Cookies.get('token') !== null;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default Protect;
