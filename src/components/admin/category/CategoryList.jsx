import React, { useEffect, useState } from 'react';
import Metadata from '../../layout/Metadata';
import { useDeleteCategoryMutation, useGetAdminCategoriesQuery } from '../../../redux/api/categoryApi';
import toast from 'react-hot-toast';
import Loader from '../../layout/Loader';
import AddCategory from './AddCategory';
import UpdateCategory from './UpdateCategory';

const CategoryList = () => {

    const { data, error, isLoading } = useGetAdminCategoriesQuery();
    const [deleteCategory, { isLoading: isDeleteLoading, isError: isDeleteError, isSuccess: deleteSuccess, error: deleteError }] = useDeleteCategoryMutation();

    const [showModal, setShowModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [categoryId, setCategoryId] = useState('');

    const closeModal = () => setShowModal(false);
    const closeUpdate = () => setUpdateModal(false);

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || 'Failed to fetch categories')
        }

        if(isDeleteError){
            toast.error(deleteError?.data?.message || 'Failed to delete category');
        }
        
        if(deleteSuccess){
            toast.success('Category deleted successfully')
        }

    },[deleteSuccess, error, isDeleteError, deleteError]);

    const deleteCategoryHandler = async (id) => {
        try {
            await deleteCategory(id).unwrap();
        } catch (err) {
            toast.error(err?.data?.message || 'Error deleting category');
        }
    };

    if (isLoading) return <Loader/>

    return (
        <>
            <Metadata title={"Category List"} />
            <div className="container-fluid">
                <div className="page-header">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="page-header-left">
                                <h3>Category
                                    <small>Belcab Admin panel</small>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Container-fluid Ends--> */}

            {/* <!-- Container-fluid starts--> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <form className="form-inline search-form search-box">
                                    <div className="form-group">
                                        <input className="form-control-plaintext" type="search" placeholder="Search.." />
                                    </div>
                                </form>
                                <div className='add-category' style={{paddingLeft: "55%"}}>
                                <button  type="button" className="btn btn-primary add-row mt-md-0 mt-2" onClick={() => setShowModal(true)}>
                                 Add Category</button>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="table-responsive table-desi">
                                    <table className="table all-package table-category " id="editableTable">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Image</th>
                                                <th>Title</th>
                                                <th>Status</th>
                                                <th>Option</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {data?.categoryList?.map((category, index) => (
                                                <tr key={category.slug}>
                                                    <td data-field="id">{index + 1}</td>

                                                    <td>
                                                        <img src={category?.categoryImage}
                                                            data-field="image" alt="" />
                                                    </td>

                                                    <td data-field="name">{category?.name}</td>

                                                    <td className="order-success" data-field="status">
                                                        <span>Active</span>
                                                    </td>

                                                    <td>
                                                    <button style={{border:"none", background:"none"}} onClick={(e) => {setUpdateModal(true); setCategoryId(category?._id);}}>
                                                    <i className="bi bi-pencil-square" title="Edit"></i>
                                                        </button>
                                                        &nbsp; &nbsp;
                                                        <button style={{border:"none", background:"none"}} onClick={() => deleteCategoryHandler(category?._id)} disabled={isDeleteLoading}>
                                                        <i className="bi bi-trash" title="Delete"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <AddCategory showModal={showModal} closeModal={closeModal} />
                <UpdateCategory showModal={updateModal} closeModal={closeUpdate} id={categoryId} />

            </div>
            {/* <!-- Container-fluid Ends--> */}
        </>
    )
}

export default CategoryList