import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Privacy from './Privacy';
import Returns from './Returns';
import Shipping from './Shipping';
import Terms from './Terms';

export const Policies = () => {
  return (
    <Routes>
      <Route path="privacy" element={<Privacy />} />
      <Route path="returns" element={<Returns />} />
      <Route path="shipping" element={<Shipping />} />
      <Route path="terms" element={<Terms />} />
      <Route path="*" element={<Navigate to="privacy" replace />} />
    </Routes>
  );
};

export default Policies;
