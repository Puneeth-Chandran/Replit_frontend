import React, {useState, useEffect} from 'react';
import Loader from '../../layout/Loader';
import {toast} from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Metadata from '../../layout/Metadata';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../../redux/api/userApi';

const UpdateUser = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();
    const params = useParams();
    
    const {data} = useGetUserDetailsQuery(params?.id);

    const [updateUser, {error, isSuccess}] = useUpdateUserMutation();

    useEffect(()=>{
        if(data?.user){
            setName(data?.user?.name);
            setEmail(data?.user?.email);
            setRole(data?.user?.role);
        }
    },[data]);

    useEffect(()=>{
        if(data?.user){
            setName(data?.user?.name);
            setEmail(data?.user?.email);
            setRole(data?.user?.role);
        }

        if(error){
            toast.error(error?.data?.message);
        }

        if(isSuccess){
            toast.success("User Updated");
            navigate("/admin/users");
        }
    },[error,data,isSuccess,navigate]);

    const submitHandler = (e) =>{
        e.preventDefault();

        const userData = {
            name, 
            email,
            role
        };

        updateUser({id: params?.id, body:userData});
    };

  return (
    <>
    <Metadata title="Update User" />
    <div className="admin-panel container-fluid">
                    <div className="page-header" style={{backgroundColor:"#fff"}}>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="page-header-left">
                                    <h3>Update User</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 {/* <!-- Container-fluid Ends--> */}

                {/* // <!-- Container-fluid starts--> */}
                <div className="admin-panel container-fluid">
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
                                                           name="name" 
                                                           value={name}
                                                           onChange={(e) => setName(e.target.value)}
                                                           required/>
                                                    </div>
                                                </div>
                                                {/* <div className="form-group row">
                                                    <label htmlFor="validationCustom1"
                                                        className="col-xl-3 col-md-4"> Last Name</label>
                                                    <div className="col-xl-8 col-md-7">
                                                        <input className="form-control" id="validationCustom1" type="text"
                                                            required=""/>
                                                    </div>
                                                </div> */}
                                                <div className="form-group row">
                                                    <label htmlFor="validationCustom2"
                                                        className="col-xl-3 col-md-4"> Email</label>
                                                    <div className="col-xl-8 col-md-7">
                                                        <input className="form-control" id="validationCustom2" type="text"
                                                          name="email" 
                                                          value={email}
                                                          onChange={(e) => setEmail(e.target.value)}
                                                          required/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="validationCustom3"
                                                        className="col-xl-3 col-md-4"> Role</label>
                                                    <div className="col-xl-8 col-md-7">
                                                        <select className="form-control" id="validationCustom3"
                                                         aria-label='Select Role' name="role"
                                                         value={role} 
                                                         onChange={(e) => setRole(e.target.value)}
                                                         required>
                                                         <option value="" disabled>Select Role</option>
                                                         <option value="admin">Admin</option>
                                                         <option value="manager">Manager</option>
                                                         </select>
                                                    </div>
                                                </div>
                                                {/* <div className="form-group row">
                                                    <label htmlFor="validationCustom4"
                                                        className="col-xl-3 col-md-4"> Password</label>
                                                    <div className="col-xl-8 col-md-7">
                                                        <input className="form-control" id="validationCustom4"
                                                         name="password" type="password" required/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="validationCustom5"
                                                        className="col-xl-3 col-md-4"> Confirm
                                                        Password</label>
                                                    <div className="col-xl-8 col-md-7">
                                                        <input className="form-control" id="validationCustom5"
                                                          name="confirmPassword" type="password" required/>
                                                    </div>
                                                </div> */}
                                                <div className="pull-right" style={{display:"flex", justifyContent:"end",alignContent:"end",paddingBlockEnd:"30px", marginRight:"9.5rem"}}>
                                        <button type="submit" className="btn btn-primary">Update</button>
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

export default UpdateUser