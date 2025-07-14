import React, { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import { useSubmitReviewMutation } from '../../redux/api/productsApi';
import { toast } from 'react-hot-toast';
import { countries } from 'countries-list';
import { useSendOtpMutation } from '../../redux/api/otpApi';
import OtpModal from '../layout/OtpModal';

const NewReview = ({ closeModal, slug }) => {

  const countriesList = Object.values(countries);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [heading, setHeading] = useState('');

  const [showModal, setShowModal] = useState(false);
  
  const [sendOtp, { isLoading: sendingOtp, error: otpSendingError, isSuccess: otpSendSuccess }] = useSendOtpMutation();

  const [submitReview, { isLoading, error, isSuccess }] = useSubmitReviewMutation();

  const handleCountryChange = (country) => {
    setSelectedCountry(country.name);
    setCountryCode(country.phone); // Store the country code
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success('Review submitted successfully');
      closeModal();
    }
  }, [error, isSuccess, closeModal]);

  const handleVerifiedOtp = async () => {
          try {
            await submitReview({
              rating, 
              comment, 
              heading, 
              name, 
              email, 
              selectedCountry, 
              phone, 
              slug, 
              countryCode
            }).unwrap();
        
            setShowModal(false);
          } catch (err) {
            toast.error("Failed to submit form. Please try again.");
          }
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

  const submitHandler = async (e) => {

    e.preventDefault();

    if (!name || !comment) {
      toast.error("Please enter the required fields.");
      return;
    }

    if (!rating) {
      toast.error("Please select a rating.");
      return;
    }
    
    if (!email) return toast.error("Please enter a valid email");

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    try { await sendOtp({ email }).unwrap();
                              setShowModal(true);
                            } catch (err) {
                              toast.error("Failed to send OTP");
                            }
  };

  return (
    <>
      <button className="closeModal" onClick={closeModal}>
        &times;
      </button>
      <div className="page-title mt-2 mb-4">
        <h4 style={{ fontWeight: "normal" }}>Submit Your Review</h4>
      </div>

      <div className="rating-section mt-3">
        <div className="title">
          Overall rating *
        </div>
        <div className="stars">
          <StarRatings
            rating={rating}
            starRatedColor='#FCB941'
            numberOfStars={5}
            starDimension='32px'
            starSpacing='2px'
            starHoverColor='#fcb941'
            changeRating={(e) => setRating(e)}
          />

        </div>
      </div>
      <div className="fields-row">
        <div className="field">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            aria-label="Enter your name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="fields-row">
        <div className="field">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            value={selectedCountry}
            onChange={(e) => {
              const selected = countriesList.find((c) => c.name === e.target.value);
              if (selected) {
                handleCountryChange(selected); // Call your function with the full country object
                setSelectedCountry(selected.name); // Update the state with the name
              }
            }}
          >
            {/* Placeholder for default selection */}
            <option value="" disabled>
              Select your country
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
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <div className="phone-input">
            <span className="country-code">+{countryCode}</span>
            <input
              type="tel"
              id="phone"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
                    e.preventDefault(); // Prevent non-numeric input except backspace
                  }
                }}
            />
          </div>
        </div>
      </div>
      <div className="field">
        <label htmlFor="heading">Heading</label>
        <input
          type="text"
          id="heading"
          aria-label="What's most important to know?"
          placeholder="What's most important to know?"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
      </div>
      <div className="review-section mt-3">
        <div className="title">
          Add a written review *
        </div>
        <textarea
          placeholder="Let us know how was your experience with this product..."
          rows="5"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            transition: "background-color 0.3s ease, border-color 0.3s ease",
          }}
          className="custom-textarea"
        />
      </div>

      <div className="submit-section">
        <button
          className="btn btn-outline-primary btn-rounded" disabled={sendingOtp || isLoading} onClick={submitHandler}>{isLoading ? "Submitting..." : "SUBMIT"}</button>
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

  )
}

export default NewReview;