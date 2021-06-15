import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Cart } from '../pages/Cart/Cart';
import { ProductList } from '../pages/ProductList/ProductList';
import { WishList } from '../pages/WishList/WishList';

import { PrivateRoute } from './PrivateRoute';
import { Login } from '../pages/Login/Login';
import { Signup } from '../pages/Signup/Signup';
import { Profile } from '../pages/Profile/Profile';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <PrivateRoute path="/cart" element={<Cart />} />
      <PrivateRoute path="/wishlist" element={<WishList />} />
      <PrivateRoute path="/profile" element={<Profile />} />
    </Routes>
  );
};

export { Router };
