import React, { useEffect }from 'react';
import Metadata from '../../layout/Metadata';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Loader from '../../layout/Loader';
import { useGetAdminProductsQuery } from '../../../redux/api/productsApi';

const ReviewedCustomers = () => {

    const { data, isLoading } = useGetAdminProductsQuery();

    if (isLoading) return <Loader />;
    let globalIndex = 1;
    return (
        <>
            <Metadata title={"All Users"} />
            <div className="container-fluid">
                <div className="page-header" style={{ backgroundColor: "#fff" }}>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="page-header-left">
                                <h3>Customer List
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
                    </div>

                    <div className="card-body">
                        <div className="table-responsive table-desi">
                            <table className="all-package coupon-table media-table table table-striped">
                                <thead>
                                    <tr>
                                        <th>Index</th>
                                        <th>Name</th>
                                        <th>Country</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        {/* <th>Action</th> */}
                                    </tr>
                                </thead>

                                <tbody>
                                    {data?.products?.length > 0 ? (
                                        data.products.map((product) =>
                                            product?.reviews?.map((user) => (
                                                <tr key={user._id}>
                                                    <td>{globalIndex++}</td>
                                                    <td style={{ fontWeight: "normal", textTransform:"none" }}>{user?.name || "N/A"}</td>
                                                    <td>{user?.country || "N/A"}</td>
                                                    <td>{user?.email || "N/A"}</td>
                                                    <td>{user?.phone || "N/A"}</td>
                                                </tr>
                                            ))
                                        )
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

export default ReviewedCustomers;