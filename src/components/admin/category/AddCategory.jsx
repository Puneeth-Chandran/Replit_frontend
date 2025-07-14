import React, { useEffect, useState, useRef } from 'react';
import { useCreateCategoryMutation, useGetAdminCategoriesQuery } from '../../../redux/api/categoryApi';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import Loader from '../../layout/Loader';

const AddCategory = ({ showModal, closeModal }) => {

    const [name, setName] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [categoryParentId, setCategoryParentId] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [subcategoryParentId, setSubcategoryParentId] = useState('');
    const fileInputRef = useRef(null);

    const [createCategory, { isLoading, error, isSuccess }] = useCreateCategoryMutation();
    const { data, isLoading:dataLoading, error:dataError } = useGetAdminCategoriesQuery();

    const location = useLocation();
    const currentPath = location.pathname;

    const isCategory = currentPath === '/admin/category';
    const isSubcategory = currentPath === '/admin/subcategory';
    const isSubSubcategory = currentPath === '/admin/sub-subcategory';

    const handleResetFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const resetForm = () => {
        setName('');
        setCategoryImage('');
        setCategoryParentId('');
        setSubcategoryParentId('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

        useEffect(() => {
            if (isSuccess) {
                toast.success('Category created successfully');
                resetForm();
                closeModal();
            }; 

            if(dataError) {
                toast.error(dataError?.data?.message || 'Something went wrong, please try again later');
            }

            if (error) {
                toast.error(error?.data?.message || 'Something went wrong, please try again later');
            }
        }, [isSuccess, error, dataError])

    const handleFileChange = (e) => {
        setCategoryImage(e.target.files[0]);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!name || (isCategory && !categoryImage) || (!isCategory && !categoryParentId)) {
            toast.error('All required fields must be filled.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name.trim());
        if (isCategory) {
            formData.append('categoryImage', categoryImage);
        } else if (isSubcategory) {
            formData.append('parentId', categoryParentId);
        } else if (isSubSubcategory) {
            formData.append('parentId', subcategoryParentId);
        }

        try {
            await createCategory(formData);
        } catch (error) {
            console.error(error);
        }
    };

    if(dataLoading) return <Loader/>;

    return (
        <div className={`modal ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }} tabIndex="-1">
            <div className="modal-dialog" role="document">
                <div className="modal-content px-5 py-3">
                    <div className="modal-header">
                        <h5 className="modal-title f-w-600" id="exampleModalLabel">Add
                            Category</h5>
                        <button className="btn-close" type="button" aria-label="Close" onClick={closeModal}><span
                            aria-hidden="true">&times;</span></button>
                    </div>
                    <div className="modal-body">
                        <form className="needs-validation" onSubmit={submitHandler} encType="multipart/form-data">
                            <div className="form">
                                <div className="form-group">
                                    <label htmlFor="validationCustom01" className="mb-1">
                                        Category Name :</label>
                                    <input className="form-control" id="validationCustom01" type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} required />
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
                        setSelectedCategory(data?.categoryList?.find(category => category._id === e.target.value));
                    }}
                >
                    <option value="" disabled>
                        Select a category
                    </option>
                    {data?.categoryList?.map((category) => (
                        <option key={category.slug} value={category._id}>
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
                        Select a subcategory
                    </option>
                    {selectedCategory?.children?.map((subcategory) => (
                        <option key={subcategory.slug} value={subcategory._id}>
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
                    Select a {isSubcategory ? "category" : "subcategory"}
                </option>
                {isSubcategory
                    ? data?.categoryList?.map((category) => (
                          <option key={category.slug} value={category._id}>
                              {category.name}
                          </option>
                      ))
                    : data?.categoryList?.flatMap((category) =>
                          category?.children?.map((subcategory) => (
                              <option key={subcategory.slug} value={subcategory._id}>
                                  {subcategory.name}
                              </option>
                          ))
                      )}
            </select>
        )}
    </div>
)}
                                {isCategory && (
                                    <div className="form-group mb-0">
                                        <label htmlFor="validationCustom02" className="mb-1">
                                            Category Image :</label>
                                        <input ref={fileInputRef} className="form-control" name='categoryImage' type="file" onChange={handleFileChange} onClick={handleResetFileInput} required />
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer mt-3">
                                <button className="btn btn-primary" type="submit" disabled={isLoading}>{isLoading ? "Creating..." : "Create"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCategory;