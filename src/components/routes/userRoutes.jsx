import React from 'react';
import { Route } from 'react-router-dom';
import FilteredProduct from '../product/FilteredProduct';
import Home from '../home/Home';
import ProductDetails from '../product/ProductDetails';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Certification from '../pages/Certification';
import Datasheets from '../pages/Datasheets';
import TechnicalLibrary from '../pages/TechnicalLibrary';
import Blog from '../pages/Blog';
import PartnerPrograms from '../pages/programs/PartnerPrograms';
import Catalog from '../layout/Catalog';

const userRoutes = () => {
  return (
    <>
    <Route path="/" element={<Home/>}/>
    <Route path="/products/:slug" element={<ProductDetails/>}/>
    <Route path="/products" element={<FilteredProduct/>}/>
    <Route path="/contact-us" element={<Contact/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/certification" element={<Certification/>}/>
    <Route path="/technical-library" element={<TechnicalLibrary/>}/>
    <Route path="/blog" element={<Blog/>}/>
    <Route path="/partner-program" element={<PartnerPrograms/>}/>
    <Route path="/catalogue" element={<Catalog/>}/>
    </>
  )
}

export default userRoutes;