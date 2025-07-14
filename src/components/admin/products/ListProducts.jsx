import React, { useEffect } from 'react';
import { useDeleteProductMutation, useGetAdminProductsQuery } from '../../../redux/api/productsApi';
import {toast} from 'react-hot-toast';
import Loader from '../../layout/Loader';
import { Link } from 'react-router-dom';
import Metadata from '../../layout/Metadata';

const ListProducts = () => {
    const {data, isLoading, error } = useGetAdminProductsQuery();
    const [deleteProduct, {isLoading: isDeleteLoading, error: deleteError, isSuccess}] = useDeleteProductMutation();


    useEffect(()=>{
        if(error){
            toast.error(error?.data?.message);
        }

        if(deleteError){
            toast.error(deleteError?.data?.message);
        }

        if(isSuccess){
            toast.success('Product deleted successfully');
        }

    },[error, deleteError, isSuccess]);

    const deleteProductHandler = (id) =>{
        deleteProduct(id)
    }

    if(isLoading) return <Loader/>;

  return (
        <> 
        <Metadata title={"Product List"}/>
                <div className="container-fluid">
                    <div className="page-header" style={{backgroundColor:"#fff"}}>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="page-header-left">
                                    <h3>Product List
                                        <small>Belcab Admin panel</small>
                                    </h3>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header" style={{backgroundColor:"#f1f1f1"}}>
                                    <form className="form-inline search-form search-box">
                                        <div className="form-group">
                                            <input className="form-control-plaintext" type="search" placeholder="Search.."/>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-body" style={{backgroundColor:"#f1f1f1"}}>
                                    <div className="table-responsive table-desi">
                                        <table className="table all-package order-list-table" id="editableTable">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Category</th>
                                                    <th>Option</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                            {data?.products?.length > 0 ? (
                                                data.products.map((product) => (
                                               <tr key={product?.slug}>
                                                   <td data-field="id">{product?.index}</td>

                                                    <td>
                                                        <img src={product?.images[0]?.url} alt={product?.imagealt} data-field="image"/>
                                                    </td>

                                                    <td data-field="name">{product?.name}</td>


                                                    <td data-field="category">{product?.category?.name}{product?.subcategory?.name}{product?.subSubCategory?.name}</td>

                                                    <td>
                                                        <Link to={`/admin/products/${product?.slug}`}>
                                                        <i className="bi bi-pencil-square" title="Edit"></i>
                                                        </Link>
                                                        &nbsp; &nbsp;
                                                        <button style={{border:"none", background:"none"}} onClick={() => deleteProductHandler(product?._id)} disabled={isDeleteLoading}>
                                                        <i className="bi bi-trash" title="Delete"></i>
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
                    </div>
                </div>
 </>
  )
}

export default ListProducts