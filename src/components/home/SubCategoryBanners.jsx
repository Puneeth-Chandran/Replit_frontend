import React from 'react'
import { Link } from 'react-router-dom'

const SubCategoryBanners = () => {
  return (
    <div className='container'>
    <div className="banner-group mt-3 pb-7">
        <div className="row">
            <div className="col-lg-8">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="banner banner-overlay" >
                                <img src="/assets/images/banners/belcab/subcategory_banner/fire-alarm2.png" alt="Banner"/>
                            <div className="banner-content">
                                <h3 className="banner-title text-white">Fire Alarm <br/> Cables</h3>
                                {/* <!-- End .banner-title --> */}
                                <div className="banner-text"> For Uncompromised <br/> Safety</div>
                                {/* <!-- End .banner-text --> */}
                                <Link to="/products?subcategory=fire-detection-alarm-cables" className="btn btn-outline-gray banner-link btn-round">View</Link>
                            </div>
                            {/* <!-- End .banner-content --> */}
                        </div>
                        {/* <!-- End .banner --> */}
                    </div>
                    {/* <!-- End .col-sm-6 --> */}

                    <div className="col-sm-6">
                        <div className="banner banner-overlay banner-overlay" >
                                <img src="/assets/images/banners/belcab/subcategory_banner/coaxial3.png" alt="Banner"/>

                            <div className="banner-content">
                                <h3 className="banner-title text-white">Coaxial<br/>Cables</h3>
                                {/* <!-- End .banner-title --> */}
                                <div className="banner-text">Experience Superior <br/> Transmissions</div>
                                {/* <!-- End .banner-text --> */}
                                <Link to="/products?subcategory=coaxial-cables" className="btn btn-outline-gray banner-link btn-round">View</Link>
                            </div>
                            {/* <!-- End .banner-content --> */}
                        </div>
                        {/* <!-- End .banner --> */}
                    </div>
                    {/* <!-- End .col-sm-6 --> */}
                </div>
                {/* <!-- End .row --> */}

                <div className="banner banner-large banner-overlay d-none d-sm-block" >
                        <img src="/assets/images/banners/belcab/subcategory_banner/copper-cable-accessories1.png" alt="Banner"/>
                    <div className="banner-content">
                        
                        <h3 className="banner-title text-white">Network <br/> Accessories</h3>
                        {/* <!-- End .banner-title --> */}
                        <div className="banner-text text-white"> Enhance Connectivity<br/>With Precision.</div>
                        {/* <!-- End .banner-text --> */}
                        <Link to="/products?category=copper-connectivity" className="btn btn-outline-white banner-link btn-round">View</Link>
                    </div>
                    {/* <!-- End .banner-content --> */}
                </div>
                {/* <!-- End .banner --> */}
            </div>
            {/* <!-- End .col-lg-8 --> */}

            <div className="col-lg-4 d-sm-none d-lg-block" >
                <div className="banner banner-middle banner-overlay" >
                    
                        <img src="/assets/images/banners/belcab/subcategory_banner/knx4.png" alt="Banner"/>

                    <div className="banner-content banner-content-bottom">
                        {/* <!-- End .banner-subtitle --> */}
                        <h3 className="banner-title text-white">KNX Cables</h3>
                        {/* <!-- End .banner-title --> */}
                        <div className="banner-text text-white"> Guarantees Seamless Automation.</div>
                        <Link to="/products?subcategory=knx-cables" className="btn btn-outline-white banner-link btn-round">Discover Now</Link>
                    </div>
                    {/* <!-- End .banner-content --> */}
                </div>
                {/* <!-- End .banner --> */}
            </div>
            {/* <!-- End .col-lg-4 --> */}
        </div>
        {/* <!-- End .row --> */}
</div>
</div>
  )
}

export default SubCategoryBanners