import React, { useEffect, useState } from 'react';
import { useRegisterMutation } from '../../../redux/api/authApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Metadata from '../../layout/Metadata';

const NewUser = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        role:'',
        password:'',
        confirmPassword: '',
    });

    const { name, email, password, role, confirmPassword} = user;

    const navigate = useNavigate();
    
    const [register, {isLoading, error, data}] = useRegisterMutation();
    
    useEffect(()=>{
        

        if(error){
            const errorMessage = error?.data?.message || "An unexpected error occurred.";
            toast.error(errorMessage)
        }
        if (data) {
            toast.success("User created successfully");
            setUser({ name: '', email: '', password: '', role:'', confirmPassword:'', });
            navigate("/admin/users");
        }
    },[error,navigate,data]);

    const submitHandler = (e) =>{
        e.preventDefault();

        if (user.password !== user.confirmPassword) {
            toast.error("Passwords does not match");
            return;
        }

        const signUpData = {
            name,
            email,
            role,
            password,
        };

        register(signUpData);
    };

    const onChange= (e) =>{
        setUser({...user, [e.target.name]: e.target.value});
    };

  return (
    <>
    <Metadata title={"New user"}/>
    <div className="container-fluid">
                    <div className="page-header" style={{backgroundColor:"#fff"}}>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="page-header-left">
                                    <h3>Create User
                                        <small>Belcab Admin panel</small>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 {/* <!-- Container-fluid Ends--> */}

                {/* // <!-- Container-fluid starts--> */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card tab2-card">
                                <div className="card-body"  style={{backgroundColor:"#f1f1f1"}}>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade active show" id="account" role="tabpanel"
                                            aria-labelledby="account-tab">
                                            <form className="needs-validation user-add" onSubmit={submitHandler}>
                                                <h4>Account Details</h4>
                                                <div className="form-group row">
                                                    <label htmlFor="validationCustom0"
                                                        className="col-xl-3 col-md-4"> Name</label>
                                                    <div className="col-xl-8 col-md-7">
                                                        <input className="form-control" id="validationCustom0" type="text"
                                                           name="name" value={name} onChange={onChange} required/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="validationCustom1"
                                                        className="col-xl-3 col-md-4"> Role</label>
                                                    <div className="col-xl-8 col-md-7">
                                                        <select className="form-control" id="validationCustom1"
                                                         aria-label='Select Role' aria-placeholder='Select Role' name="role" value={role} onChange={onChange} required>
                                                         <option value="" disabled>Select Role</option>
                                                         <option value="user">User</option>
                                                         <option value="admin">Admin</option>
                                                         </select>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="validationCustom2"
                                                        className="col-xl-3 col-md-4"> Email</label>
                                                    <div className="col-xl-8 col-md-7">
                                                        <input className="form-control" id="validationCustom2" type="email"
                                                          name="email" value={email} onChange={onChange} autoComplete="username" required/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="validationCustom3"
                                                        className="col-xl-3 col-md-4"> Password</label>
                                                    <div className="col-xl-8 col-md-7">
                                                        <input className="form-control" id="validationCustom3"
                                                         name="password" value={password} onChange={onChange} type="password" autoComplete="new-password" required/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="validationCustom4"
                                                        className="col-xl-3 col-md-4"> Confirm
                                                        Password</label>
                                                    <div className="col-xl-8 col-md-7">
                                                        <input className="form-control" id="validationCustom4"
                                                          name="confirmPassword" value={confirmPassword} onChange={onChange}  type="password" autoComplete="new-password"  required/>
                                                    </div>
                                                </div>
                                                <div className="pull-right" style={{display:"flex", justifyContent:"end",alignContent:"end",paddingBlockEnd:"30px", marginRight:"9.5rem"}}>
                                        <button type="submit" className="btn btn-primary" disabled={isLoading}>{isLoading?"Creating":"Create"}</button>
                                    </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </>
  )
}

export default NewUser