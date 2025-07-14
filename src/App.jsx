import "./App.css";
import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';


import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import useUserRoutes from "./components/routes/userRoutes";
import useAdminRoutes from "./components/routes/adminRoutes";
import ForgotPassword from "./components/auth/ForgotPassword";
import AdminLogin from "./components/auth/AdminLogin";
import ResetPassword from "./components/auth/ResetPassword";
import UpdateProduct from "./components/admin/products/UpdateProduct";
import ScrollToTop from "./components/layout/ScrollToTop";
import NotFound from "./components/layout/NotFound";
import UpdateUser from "./components/admin/users/UpdateUser";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from './components/admin/Dashboard';
import ScrollUpBtn from "./components/layout/ScrollUpBtn";
import Catalog from "./components/layout/Catalog";

function App() {
  const userRoutes = useUserRoutes();
  const adminRoutes = useAdminRoutes();

  return (
<Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
<ScrollToTop/>
    <div className="App">
    <Toaster position="top-center" />
      <Routes>
      <Route path="/admin-belcab" element={<AdminLogin/>}/>
      <Route path="/password/forgot" element={<ForgotPassword/>}/>
      <Route path ="/password/reset/:token" element={<ResetPassword/>}/>
      {/* <Route path="/admin/products/:slug" element={
                              <ProtectedRoute>
                            <UpdateProduct/>
                            </ProtectedRoute>
                            }/> */}

      <Route path="/admin/users/:id" element={
                              <ProtectedRoute>
                            <UpdateUser/>
                            </ProtectedRoute>
                            }/>

              {/* User routes with Header and Footer */}
              <Route
                path="/*"
                element={
                  <>
                    <Header />
                    <Routes>
                      {userRoutes}
                      <Route path="/*" element={<NotFound/>}/>
                    </Routes>
                    <Footer />
                  </>
                } />

              {/* Admin routes without Header and Footer */}
              <Route path="/admin/*" 
              element={
                <>
               {adminRoutes}
             </>
              } />
              <Route path="*" element={<NotFound/>} />
            </Routes>
    </div>

    <ScrollUpBtn/>

  </Router>
  );
}

export default App;
