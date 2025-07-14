import React, {useEffect, useState} from 'react';
import { useLoginMutation } from '../../redux/api/authApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const [login, {isLoading, error, data }]=useLoginMutation();
    const { isAuthenticated } = useSelector((state) => state.auth);
    
    useEffect(()=>{

        if (isAuthenticated) {
            navigate("/admin/dashboard");
        }

        if(error){
            const errorMessage = error?.data?.message || "An unexpected error occurred.";
            toast.error(errorMessage)
        }
    }, [error,isAuthenticated,navigate]);

    const submitHandler = (e) =>{
        e.preventDefault();

        const loginData = {
            email,
            password,
        };

        login(loginData);
    };

  return (
    <div className='admin-panel' style={{backgroundColor:"#f1f1f1"}}>
    <div className='pageWrapper'>
    <div className="authentication-box">
        <div className="container">
            <div className="card tab2-card card-login">
                <div className="card-body">
                    <div className="login-header text-center mb-4 mt-3">
                        <div className="logo-container mb-6 d-flex justify-content-center">
                            <img src="/assets/images/banners/belcab/Logo/BELCAB_STENCIL-01[1].png" alt="Company Logo" className="img-fluid" style={{maxHeight: "30px"}}/>
                        </div>
                        <h3 className="card-title" style={{color: "#000"}}>Welcome Back !!!</h3>
                        <p className="text-muted">Please login to your account</p>
                    </div>
                    <form className="form-horizontal auth-form mb-3" onSubmit={submitHandler}>
                        <div className="form-group">
                            <input 
                                required 
                                name="email" 
                                type="email" 
                                className="form-control" 
                                placeholder="Username" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="username"
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                required 
                                name="password" 
                                type="password" 
                                className="form-control" 
                                placeholder="Password"  
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                        </div>
                        <div className="form-terms">
                            <div className="form-check mesm-2">
                                <input type="checkbox" className="form-check-input" id="customControlAutosizing"/>
                                <label className="form-check-label ps-2" htmlFor="customControlAutosizing">
                                    Remember me
                                </label>
                                <Link to="/password/forgot" className="btn btn-default forgot-pass">
                                    Forgot Password!
                                </Link>
                            </div>
                        </div>
                        <div className="form-button">
                            <button className="btn btn-primary" type="submit" disabled={isLoading}>
                                {isLoading ? "Authenticating..." : "Login"}
                            </button>
                        </div>
                    </form>

                   </div>
            </div>
        </div>
    </div>
</div>
</div>
  )
}

export default AdminLogin;