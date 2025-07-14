import React, { useState, useEffect } from "react";
import { useGetProductDetailsQuery, useSendQuotationEmailMutation } from "../../redux/api/productsApi";
import { toast } from 'react-hot-toast';
import { useSendOtpMutation } from "../../redux/api/otpApi";
import OtpModal from "../layout/OtpModal";
import { countries } from 'countries-list';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';

const QuotationModal = ({ closeQuotation, productId }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [query, setQuery] = useState("");
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [phoneErr, setPhoneErr] = useState('');

  const [showModal, setShowModal] = useState(false);

  const [sendOtp, { isLoading: sendingOtp, error: otpSendingError, isSuccess: otpSendSuccess }] = useSendOtpMutation();

  const { data } = useGetProductDetailsQuery(productId);
  const product = data?.product;

  const [sendQuotation, { isLoading, error, isSuccess }] = useSendQuotationEmailMutation();

  useEffect(() => {
          if (code) {
              setPhone('');
              setPhoneErr('');
          }
      }, [code]);

      const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setCode(selectedCountry);

        const rawPhoneCode = countries[selectedCountry]?.phone;
        const resolvedCode = Array.isArray(rawPhoneCode) ? rawPhoneCode[0] : rawPhoneCode;

        setPhoneCode(resolvedCode);
    };

    const handlePhoneChange = (e) => {
            const input = e.target.value;
            const formatter = new AsYouType(code);
            const formatted = formatter.input(input);
    
            setPhone(formatted);
    
            const parsed = parsePhoneNumberFromString(input, code);
            if (parsed?.isValid()) {
                setPhoneErr('');
            } else {
                setPhoneErr('Invalid phone number');
            }
        };

useEffect(() => {
  if (isSuccess) {
    toast.success("Quotation successfully submitted !!");
    resetForm();
    closeQuotation();
  }

  if (error) {
    const message = error?.data?.message || "Failed to send quotation.";
    toast.error(message);
  }
}, [isSuccess, error]);

const handleVerifiedOtp = async () => {
        try {
          await sendQuotation({
            name,
            phone: `+${phoneCode} ${phone}`,
            email,
            company,
            query,
            productName: product?.name,
          }).unwrap();
      
          setShowModal(false);
        } catch (err) {
          toast.error("Failed to submit form. Please try again.");
        }
      };

    const resetForm = () => {
        setName('');
        setEmail('');
        setQuery('');
        setCompany('');
    };

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

            const handleSubmit = async (e) => {
                        e.preventDefault();

                        if (!name || !query || !email || !company) {
                              return toast.error("Please fill in all required fields");
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
    <>
      <button className="closeModal" onClick={closeQuotation}>
        &times;
      </button>

      <div className="products-info mt-5">
    <img  alt={product?.imagealt} height="50" src={product?.images[0]?.url || '/assets/images/banners/belcab/cables/01-500x500.jpg'} width="50"/>
    <span style={{paddingLeft:"20px"}}>
     {product?.name}
    </span>
   </div>

      <div className="page-title mt-3 mb-2">
        <h4 style={{ fontWeight: "normal" }}>Enter your queries</h4>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="fields-row">
          <div className="field">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="fields-row">
        <div className="field">
          <label htmlFor="phone"> Phone Number * {phoneErr && <div style={{ color: 'red', fontSize: '1.2rem' }}>{phoneErr}</div>}</label>
          <div className="d-flex align-items-start gap-2">
          <select
                            value={code}
                            className="form-control"
                            style={{ maxWidth: '70px' }}
                            onChange={handleCountryChange}
                            required
                        >
                            <option value=""> &nbsp; Code</option>
                            {Object.entries(countries).map(([code, data]) => (
                                <option key={code} value={code}>
                                    &nbsp; +{Array.isArray(data.phone) ? data.phone[0] : data.phone} &nbsp; &nbsp; ({data.name})
                                </option>
                            ))}
                        </select>

                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            value={phone}
                            onChange={handlePhoneChange}
                            placeholder="Enter your phone number"
                            disabled={!code}
                            required
                        />
                        </div>
          </div>
        </div>

        <div className="fields-row">
        <div className="field">
           <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="fields-row">
        <div className="field">
           <label htmlFor="company">Company Name *</label>
          <input
            type="text"
            id="company"
            placeholder="Enter your company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
      </div>

        <div className="review-section mt-3">
          <div className="query field">
          <label htmlFor="query">Write your query *</label>
          </div>
          <textarea
            placeholder="Please provide the number of rolls you want and any other details you want to know."
            rows="5"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
            className="custom-textarea"
          />
        </div>

        <div className="submit-section">
          <button type="submit" className="btn btn-outline-primary btn-rounded" disabled={isLoading || sendingOtp}>
            {isLoading? "SUBMITTING..." : "SUBMIT" }
          </button>
        </div>
      </form>

    <OtpModal 
            showModal={showModal} 
            email={email} 
            closeModal={() => setShowModal(false)}
            onVerified={() => {
        setShowModal(false);
        handleVerifiedOtp()
      }}
     />

    </>
  );
};

export default QuotationModal;
