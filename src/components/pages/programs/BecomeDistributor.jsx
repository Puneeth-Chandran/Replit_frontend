import React, { useState, useEffect } from 'react';
import { countries } from 'countries-list';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';
import { useDistributorFormSubmitMutation } from '../../../redux/api/userApi';
import { toast } from 'react-hot-toast';
import { useSendOtpMutation } from '../../../redux/api/otpApi';
import OtpModal from '../../layout/OtpModal';

    const BecomeDistributor = () => {

    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [contactName, setContactName] = useState('');
    const [designation, setDesignation] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [phoneCode, setPhoneCode] = useState('');
    const [operatingCountries, setOperatingCountries] = useState([]);
    const [selectedOperatingCountry, setSelectedOperatingCountry] = useState('');

    const [showModal, setShowModal] = useState(false);

    const [sendOtp, { isLoading: sendingOtp, error: otpSendingError, isSuccess: otpSendSuccess }] = useSendOtpMutation();
   
    const [distributorFormSubmit, { isLoading, error: submitError, isSuccess }] = useDistributorFormSubmitMutation();

    useEffect(() => {
        if (code) {
            setPhone('');
            setError('');
        }
    }, [code]);

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setCode(selectedCountry); // update country ISO code (like 'AE')

        const rawPhoneCode = countries[selectedCountry]?.phone;
        const resolvedCode = Array.isArray(rawPhoneCode) ? rawPhoneCode[0] : rawPhoneCode;

        setPhoneCode(resolvedCode);
    };

    // Handle phone input with formatting
    const handlePhoneChange = (e) => {
        const input = e.target.value;
        const formatter = new AsYouType(code);
        const formatted = formatter.input(input);

        setPhone(formatted);

        const parsed = parsePhoneNumberFromString(input, code);
        if (parsed?.isValid()) {
            setError('');
        } else {
            setError('Invalid phone number');
        }
    };

    const handleOperatingCountrySelect = (e) => {
        const selectedCode = e.target.value;
        const countryName = countries[selectedCode]?.name;
      
        // Avoid adding duplicates
        if (countryName && !operatingCountries.includes(countryName)) {
          setOperatingCountries([...operatingCountries, countryName]);
        }
      
        setSelectedOperatingCountry(''); // reset dropdown
      };

    const handleRemoveCountry = (nameToRemove) => {
        setOperatingCountries(
            operatingCountries.filter((name) => name !== nameToRemove)
        );
    };

    const handleVerifiedOtp = async () => {
        try {
          await distributorFormSubmit({
            companyName,
            address,
            contactName,
            designation,
            email,
            phone,
            message,
            phoneCode,
            operatingCountries
          }).unwrap();
      
          setShowModal(false);
        } catch (err) {
          toast.error("Failed to submit form. Please try again.");
        }
      };

    const resetForm = () => {
        setCompanyName('');
        setAddress('');
        setContactName('');
        setDesignation('');
        setEmail('');
        setPhone('');
        setCode('');
        setError('');
        setMessage('');
        setPhoneCode('');
        setOperatingCountries([]);
        setSelectedOperatingCountry('');
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

    useEffect(() => {
            if (submitError?.data?.message) {
                toast.error(submitError.data.message);
            } else if (submitError) {
                toast.error("An unexpected error occurred.");
            }
            if (isSuccess) {
                toast.success('Your form has been submitted successfully!');
                resetForm();
            }
        }, [submitError, isSuccess]);

        const handleSubmit = async (e) => {
            e.preventDefault();
          
            if (!email) return toast.error("Please enter a valid email");

            if (!/\S+@\S+\.\S+/.test(email)) {
                    return toast.error("Please enter a valid email.");
                }

            if (error) {
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
        <div className="distributor-form">
            <form className="row g-3" onSubmit={handleSubmit}>
                {/* Company Name */}
                <div className="col-md-6">
                    <label className="form-label">Company Name *</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder='Enter your company name'
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                </div>

                {/* Company Address */}
                <div className="col-md-6">
                    <label className="form-label">Company Address *</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder='Enter your company address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                {/* Contact Name */}
                <div className="col-md-6">
                    <label className="form-label">Contact Name *</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder='Enter your name'
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        required
                    />
                </div>

                {/* Designation */}
                <div className="col-md-6">
                    <label className="form-label">Designation *</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder='Enter your designation'
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        required
                    />
                </div>

                {/* Email */}
                <div className="col-md-6">
                    <label className="form-label">Email *</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder='Enter your email address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">
                        Phone Number * {error && <div style={{ color: 'red', fontSize: '1.2rem' }}>{error}</div>}
                    </label>

                    <div className="d-flex align-items-start gap-2">
                        <select
                            value={code}
                            className="form-control"
                            style={{ maxWidth: '70px' }}
                            onChange={handleCountryChange}
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

                <div className="col-md-6">
                    <label className="form-label">Countries you operate in *</label>
                    <div className="d-flex align-items-start gap-2">
                    <select
  value={selectedOperatingCountry}
  className="form-control"
  onChange={handleOperatingCountrySelect}
>
  <option value="">Select a country</option>
  {Object.entries(countries).map(([code, data]) => (
    <option key={code} value={code}>
      {data.name}
    </option>
  ))}
</select>
                    </div>

                    {/* Display selected countries as badges */}
                    <div className="d-flex flex-wrap gap-2">
                        {operatingCountries.map((name) => (
                            <span key={name} className="badge bg-secondary d-flex align-items-center gap-1">
                                {name}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveCountry(name)}
                                    className="btn-close btn-close-white btn-sm"
                                    aria-label="Remove"
                                ></button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Message */}
                <div className="col-12">
                    <label className="form-label">Reason for taking Belcab distribution *</label>
                    <textarea
                        className="form-control"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows="4"
                    />
                </div>

                {/* Submit */}
                <div className="col-12 text-end">
                    <button type="submit" className="btn btn-primary" disabled={isLoading||sendingOtp}>
                        {isLoading ? 'SUBMITTING...' : 'SUBMIT'} <i className="bi bi-arrow-right"></i>
                    </button>
                </div>
            </form>
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
</>
    );
};

export default BecomeDistributor;