// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token');

  return token ? <Component {...rest} /> : <Navigate element={<LoginPage/>}/>;
};

export default ProtectedRoute;
