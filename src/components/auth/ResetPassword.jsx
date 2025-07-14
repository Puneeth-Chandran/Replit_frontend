import React, {useState,useEffect} from 'react';
import { useResetPasswordMutation } from '../../redux/api/userApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const params = useParams();

    const [resetPassword, {isLoading, error, isSuccess}] = useResetPasswordMutation();

    const {isAuthenticated} = useSelector((state)=> state.auth);

    useEffect(()=> {
        if(isAuthenticated){
            navigate("/admin/dashboard")
        }
        if(error){
            toast.error(error?.data?.message);
        }
        if(isSuccess){
            toast.success('Password updated successfully !!!');
            navigate("/admin-belcab");
        }
    },[error, isAuthenticated, navigate, isSuccess]);

    const submitHandler = (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            return toast.error('Password does not match. Try again !!!');
        }

        const data = {password, confirmPassword};

        resetPassword({ token: params?.token, body: data });
    };


  return (
    <div className="container" style={{marginTop:"10rem", marginBottom:"10rem"}}>
            <div className="form-box">
                <div className="form-tab">
                    <div className="nav nav-pills mb-2" style={{display:"flex", justifyContent:"center", alignContent:"center"}}>
                        <h4>Reset Password</h4>
                    </div>
                    <div className="tab-content">

                        <div className="tab-pane fade show active">
                            <form onSubmit={submitHandler}>
                            <div className="form-group">
							    			<label htmlFor="registered-password">Password *</label>
							    			<input type="password" className="form-control" id="password_field" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
							    		</div>
                                        {/* <!-- End .form-group --> */}

                            <div className="form-group">
							    			<label htmlFor="confirm-password">Confirm Password *</label>
							    			<input type="password" className="form-control" id="confirm_password_field" name="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
							    		</div>
                                        {/* <!-- End .form-group -->         */}

                                <div className="form mt-4" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                    <button type="submit" className="btn btn-outline-primary-2" disabled={isLoading}>
                                        <span>{isLoading?"RESETTING...":"RESET"}</span>
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
};

export default ResetPassword;