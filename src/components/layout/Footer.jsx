import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useGetCategoryQuery } from '../../redux/api/categoryApi';
import toast from 'react-hot-toast';

    const Footer = () => {

        const {data, error, isLoading} = useGetCategoryQuery();

        const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();

        if (email.trim() === '') {
            toast.error('Please enter a valid email address');
            return;
        }

        setTimeout(() => {
            toast.success('Successfully subscribed to the newsletter!');
            setEmail('');
        }, 1000);
    };

    return (
        <footer className="footer footer-dark" style={{backgroundColor:"#00286c"}}>
        <div className="pt-4 pb-5 mb-0">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-10 col-md-8 col-lg-6">
                            <div className="cta-heading text-center">
                                <h3 className="cta-title text-white">Subscribe for Our Newsletter</h3>
                                {/* <!-- End .cta-title --> */}
                                <p className="cta-desc text-white">and receive important product updates, insights and news.</p>
                                {/* <!-- End .cta-desc --> */}
                            </div>
                            {/* <!-- End .text-center --> */}
                        
                            <form onSubmit={handleSubscribe}>
                                <div className="input-group input-group-round">
                                    <input type="email" 
                                    className="form-control form-control-white" 
                                    placeholder="Enter your Email Address" 
                                    aria-label="Email Adress" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required/>
                                    <div className="input-group-append">
                                        <button className="btn btn-white" type="submit"><span>Subscribe</span><i className="icon-long-arrow-right"></i></button>
                                    </div>
                                    {/* <!-- .End .input-group-append --> */}
                                </div>
                                {/* <!-- .End .input-group --> */}
                            </form>
                        </div>
                        {/* <!-- End .col-sm-10 col-md-8 col-lg-6 --> */}
                    </div>
                    {/* <!-- End .row --> */}
                </div>
                {/* <!-- End .container --> */}
            </div>
            {/* <!-- End .cta --> */}
        
        <div className="footer-middle">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-lg-4">
                        <div className="widget widget-about">
                            <img src="/assets/images/banners/belcab/Logo/belcab-white.png" className="footer-logo" alt="Footer Logo" width="105" height="25"/>
                            <p style={{color:"#fff"}}>Belcab manufactures high-quality cables, including BMS, coaxial, LAN, audio, CCTV, and industrial power cables. Backed by over a decade of expertise and advanced logistics centers, we prioritize innovation, reliability, and exceptional service, making us a trusted global leader in the cable industry.</p>

                            <div className="social-icons">
                                {/* <a href="#" className="social-icon" title="Facebook" target="_blank"><i className="bi bi-facebook"></i></a> */}
                                <a href="https://www.linkedin.com/company/belcab-uk-ltd" className="social-icon" title="LinkedIn" target="_blank"><i className="bi bi-linkedin"></i></a>
                                <a href="https://www.instagram.com/belcab_uk/" className="social-icon" title="Instagram" target="_blank"><i className="bi bi-instagram"></i></a>
                                {/* <a href="#" className="social-icon" title="Youtube" target="_blank"><i className="bi bi-youtube"></i></a> */}
                            </div>
                            {/* <!-- End .soial-icons --> */}
                        </div>
                        {/* <!-- End .widget about-widget --> */}
                    </div>
                    {/* <!-- End .col-sm-6 col-lg-3 --> */}

                    <div className="col-sm-6 col-lg-2">
                        <div className="widget text-white">
                            <h4 className="widget-title">UK Address</h4>
                            {/* <!-- End .widget-title --> */}
                            <p>BELCAB UK LTD <br/>International House 45-55 Commercial Street London E1 6BD United Kingdom</p>
                            <p><i className='bi bi-telephone'></i><a href="tel:447798847604"> +44 7798 847604</a></p>
                            <p><i className='bi bi-envelope'></i><a href='mailto:export@belcab.co.uk'> export@belcab.co.uk</a></p>
                            {/* <!-- End .widget-list --> */}
                        </div>
                        {/* <!-- End .widget --> */}
                    </div>
                    {/* <!-- End .col-sm-6 col-lg-3 --> */}

                    <div className="col-sm-6 col-lg-2">
                        <div className="widget">
                            <h4 className="widget-title">International Sales <br/>Office (MENA & CIS)</h4>
                            {/* <!-- End .widget-title --> */}
                            <p>Office No. 110, Al Ansari Building - Plot No. 129-289, Port Saeed, Deira, Dubai, United Arab Emirates</p>
                            {/* <!-- End .widget-list --> */}
                        </div>
                        {/* <!-- End .widget --> */}
                    </div>

                    <div className="col-sm-6 col-lg-2">
                        <div className="widget">
                            <h4 className="widget-title">Useful Links</h4>
                            {/* <!-- End .widget-title --> */}

                            <ul className="widget-list">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About Belcab</Link></li>
                                <li><Link to="/catalogue">Belcab Catalogue</Link></li>
                                <li><Link to="/contact-us">Contact us</Link></li>
                            </ul>
                            {/* <!-- End .widget-list --> */}
                        </div>
                        {/* <!-- End .widget --> */}
                    </div>
                    {/* <!-- End .col-sm-6 col-lg-3 --> */}

                    <div className="col-sm-6 col-lg-2">
                        <div className="widget">
                            <h4 className="widget-title">Our Products</h4>
                            {/* <!-- End .widget-title --> */}

                            <ul className="widget-list">
                            {data?.categoryList?.map((category) => (
            <li key={category?.slug}>
                <Link to={`/products?category=${category.slug}`}>
                    {category?.name}
                </Link>
                </li>
                            ))}
                            </ul>
                            {/* <!-- End .widget-list --> */}
                        </div>
                        {/* <!-- End .widget --> */}
                    </div>
                    {/* <!-- End .col-sm-6 col-lg-3 --> */}
                </div>
                {/* <!-- End .row --> */}
            </div>
            {/* <!-- End .container --> */}
        </div>
        {/* <!-- End .footer-middle --> */}

        
    </footer>
    )
    }

    export default Footer