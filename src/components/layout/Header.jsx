import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import HeaderMobile from './HeaderMobile';
import { useGetCategoryQuery } from '../../redux/api/categoryApi';

const Header = () => {

    const {data, error, isLoading} = useGetCategoryQuery();
    
  return (
    <>
    <header className="header header-8">
    <div className="header-top" style={{backgroundColor: "#fff", height: "40px"}}>
        <div className="container pt-1">
            <div className="header-left">
                <ul className="top-menu">
                    <li>
                        <a href="#">Contact</a>
                        <ul>
                            <li ><a href="tel:447798847604"><i className="bi bi-telephone"></i>+44 7798 847604</a></li>
                            <li><a href="mailto:export@belcab.co.uk"><i className="bi bi-envelope"></i>export@belcab.co.uk</a></li>
                        </ul>
                    </li>
                </ul>
                {/* <!-- End .top-menu --> */}
            </div>
            {/* <!-- End .header-left --> */}

            <div className="header-right">
                <ul className="top-menu">
                    <li>
                        <a href="#">About</a>
                        <ul>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact-us">Contact Us</Link></li>
                        </ul>
                    </li>
                </ul>
                {/* <!-- End .top-menu --> */}
            </div>
            {/* <!-- End .header-right --> */}
        </div>
        {/* <!-- End .container --> */}
    </div>
    {/* <!-- End .header-top --> */}

    <div className="header-middle sticky-header" style={{height: "70px", backgroundColor: "#00286c", border: "none"}}>
        <div className="container" style={{height: "70px"}}>
            <div className="header-left">
                <button className="mobile-menu-toggler">
                    <span className="sr-only">Toggle mobile menu</span>
                    <i className="bi bi-list"></i>
                </button>

                <Link to="/" className="logo">
                    <img src="/assets/images/banners/belcab/Logo/belcab-white.png" alt="Belcab Logo" width="170" height="25"/>
                </Link>
                
            </div>
            {/* <!-- End .header-left --> */}

            <div className="header-right">
                <nav className="main-nav">
                    <ul className="menu sf-arrows"> 
                    <li>
                            <Link className='focus' to="/">Home</Link>
                    </li>
                    <li>
    <Link to='/products' className="sf-with-ul">Products</Link>
    <ul>
        {data?.categoryList?.map((category) => (
            <li key={category?.slug}>
                <Link to={`/products?category=${category.slug}`} className={category?.children?.length > 0 ? "sf-with-ul" : ""}>
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
                        {/* <li>
                            <a href="product.html" className="sf-with-ul">Accessories</a>

                            
                        </li> */}
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                        <Link to="/contact-us">Contact</Link>
                        </li>
                        {/* <li>
                            <Link to="/technical-library">Technical Library</Link>
                        </li> */}
                        <li>
                            <Link to="/certification">Certifications</Link>
                        </li>
                        {/* <li>
                            <a href="elements-list.html" className="sf-with-ul">Elements</a>
                        </li> */}
                    </ul>
                    {/* <!-- End .menu --> */}
                </nav>
                {/* <!-- End .main-nav --> */}

                <div className="header-search">
                    <Search/>
                </div>
                {/* <!-- End .header-search --> */}

                {/* <div className="dropdown cart-dropdown">
                    <a href="#" className="dropdown-toggle text-white" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                        <i className="bi bi-shuffle"></i>
                    </a>
                </div> */}
                {/* <!-- End .cart-dropdown --> */}
            </div>
            {/* <!-- End .header-right --> */}
        </div>
        {/* <!-- End .container --> */}
    </div>
    {/* <!-- End .header-middle --> */}
</header>
    <HeaderMobile/>
    </>
  )
}

export default Header;