import React from 'react'
import { Link } from 'react-router-dom';

const AboutBanner = () => {
  return (

    <section className="sound-section" style={{backgroundImage: "url(/assets/images/banners/belcab/rounded_bg6.png)"}}>
                <div className="container">
                    <div className="banners row d-flex">
                        <div className="col-lg-6 mt-6 mt-lg-0 d-flex d-lg-block justify-content-center">
                            <figure className="banner-img">
                                <img src="assets/images/banners/belcab/cables/patchcode4.png" width="600" height="700" alt="Product"/>
                            </figure>
                        </div>
                        
                        <div className="col-lg-6 mt-2 mt-lg-0">
                            <div className="banner-contents">
                                <h2 className="banner-titles text-white">Belcab</h2>
                                <h2 className="banner-titles text-white">Built</h2>
                                <h2 className="banner-titles text-white">Boundless</h2>
                                <p className="banner-texts">
                                Engineered with precision, our cables are designed to exceed expectations across a wide range of 
                                applications and industries. Our vision reflects an unwavering commitment to innovation and a drive to 
                                push the boundaries of what cables can achieve. With a steadfast focus on quality and adaptability, our 
                                solutions power connectivity without limits, supporting businesses and industries as they grow and evolve.
                                </p>
                                <div className='d-flex justify-content-center align-items-center mb-3'>
                <Link to='/products' className='view-all-button'>
    <span className='mx-5 text-light'>View Products &nbsp; <i className="bi bi-arrow-right"></i></span>
</Link>
            </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
  )
}

export default AboutBanner;