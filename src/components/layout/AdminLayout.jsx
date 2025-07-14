import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AdminSideMenues from './AdminSideMenu';
import AdminDashboard from '../admin/Dashboard';
import ListProducts from '../admin/products/ListProducts';
import NewProduct from '../admin/products/NewProduct';
import NewUser from '../admin/users/NewUser';
import ListUsers from '../admin/users/ListUsers';
import ProductReviews from '../admin/products/ProductReviews';
import ReviewedCustomers from '../admin/products/ReviewedCustomers';
import CategoryList from '../admin/category/CategoryList';
import SubCategoryList from '../admin/category/SubCategoryList';
import SubSubCategoryList from '../admin/category/SubSubCategory';
import ProtectedRoute from '../auth/ProtectedRoute';
import DatasheeList from '../admin/datasheet/DatasheeList';
import SpecList from '../admin/specification/SpecList';
import UpdateProduct from '../admin/products/UpdateProduct';
import ListCertificates from "../admin/certificate/ListCertificates";
import { useGetCategoryQuery } from '../../redux/api/categoryApi';

const AdminLayout = () => {
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [activePage, setActivePage] = useState(); 
    const location = useLocation();
    const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

    const handleMenuItemClick = (menuItemUrl)=>{
        setActiveMenuItem(menuItemUrl)
    }

    const currentPath = location.pathname;

    const addVariantMatch = currentPath.match(/^\/admin\/product\/([^/]+)\/add-variant$/);

    // const productUpdateRegex = /^\/admin\/products\/[a-zA-Z0-9-]+$/;
    // const isUpdatingProduct = productUpdateRegex.test(location.pathname);

    const menuItems = [
        {
            id: "00",
            title: "Dashboard",
            url: "/admin/dashboard",
            page: <ProtectedRoute> <AdminDashboard /> </ProtectedRoute>
        },
        {
            id: "01",
            title: "Products",
            items: [
                {   
                    item: "Products",
                    url:  "/admin/products",
                    page: <ProtectedRoute> <ListProducts/> </ProtectedRoute>
                },
                {
                    item: "Add Product",
                    url: "/admin/product/new",
                    page: <ProtectedRoute> <NewProduct/> </ProtectedRoute>
                },
                ...(addVariantMatch
                    ? [{
                        item: "Add Variant",
                        url: currentPath,
                        page: (
                          <ProtectedRoute>
                            <NewProduct slug={addVariantMatch[1]} />
                          </ProtectedRoute>
                        ),
                      }]
                    : []),
                ...(currentPath.match(/^\/admin\/products\/([^/]+)$/)
                ? [{
                    item: "Update Product",
                    url: currentPath,
                    page: <ProtectedRoute>
                            <UpdateProduct slug={currentPath.match(/^\/admin\/products\/([^/]+)$/)[1]} />
                          </ProtectedRoute>
                  }]
                : []),
                {
                    item: "Specification List",
                    url: "/admin/field",
                    page: <ProtectedRoute> <SpecList/> </ProtectedRoute>
                },
                {
                    item: "Datasheets",
                    url: "/admin/datasheet",
                    page: <ProtectedRoute> <DatasheeList/> </ProtectedRoute>
                },
                {
                    item: "Product Reviews",
                    url: "/admin/reviews",
                    page: <ProtectedRoute> <ProductReviews/> </ProtectedRoute>
                },
                
            ]
        },
        {
            id: "02",
            title: "Category",
            items: [
                {
                    item: "Category",
                    url: "/admin/category",
                    page: <ProtectedRoute> <CategoryList/> </ProtectedRoute>
                },
                {
                    item: "Sub Category",
                    url: "/admin/subcategory",
                    page: <ProtectedRoute> <SubCategoryList/> </ProtectedRoute>
                },
                {
                    item: "Sub-SubCategory",
                    url: "/admin/sub-subcategory",
                    page: <ProtectedRoute> <SubSubCategoryList/> </ProtectedRoute>
                }
            ]
        },
        {
            id:"03",
            icon: "home",
            title: "Users",
            items: [
                {
                    item: "Users",
                    url: "/admin/users",
                    page: <ProtectedRoute> <ListUsers/> </ProtectedRoute>
                },
                {
                    item:"Add User",
                    url: "/admin/user/new",
                    page:  <ProtectedRoute><NewUser/> </ProtectedRoute>
                },
                {
                    item: "Customers",
                    url: "/admin/customers",
                    page: <ProtectedRoute> <ReviewedCustomers/> </ProtectedRoute>
                }
            ]
        }, 
        {
            id:"04",
            title: "Pages",
            items: [
                {
                    item: "Certificates",
                    url: "/admin/certificates",
                    page: <ProtectedRoute> <ListCertificates/> </ProtectedRoute>
                },
                // {
                //     item:"Add User",
                //     url: "/admin/user/new",
                //     page:  <ProtectedRoute><NewUser/> </ProtectedRoute>
                // },
                // {
                //     item: "Customers",
                //     url: "/admin/customers",
                //     page: <ProtectedRoute> <ReviewedCustomers/> </ProtectedRoute>
                // }
            ]
        }
    ];

    const handleAccordionToggle = (id) => {
        setActiveAccordion((prevId) => (prevId === id ? null : id));
    };

    const getPageForCurrentPath = (path) => {
        // Flatten menu items to find the page based on URL
        for (const menuItem of menuItems) {
            if (menuItem.url === path) return menuItem.page;
            if (menuItem.items) {
                const subItem = menuItem.items.find((item) => item.url === path);
                if (subItem) return subItem.page;
            }
        }

        // if(isUpdatingProduct){
        //     return <ProtectedRoute><UpdateProduct/></ProtectedRoute>
        // }

        return <ProtectedRoute><AdminDashboard/></ProtectedRoute>
    };

    useEffect(() => {
        // Update the active page when the URL changes
        setActivePage(getPageForCurrentPath(location.pathname));
    }, [location.pathname]);

    return (
        <>
            <div className="page-sidebar">
                <div className="main-header-left d-none d-lg-block">
                    <div className="logo-wrapper">
                        <Link to="/admin/dashboard">
                            <img className="d-none d-lg-block blur-up lazyloaded"
                                src="/assets/images/banners/belcab/Logo/belcab-white.png" alt="Belcab" />
                        </Link>
                    </div>
                </div>
                {menuItems?.map((menuItem,index) => (
                    <AdminSideMenues
                        key={index}
                        icon ={menuItem?.icon}
                        title={menuItem?.title}
                        url={menuItem?.url}
                        isOpen={activeAccordion === menuItem?.id}
                        onToggle={() => handleAccordionToggle(menuItem?.id)}
                        onClick = {()=> handleMenuItemClick(menuItem.url)}
                        aria-current={activeMenuItem.includes(menuItem.url)? "true": "false"}
                    >
                        <div className="menu-items-container">
                            {menuItem?.items?.map((item) => (
                                <Link
                                    to={item?.url}
                                    key={item?.url}
                                    className="menu-link"
                                    style={{ paddingLeft: "20px" }}
                                >
                                    {item?.item}
                                </Link>
                            ))}
                        </div>
                    </AdminSideMenues>
                ))}
            </div>
            <div className="page-body">
                {activePage}
                {/* {children} */}
            </div>
        </>
    );
};

export default AdminLayout;
