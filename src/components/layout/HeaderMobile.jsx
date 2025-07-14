import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useGetCategoryQuery } from '../../redux/api/categoryApi';
import MobileSearch from './MobileSearch';

const HeaderMobile = () => {

    const {data, error, isLoading} = useGetCategoryQuery();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        document.body.classList.remove("mmenu-active");
        document.querySelector(".mobile-menu-toggler")?.classList.remove("active");
    }, [location.pathname]);

  return (
    <>
    <div className="mobile-menu-overlay"></div>

    <div className={`mobile-menu-container ${menuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-wrapper">
                    <span className="mobile-menu-close" onClick={() => setMenuOpen(false)}>
                        <i className="bi bi-x"></i>
                    </span>

            <MobileSearch/> 
            
            <nav className="mobile-nav">
                <ul className="mobile-menu">
                    <li className={location.pathname === "/" ? "active" : ""}>
                        <Link to="/" onClick={() => document.body.classList.remove("mmenu-active")}>Home</Link>
                    </li>
                    {/* <li>
                        <a href="category.html">Shop</a>
                        <ul>
                            <li><a href="category-list.html">Shop List</a></li>
                            <li><a href="category-2cols.html">Shop Grid 2 Columns</a></li>
                            <li><a href="category.html">Shop Grid 3 Columns</a></li>
                            <li><a href="category-4cols.html">Shop Grid 4 Columns</a></li>
                            <li><a href="category-boxed.html"><span>Shop Boxed No Sidebar<span className="tip tip-hot">Hot</span></span></a></li>
                            <li><a href="category-fullwidth.html">Shop Fullwidth No Sidebar</a></li>
                            <li><a href="product-category-boxed.html">Product Category Boxed</a></li>
                            <li><a href="product-category-fullwidth.html"><span>Product Category Fullwidth<span className="tip tip-new">New</span></span></a></li>
                            <li><a href="cart.html">Cart</a></li>
                            <li><a href="checkout.html">Checkout</a></li>
                            <li><a href="wishlist.html">Wishlist</a></li>
                            <li><a href="#">Lookbook</a></li>
                        </ul>
                    </li> */}
                    <li>
                        <a href="#" onClick={(e) => e.preventDefault()} className="sf-with-ul">Product</a>
                        <ul>
                        {data?.categoryList?.map((category) => (
            <li key={category?.slug}>
                <Link to={`/products?category=${category.slug}`} onClick={() => document.body.classList.remove("mmenu-active")}>
                    {category?.name}
                </Link>

                {category?.children?.length > 0 && (
                    <ul>
                        {category.children.map((subCategory) => (
                            <li key={subCategory?.slug}>
                                <Link to={`/products?subcategory=${subCategory.slug}`} className={subCategory?.children?.length > 0 ? "sf-with-ul" : ""}>{subCategory?.name}</Link>

                                {subCategory?.children?.length > 0 && (
                                    <ul>
                                        {subCategory.children.map((subSubCat) => (
                                            <li key={subSubCat?.slug}>
                                            <Link to={`/products?sub-subcategory=${subSubCat.slug}`}>{subSubCat?.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        ))}
                        </ul>
                    </li>
                    <li className={location.pathname === "/contact-us" ? "active" : ""}>
                        <Link to={"/contact-us"} onClick={() => document.body.classList.remove("mmenu-active")}>Contact Us</Link>
                    </li>
                    <li className= {location.pathname === "/about" ? "active" : ""}>
                        <Link to={"/about"} onClick={() => document.body.classList.remove("mmenu-active")}>About</Link>
                    </li>
                    {/* <li className= {location.pathname === "/technical-library" ? "active" : ""}>
                        <Link to={"/technical-library"} onClick={() => document.body.classList.remove("mmenu-active")}>Technical Library</Link>
                    </li> */}
                    {/* <li>
                        <a href="blog.html">Blog</a>

                        <ul>
                            <li><a href="blog.html">Classic</a></li>
                            <li><a href="blog-listing.html">Listing</a></li>
                            <li>
                                <a href="#">Grid</a>
                                <ul>
                                    <li><a href="blog-grid-2cols.html">Grid 2 columns</a></li>
                                    <li><a href="blog-grid-3cols.html">Grid 3 columns</a></li>
                                    <li><a href="blog-grid-4cols.html">Grid 4 columns</a></li>
                                    <li><a href="blog-grid-sidebar.html">Grid sidebar</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Masonry</a>
                                <ul>
                                    <li><a href="blog-masonry-2cols.html">Masonry 2 columns</a></li>
                                    <li><a href="blog-masonry-3cols.html">Masonry 3 columns</a></li>
                                    
                                </ul>
                            </li>
                            <li>
                                <a href="#">Mask</a>
                                <ul>
                                    <li><a href="blog-mask-grid.html">Blog mask grid</a></li>
                                    <li><a href="blog-mask-masonry.html">Blog mask masonry</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Single Post</a>
                                <ul>
                                    <li><a href="single.html">Default with sidebar</a></li>
                                    <li><a href="single-fullwidth.html">Fullwidth no sidebar</a></li>
                                    <li><a href="single-fullwidth-sidebar.html">Fullwidth with sidebar</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li> */}
                    
                </ul>
            </nav>
            {/* <!-- End .mobile-nav --> */}

            <div className="social-icons">
                <a href="https://www.linkedin.com/company/belcab-uk" className="social-icon" target="_blank" title="LinkedIn"><i className="bi bi-linkedin"></i></a>
                <a href="https://www.instagram.com/belcab_uk_ltd/" className="social-icon" target="_blank" title="Instagram"><i className="bi bi-instagram"></i></a>
                {/* <a href="#" onClick={(e) => e.preventDefault()} className="social-icon" target="_blank" title="Youtube"><i className="bi bi-youtube"></i></a> */}
            </div>
            {/* <!-- End .social-icons --> */}
        </div>
        {/* <!-- End .mobile-menu-wrapper --> */}
    </div>
    </>
  )
}

export default HeaderMobile