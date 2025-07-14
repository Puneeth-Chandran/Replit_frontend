import React, { useEffect, useState } from 'react';
import { useForgotPasswordMutation } from '../../redux/api/userApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    
    const [forgotPassword, {isLoading, error, isSuccess}] = useForgotPasswordMutation();

    const {isAuthenticated} = useSelector((state)=> state.auth);

    useEffect(()=> {
        if(isAuthenticated){
            navigate("/admin/dashboard")
        }
        if(error){
            toast.error(error?.data?.message);
        }
        if(isSuccess){
            toast.success('Password reset link sent to your email');
            setEmail("");
            navigate('/admin-belcab')
        }
    },[error, isAuthenticated, navigate, isSuccess]);

    const submitHandler = (e) => {
        e.preventDefault();

        forgotPassword({ email });
    };

  return (
    <div className="container" style={{marginTop:"15rem", marginBottom:"15rem"}}>
    <div className="form-box">
        <div className="form-tab">
            <div className="nav nav-pills mb-2" style={{display:"flex", justifyContent:"center", alignContent:"center"}}>
                <h4>Forgot Password</h4>
            </div>
            <div className="tab-content">

                <div className="tab-pane fade show active">
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label htmlFor="email_field">Registered email address *</label>
                            <input type="email" className="form-control" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                        </div>
                        {/* <!-- End .form-group --> */}

                        <div className="form mt-4" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <button type="submit" className="btn btn-outline-primary-2" disabled={isLoading}>
                                <span>{isLoading?"SENDING...":"SEND EMAIL"}</span>
                            </button>

                        </div>
                        {/* <!-- End .form-footer --> */}
                    </form>
                </div>
                {/* <!-- .End .tab-pane --> */}
            </div>
            {/* <!-- End .tab-content --> */}
        </div>
        {/* <!-- End .form-tab --> */}
    </div>
    {/* <!-- End .form-box --> */}
</div>
  )
}

export default ForgotPassword;