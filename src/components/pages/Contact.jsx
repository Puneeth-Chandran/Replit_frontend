import React, { useState, useEffect } from 'react';
import { useContactFormSubmitMutation } from '../../redux/api/userApi';
import { toast, Toaster } from 'react-hot-toast';
import { countries } from 'countries-list';
import { useSendOtpMutation } from '../../redux/api/otpApi';
import OtpModal from '../layout/OtpModal';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';

const Contact = () => {

    const countriesList = Object.entries(countries).map(([code, country]) => ({
        name: country.name,
        phone: country.phone,
        iso2: code // <== ISO Alpha-2 code
      }));
      

    const [name, setName] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isoCode, setIsoCode] = useState('');
console.log(countryCode);

    const [phoneErr, setPhoneErr] = useState('');
    const [code, setCode] = useState('');

    const [showModal, setShowModal] = useState(false);
    
    const [sendOtp, { isLoading: sendingOtp, error: otpSendingError, isSuccess: otpSendSuccess }] = useSendOtpMutation();

    const [contactFormSubmit, { isLoading, error, isSuccess }] = useContactFormSubmitMutation();

    useEffect(() => {
                if (otpSendingError?.data?.message) {
                    toast.error(otpSendingError.data.message);
                } else if (otpSendingError) {
                    toast.error("An unexpected error occurred.");
                }
                if (otpSendSuccess) {
                    toast.success('OTP sent successfully! Please check your email.');
                }
            }, [otpSendingError, otpSendSuccess]);

    useEffect(() => {
        if (error?.data?.message) {
            toast.error(error.data.message);
        } else if (error) {
            toast.error("An unexpected error occurred.");
        }
        if (isSuccess) {
            toast.success('Your message has been sent.');
            setName('');
            setSelectedCountry('');
            setCountryCode('');
            setPhone('');
            setEmail('');
            setSubject('');
            setMessage('');

        }
    }, [error, isSuccess]);

    const handleCountryChange = (country) => {
        if (country?.phone && country?.name && country?.iso2) {
            setSelectedCountry(country.name);
            setCountryCode(country.phone);
            setIsoCode(country.iso2); // ✅ set the ISO Alpha-2 code
        } else {
            setCountryCode('');
            setIsoCode('');
        }
    };

    const handlePhoneChange = (e) => {
        const input = e.target.value;
    
        const formatter = new AsYouType(isoCode); // ✅ use isoCode here
        const formatted = formatter.input(input);
        setPhone(formatted);
    
        const parsed = parsePhoneNumberFromString(input, isoCode); // ✅ use isoCode here
        if (parsed?.isValid()) {
            setPhoneErr('');
        } else {
            setPhoneErr('Invalid phone number');
        }
    };

            const handleVerifiedOtp = async () => {
                    try {
                      await contactFormSubmit({ 
                        name, 
                        phone: `+${countryCode} ${phone}`,
                        countryCode, 
                        email, 
                        subject, 
                        message, 
                        selectedCountry }).unwrap();
                  
                      setShowModal(false);
                    } catch (err) {
                      toast.error("Failed to submit form. Please try again.");
                    }
                  };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!name || !phone || !email || !message) {
                    return toast.error("Please fill all required fields");
            }

            if (!/\S+@\S+\.\S+/.test(email)) {
                                              return toast.error("Please enter a valid email.");
                                            }
            
                                        if (phoneErr) {
                                              return toast.error("Please enter a valid phone number.");
                                            }

                                            try {await sendOtp({ email }).unwrap();
                                                                      setShowModal(true);
                                                                    } catch (err) {
                                                                      toast.error("Failed to send OTP");
                                                                    }
    };

    return (
        <div className="pantone-blue pb-5" style={{ backgroundImage: "url(assets/images/banners/belcab/contact-bg.svg)" }}>
            <Toaster position="top-center" />
            <div className="page-header page-header-big text-center">
                <h1 className="page-title text-white">CONTACT US<span className="text-white">KEEP IN TOUCH WITH US</span></h1>
            </div>
            <div className="page-content pb-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mb-2 mb-lg-0 text-white">

                            <div className="row">
                                <div className="col-sm-7">
                                    <div className="contact-info">
                                        <h3 className='text-white'>Contact Information</h3>

                                        <ul className="contact-list">
                                            <li>
                                                <i className="bi bi-geo-alt text-white"></i>
                                                BELCAB UK LTD<br/> International House, 45-55 Commercial Street, London, E1 6BD United Kingdom
                                            </li>

                                            <li>
                                            <h6 className='text-white fw-normal'>Registration No. : 15949965</h6>
                                            </li>

                                            <li>
                                                <i className="bi bi-envelope text-white"></i>
                                                <a href="mailto:export@belcab.co.uk"> export@belcab.co.uk</a>
                                            </li>

                                            <li>
                                                <i className="bi bi-telephone text-white"></i>
                                                <a href="tel:447798847604">+44 7798 847604</a>
                                            </li>
                                        </ul>
                                        {/* <!-- End .contact-list --> */}
                                    </div>
                                    {/* <!-- End .contact-info --> */}
                                </div>
                                {/* <!-- End .col-sm-7 --> */}

                                <div className="col-sm-5">
                                    <div className="contact-info">
                                        <h3 className='text-white'>Office Timings</h3>

                                        <ul className="contact-list">
                                            <li>
                                                <i className="bi bi-clock text-white"></i>
                                                <span className="text-white">Monday-Friday</span> <br />9am-5pm
                                            </li>
                                            <li>
                                                <i className="bi bi-calendar3 text-white"></i>
                                                <span className="text-white">Saturday & Sunday</span> <br /> Closed
                                            </li>
                                        </ul>
                                        {/* <!-- End .contact-list --> */}
                                    </div>
                                    {/* <!-- End .contact-info --> */}
                                </div>
                                {/* <!-- End .col-sm-5 --> */}
                            </div>
                            {/* <!-- End .row --> */}
                            <div className="row">
                                <div className="col-sm-7">
                                    <div className="contact-info">
                                        <h3 className='text-white'>International Sales Office (MENA & CIS)</h3>

                                        <ul className="contact-list">
                                            <li>
                                                <i className="bi bi-geo-alt text-white"></i>
                                                Office No. 110, AL Ansari Building - Plot No. 129-289, Port Saeed, Deira, Dubai, United Arab Emirates
                                            </li>

                                            <li>
                                            <h6 className='text-white fw-normal'>Registration No. : 603488</h6>
                                            </li>
                                        </ul>
                                        {/* <!-- End .contact-list --> */}
                                    </div>
                                    {/* <!-- End .contact-info --> */}
                                </div>
                                {/* <!-- End .col-sm-7 --> */}

                                <div className="col-sm-5">
                                    <div className="contact-info">
                                        <h3 className='text-white'>Office Timings</h3>

                                        <ul className="contact-list">
                                            <li>
                                                <i className="bi bi-clock text-white"></i>
                                                <span className="text-white">Monday-Friday</span> <br />9am-5pm
                                            </li>
                                            <li>
                                                <i className="bi bi-calendar3 text-white"></i>
                                                <span className="text-white">Saturday & Sunday</span> <br /> Closed
                                            </li>
                                        </ul>
                                        {/* <!-- End .contact-list --> */}
                                    </div>
                                    {/* <!-- End .contact-info --> */}
                                </div>
                                {/* <!-- End .col-sm-5 --> */}
                            </div>
                            {/* <!-- End .row --> */}
                        </div>
                        {/* <!-- End .col-lg-6 --> */}
                        <div className="col-lg-6">
                            <h2 className="title mb-1 text-white">Got Any Questions?</h2>
                            {/* <!-- End .title mb-2 --> */}
                            <p className="mb-2 text-white">Use the form below to get in touch with our support team</p>

                            <form className="contact-form mb-3" onSubmit={submitHandler}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label htmlFor="cname" className="sr-only">Name *</label>
                                        <input type="text" className="form-control" id="cname" placeholder="Name *"
                                            name="name" value={name} onChange={(e) => setName(e.target.value)} required
                                        />
                                    </div>
                                    {/* <!-- End .col-sm-6 --> */}

                                    <div className="col-sm-6">
                                        <label htmlFor="cemail" className="sr-only">Email *</label>
                                        <input type="email" className="form-control" id="cemail" placeholder="Email *" name="email"
                                            value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    {/* <!-- End .col-sm-6 --> */}
                                </div>
                                {/* <!-- End .row --> */}

                                <div className="row">
                                    <div className="col-sm-6">
                                        <label htmlFor="csubject" className="sr-only"></label>
                                        <select
                                            aria-label="Select your country"
                                            className="form-control"
                                            name="countryCode"
                                            value={selectedCountry} // Match the selected country name
                                            onChange={(e) => {
                                                const selected = countriesList.find((c) => c.name === e.target.value); // Find the country object by name
                                                if (selected) {
                                                    handleCountryChange(selected); // Update selected country and code
                                                }
                                            }}
                                            required
                                        >
                                            <option value="" disabled>
                                                Select your country *
                                            </option>

                                            {/* Map over countriesList to render country options */}
                                            {countriesList?.length ? (
                                                countriesList.map((country) => (
                                                    <option key={country.name} value={country.name}>
                                                        {country.name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>Country list unavailable</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
  <div className="d-flex">
    <input
      className="form-control col-3"
      style={{ maxWidth: "60px", marginRight: "10px" }}
      placeholder="+"
      name="countryCode"
      value={`+${countryCode}`}
      readOnly
    />

    <input
      type="tel"
      className="form-control"
      id="cphone"
      placeholder="Phone *"
      name="phone"
      value={phone}
      onChange={handlePhoneChange}
      required
    />
  </div>
  
  {/* ✅ Error shown below the input row */}
  {phoneErr && (
    <div style={{ color: 'red', fontSize: '1.3rem', marginBottom: '5px' }}>
      {phoneErr}
    </div>
  )}
</div>


                                    <div className="col-sm-12">
                                        <label htmlFor="csubject" className="sr-only">Subject</label>
                                        <input type="text" className="form-control" id="csubject" placeholder="Subject"
                                            name="subject" value={subject} onChange={(e) => setSubject(e.target.value)}
                                        />
                                    </div>
                                    {/* <!-- End .col-sm-6 --> */}
                                </div>
                                {/* <!-- End .row --> */}

                                <label htmlFor="cmessage" className="sr-only">Message</label>
                                <textarea className="form-control" cols="30" rows="4" id="cmessage" placeholder="Message *"
                                    name="message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>

                                <button type="submit" className="btn btn-outline-primary-2 btn-minwidth-sm" disabled={isLoading || sendingOtp}>
                                    <span>{isLoading ? "SUBMIT..." : "SUBMIT"}</span>
                                    <i className="bi bi-arrow-right"></i>
                                </button>
                            </form>
                            {/* <!-- End .contact-form --> */}
                        </div>
                        {/* <!-- End .col-lg-6 --> */}
                    </div>
                    {/* <!-- End .row --> */}

                </div>
                {/* <!-- End .container --> */}

                {/* <!-- End #map --> */}
            </div>

        <OtpModal 
                    showModal={showModal} 
                    email={email} 
                    closeModal={() => setShowModal(false)}
                    onVerified={() => {
                setShowModal(false);
                handleVerifiedOtp()
              }}
             />

        </div>
    )
}

export default Contact