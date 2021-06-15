import React from 'react';
import { useAuthData } from '../contexts/AuthProvider';
import { Route, Navigate } from 'react-router-dom';
const PrivateRoute = ({ path, ...props }) => {
  const { isLoggedIn } = useAuthData();
  return isLoggedIn ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
};

export { PrivateRoute };
