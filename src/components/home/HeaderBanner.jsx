import React from 'react';
import { Link } from 'react-router-dom';

const HeaderBanner = () => {
  return (
    <div className="intro-slider-container">
              
    <div className="intro-slide" style={{backgroundImage:"url(/assets/images/banners/belcab/bms_banner.png)"}}>
        <div className="container intro-content">
            <div className="row">
                <div className="intro">
                    <div className="title">
                        <h3 style={{color: "#fff"}}>BELCAB'S</h3>
                    </div>
                    <div className="content">   
                        <h3>BUILDING</h3>
                        <h3>MANAGEMENT CABLES</h3>
                    </div>
                    <div className="price">
                        <h3>ENGINEERED FOR EXTREMES</h3>
                        </div>
                    <div className="action">
                        <Link to="/products?category=building-industrial-cables" className="btn btn-primary">
                            <span>DISCOVER NOW</span>
                        </Link>
                    </div>
                </div>
            </div>
            {/* <!-- End .row --> */}
        </div>
        {/* <!-- End .intro-content --> */}
    </div>
 </div>
  )
}

export default HeaderBanner;