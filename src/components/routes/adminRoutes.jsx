import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../admin/Dashboard';
import ListProducts from '../admin/products/ListProducts';
import NewProduct from '../admin/products/NewProduct';
import UpdateProduct from '../admin/products/UpdateProduct';
import UploadImages from '../admin/products/UploadImages';
import AdminHeader from '../layout/AdminHeader';
import ListUsers from '../admin/users/ListUsers';
import ProtectedRoute from '../auth/ProtectedRoute';

const adminRoutes = () => {
  return (
    <>
  <AdminHeader/>
  <Routes>
    {/* <Route path = "/admin/*" element = {<ProtectedRoute>
      <Dashboard/>
    </ProtectedRoute>}/> */}
    {/* <Route path="/admin/dashboard" element={<Dashboard/>}/>  */}
    {/* <Route path="/admin/products" element={<ListProducts/>}/> */}
    {/* <Route path="/admin/product/new" element={<NewProduct/>}/> */}
    {/* <Route path="/admin/products/:slug" element={
                              <ProtectedRoute>
                            <UpdateProduct/>
                            </ProtectedRoute>
                            }/> */}
    <Route path='/admin/product/:slug/add-variant' element={<NewProduct/>}/>
    <Route path="/admin/products/:id/upload_images" element={<UploadImages/>}/>
    <Route path="admin/users" element={<ListUsers/>}/>
    </Routes>
    </>
  )
};

export default adminRoutes;