import React, { useEffect, useState } from 'react';
import { useGetAdminCategoriesQuery, useGetCategoryDetailsQuery, useUpdateCategoryMutation } from '../../../redux/api/categoryApi';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import UpdateCategoryImage from './UpdateCategoryImage';
import Loader from '../../layout/Loader';

const UpdateCategory = ({ showModal, closeModal, id }) => {

    const [name, setName] = useState('');
    const [categoryParentId, setCategoryParentId] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [subcategoryParentId, setSubcategoryParentId] = useState('');

    const [updateCategory, { isLoading, error, isSuccess: updationSuccessfull }] = useUpdateCategoryMutation();
    const { data, isLoading: isFetching, refetch, error:detailsError } = useGetCategoryDetailsQuery(id);
    const {data:categories, isLoading:categoriesLoading, error:categoryError} = useGetAdminCategoriesQuery();

    const location = useLocation();
    const currentPath = location.pathname;

    const isCategory = currentPath === '/admin/category';
    const isSubcategory = currentPath === '/admin/subcategory';
    const isSubSubcategory = currentPath === '/admin/sub-subcategory';

    const close = () => {
        closeModal();
        setName("");
        setCategoryParentId("");
        setSelectedCategory("");
        setSubcategoryParentId("");
    };

     useEffect(() => {
        if (data?.category?.name) {
            setName(data.category.name);
        }
    }, [data?.category?.name]);
        

    useEffect(() => {
    if (updationSuccessfull) {
        setCategoryParentId("");
        setSubcategoryParentId("");
        toast.success("Category updated successfully");

        refetch();
        close(); 
    }
}, [updationSuccessfull]);

        useEffect(() => {
            if (error) {
                toast.error(error?.data?.message || 'Something went wrong, please try again later');
            }

            if(categoryError){
                toast.error(categoryError?.data?.message || 'Something went wrong, please try again later');
            }

            if(showModal){
            if(detailsError){
                toast.error(detailsError?.data?.message || 'Something went wrong, failed to fetch product details');
            }}

        }, [error, categoryError, detailsError, showModal]);

    const submitHandler = async (e) => {
        e.preventDefault();
    
        if (!name.trim()) {
            toast.error("Category name cannot be empty");
            return;
        }
    
        const payload = { name: name.trim() };
    
        if (isSubcategory && categoryParentId) {
            payload.parentId = categoryParentId;
        } else if (isSubSubcategory) {
            // If category is changed but subcategory is not selected
            if (categoryParentId && !subcategoryParentId) {
                toast.error("Please select a subcategory if you change the category.");
                return;
            }
            
            if (subcategoryParentId) {
                payload.parentId = subcategoryParentId;
            }
        }
    
        try {
            await updateCategory({ body: payload, id });
            closeModal();
        } catch (error) {
            toast.error("Failed to update category");
        }
    };

    if (isFetching || categoriesLoading) return <Loader />;

    return (
        <div className={`modal ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }} tabIndex="-1">
            <div className="modal-dialog" role="document">
                <div className="modal-content px-5">
                <div className='d-flex justify-content-end'>
                <button className="btn-close p-4" type="button" aria-label="Close" onClick={close}><span
                          className='fs-1'  aria-hidden="true">&times;</span></button>
                          </div>
                    <div className="modal-header">
                        <h5 className="modal-title f-w-600" id="exampleModalLabel">Update
                            Category</h5>
                    </div>
                    {isFetching ? (
                        <div className="modal-body mt-3">
                            <Loader />
                        </div>
                    ) : (
                        <div className="modal-body mt-3">
                            {isCategory ? (
                                <UpdateCategoryImage id={id} closeModal={closeModal}/>) : (
                                ""
                            )}

                            <form className="needs-validation" onSubmit={submitHandler} encType="multipart/form-data">
                                <div className="form">
                                    <div className="form-group">
                                        <label htmlFor="validationCustom01" className="mb-1">
                                            Category Name :</label>
                                        <input className="form-control" id="validationCustom01" type="text" name='name' value={name} onChange={(e)=>setName(e.target.value)} required />
                                    </div>
                                    {!isCategory && (
                                        <div className="form-group">
                                            <label htmlFor="validationCustom01" className="mb-1">
                                                Parent {isSubSubcategory ? "Category & Subcategory" : isSubcategory ? "Category" : "Subcategory"}:
                                            </label>
                                            {isSubSubcategory ? (
                                                <>
                                                    {/* First Dropdown: Category Selection */}
                                                    <select
                                                        className="form-control digits mb-3"
                                                        name="category"
                                                        value={categoryParentId}
                                                        onChange={(e) => {
                                                            setCategoryParentId(e.target.value);
                                                            const selectedCat = categories?.categoryList?.find(category => category._id === e.target.value);
                                                            setSelectedCategory(selectedCat);
                                                        }}
                                                    >
                                                        <option value="" disabled>
                                                            Select a category to update
                                                        </option>
                                                        {categories?.categoryList?.map((category) => (
                                                            <option key={category._id} value={category._id}>
                                                                {category.name}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    {/* Second Dropdown: Subcategory Selection */}
                                                    <select
                                                        className="form-control digits"
                                                        name="subcategory"
                                                        value={subcategoryParentId}
                                                        onChange={(e) => setSubcategoryParentId(e.target.value)}
                                                        disabled={!selectedCategory}
                                                    >
                                                        <option value="" disabled>
                                                        Select a category to update
                                                        </option>
                                                        {selectedCategory?.children?.map((subcategory) => (
                                                            <option key={subcategory._id} value={subcategory._id}>
                                                                {subcategory.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </>
                                            ) : (
                                                <select
                                                    className="form-control digits"
                                                    name="category"
                                                    value={categoryParentId}
                                                    onChange={(e) => setCategoryParentId(e.target.value)}
                                                >
                                                    <option value="" disabled>
                                                        Select a {isSubcategory ? "category" : "subcategory"} to update
                                                    </option>
                                                    {isSubcategory
                                                        ? categories?.categoryList?.map((category) => (
                                                            <option key={category._id} value={category._id}>
                                                                {category.name}
                                                            </option>
                                                        ))
                                                        : categories?.categoryList?.flatMap((category) =>
                                                            category?.children?.map((subcategory) => (
                                                                <option key={subcategory._id} value={subcategory._id}>
                                                                    {subcategory.name}
                                                                </option>
                                                            ))
                                                        )}
                                                </select>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="modal-footer mt-3">
                                    <button className="btn btn-primary" type="submit" disabled={isLoading}>{isLoading ? "Updating..." : "Update"}</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}

export default UpdateCategory;