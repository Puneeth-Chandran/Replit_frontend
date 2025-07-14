import React, { useEffect } from 'react';
import Metadata from '../../layout/Metadata';
import { Link } from 'react-router-dom';
import { useDeleteUserMutation, useGetAdminUsersQuery } from '../../../redux/api/userApi';
import { toast } from 'react-hot-toast';
import Loader from '../../layout/Loader';

const ListUsers = () => {

    const { data, isLoading, error } = useGetAdminUsersQuery();

    const [deleteUser, { error: deleteError, isLoading: isErrorLoading, isSuccess }] = useDeleteUserMutation();

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }

        if (deleteError) {
            toast.error(deleteError?.data?.message);
        }

        if (isSuccess) {
            toast.success('User deleted successfully');
        }
    }, [error, deleteError, isSuccess]);

    const deleteUserHandeler = (id) => {
        deleteUser(id);
    }

    if (isLoading) return <Loader />;

    return (
        <>
            <Metadata title={"All Users"} />
            <div className="container-fluid">
                <div className="page-header" style={{ backgroundColor: "#fff" }}>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="page-header-left">
                                <h3>User List
                                    <small>Belcab Admin panel</small>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* // <!-- Container-fluid Ends--> */}

            {/* // <!-- Container-fluid starts--> */}
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                        <form className="form-inline search-form search-box">
                            <div className="form-group">
                                <input className="form-control-plaintext" type="search" placeholder="Search.." /><span
                                    className="d-sm-none mobile-search"><i className='bi bi-search'></i></span>
                            </div>
                        </form>
                        <div className='create-user-btn' style={{ paddingLeft: "55%" }}>
                            <Link to="/admin/user/new" className="btn btn-primary mt-md-0 mt-2">Create User</Link>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="table-responsive table-desi">
                            <table className="all-package coupon-table media-table table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data?.users?.length > 0 ? (
                                        data.users.map((user) => (
                                            <tr data-row-id="1" key={user?._id}>

                                                <td>{user?.index}</td>

                                                <td>{user?.name}</td>

                                                <td>{user?.email}</td>

                                                <td>{user?.role}</td>

                                                {/* <td>Rowan.torres@gmail.com</td> */}

                                                <td>
                                                    <Link to={`/admin/users/${user?._id}`}>
                                                    <i className="bi bi-pencil-square" title="Edit"></i>
                                                    </Link>
                                                    &nbsp; &nbsp;
                                                    <button style={{ border: "none", background: "none" }}>
                                                    <i className="bi bi-trash" title="Delete"
                                                            disabled={isErrorLoading} onClick={() => deleteUserHandeler(user?._id)}></i>
                                                    </button>
                                                </td>

                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">No products available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListUsers