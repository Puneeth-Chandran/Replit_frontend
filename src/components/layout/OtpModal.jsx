import React,{ useState, useEffect } from 'react';
import { useVerifyOtpMutation, useResendOtpMutation } from '../../redux/api/otpApi';
import { toast } from 'react-hot-toast';

const OtpModal = ( {showModal, email, onVerified, closeModal} ) => {

const [otp, setOtp] = useState('');
const [cooldown, setCooldown] = useState(0);

const [verifyOtp, { isLoading: verifyingOtp, error: verificationError, isSuccess: verificationSuccess }] = useVerifyOtpMutation();
const [resendOtp, { isLoading: resendingOtp }] = useResendOtpMutation();

useEffect(() => {
    if (showModal) {
      setCooldown(90);
    }
  }, [showModal]);

const handleVerifyOtp = async () => {
        if (!otp) return toast.error("Please enter the OTP");
        try {
          const res = await verifyOtp({ email, otp }).unwrap();
          if (res.verified) {
            toast.success("Email verified successfully!");
            setOtp('');
            setCooldown(0);
            onVerified();
          } else {
            toast.error("Invalid OTP");
          }
        } catch (err) {
          toast.error("OTP verification failed");
        }
      };

      const handleResendOtp = async () => {
        try {
          await resendOtp({ email }).unwrap();
          toast.success("OTP resent to your email.");
          setCooldown(90);
        } catch (err) {
          toast.error("Failed to resend OTP");
        }
      };
    
      // Cooldown timer
      useEffect(() => {
        if (cooldown === 0) return;
        const timer = setInterval(() => {
          setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
      }, [cooldown]);
    

      useEffect(() => {
        if (verificationError?.data?.message) {
            toast.error(verificationError.data.message);
        } else if (verificationError) {
            toast.error("An unexpected error occurred.");
        }
        if (verificationSuccess) {
            setOtp('');
        }
    }, [verificationError, verificationSuccess]);

    if (!showModal) return null;

  return (
    <div className="otp-modal-overlay">
      <div className="otp-modal">
        <h2>OTP Verification</h2>
        <button className="closeModal" onClick={closeModal}>
        &times;
      </button>
        <p>An OTP has been sent to your email. Please enter it below to submit the form:</p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
          placeholder="Enter OTP"
          className="otp-input"
          maxLength={6}
        />
        
        <div className="d-flex align-items-start gap-2">

        <button
          className="otp-btn"
          onClick={handleVerifyOtp}
          disabled={verifyingOtp}
        >
          {verifyingOtp ? 'Verifying...' : 'Verify & Submit'}
        </button>
        <button className="otp-btn" onClick={closeModal}>
         Cancel
        </button>
        </div>
        
        <div className="resend-section mt-1">
          <button
            className="resend-btn"
            onClick={handleResendOtp}
            disabled={resendingOtp || cooldown > 0}
          >
            {resendingOtp
              ? 'Resending...'
              : cooldown > 0
              ? `Resend OTP in ${cooldown}s`
              : 'Resend OTP'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
