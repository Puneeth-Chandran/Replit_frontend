import React, { useEffect, useState } from 'react';
import { useGetAdminProductDetailsQuery, useUpdateProductMutation } from '../../../redux/api/productsApi';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import Metadata from '../../layout/Metadata';
import UploadImages from './UploadImages';
import { useGetAdminCategoriesQuery } from '../../../redux/api/categoryApi';
import { useGetAdminDatasheetsQuery } from '../../../redux/api/datasheetApi';
import { useGetAdminSpecificationsQuery } from '../../../redux/api/specApi';

const UpdateProduct = (props) => {
    
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: "",
        sku: "",
        category: "",
        subcategory: "",
        subSubcategory: "",
        datasheet: "",
        description: "",
        imagealt: "",
        shortdescription: "",
        seo_title: "",
        seo_description: "",
    });

    const { name, sku, category, subcategory, subSubcategory, datasheet, description, imagealt, shortdescription, seo_title, seo_description } = product;
    
    const [updateProduct, { isLoading, error, isSuccess }] = useUpdateProductMutation();
    const { data: catData, isLoading: isLoadingCategories, error: errorCategories } = useGetAdminCategoriesQuery();
    const { data: dataSheet, isLoading: sheetLoading, error: sheetError } = useGetAdminDatasheetsQuery();
    const { data: specData, isLoading:specLoading, error: specError } = useGetAdminSpecificationsQuery();

    const allSpecifications = specData?.specifications;
    
    const { data } = useGetAdminProductDetailsQuery(props.slug);
    
    useEffect(() => {
        if (data?.product) {
            setProduct({
                name: data?.product?.name,
                sku: data?.product?.sku,
                category: data?.product?.category,
                subcategory: data?.product?.subcategory,
                subSubcategory: data?.product?.subSubcategory,
                datasheet: data?.product?.datasheet,
                description: data?.product?.description,
                imagealt: data?.product?.imagealt,
                shortdescription: data?.product?.shortdescription,
                seo_title: data?.product?.seo_title,
                seo_description: data?.product?.seo_description
            })
        }

        if (error) {
            toast.error(error?.data?.message);
        }
        if (isSuccess) {
            toast.success("Product updated successfully !!!");
            navigate('/admin/products');
        }
    }, [error, isSuccess, navigate, data]);

    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };
    
    const handleCategoryChange = (e) => {
        const selectedId = e.target.value;
        const category = catData?.categoryList?.find((cat) => cat._id === selectedId);
        
        setProduct((prev) => ({
            ...prev,
            category: selectedId,
            subcategory: undefined, // Set to undefined instead of empty string
            subSubcategory: undefined
        }));
    
        setSelectedCategory(category);
        setSelectedSubcategory(null);
    };
    
    const handleSubcategoryChange = (e) => {
        const selectedId = e.target.value;
        const subcategory = selectedCategory?.children?.find((sub) => sub._id === selectedId);
        
        setProduct((prev) => ({
            ...prev,
            subcategory: selectedId || undefined, // Avoid empty strings
            subSubcategory: undefined
        }));
    
        setSelectedSubcategory(subcategory);
    };
    
    const handleSubSubcategoryChange = (e) => {
        const selectedId = e.target.value;
    
        setProduct((prev) => ({
            ...prev,
            subSubcategory: selectedId || undefined
        }));
    };
    
    const submitHandler = (e) => {
        e.preventDefault();
        updateProduct({ slug: props?.slug, body: product });
    };

    const discard = (e) => {
        setProduct({
            name: "",
            sku: "",
            category: "",
            subcategory: "",
            subSubcategory: "",
            datasheet: "",
            description: "",
            imagealt: "",
            shortdescription: "",
            seo_title: "",
            seo_description: "",
        });
        navigate('/admin/dashboard');
    }

    return (
        <>
            <Metadata title={"Update product"} />
            <div className="admin-panel container-fluid">
                <div className="page-header" style={{ backgroundColor: "#fff" }}>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="page-header-left">
                                <h3>Update Product</h3>
                                <small>Belcab Admin panel</small>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="admin-panel container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                        <div className="card-header">
                        {data?.product?.isVariant ? (null) : (
                                <div className='add-category' style={{paddingLeft: "79%"}}>
                                <Link to= {`/admin/product/${props?.slug}/add-variant`} className="btn btn-primary add-row mt-md-0 mt-2">
                                Add Variant</Link>
                                </div>
                                )}
                            </div>
                            <div className="card-body">
                                <div className="row product-adding">
                                    <div className="col-xl-6">
                                        <UploadImages slug={props.slug}/>
                                    </div>
                                    <div className="col-xl-6">
                                    <div className="form">
                                                <div className="form-group mb-3 row">
                                                    <label htmlFor="validationCustom01"
                                                        className="col-xl-3 col-sm-4 mb-0">Image alt :</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <input className="form-control"
                                                            type="text" name="imagealt" value={imagealt} onChange={onChange} required />
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                    <div className="col-xl-9 mt-6">
                                    <form className="needs-validation add-product-form" onSubmit={submitHandler}>
                                            <div className="form">
                                                <div className="form-group mb-3 row">
                                                    <label htmlFor="validationCustom01"
                                                        className="col-xl-3 col-sm-4 mb-0">Name :</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <input className="form-control"
                                                            type="text" name="name" value={name} onChange={onChange} required />
                                                    </div>
                                                </div>

                                                <div className="form-group mb-3 row">
                                                    <label htmlFor="SKU"
                                                        className="col-xl-3 col-sm-4 mb-0">SKU :</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <input className="form-control"
                                                            type="text" name="sku" value={sku} onChange={onChange}/>
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label htmlFor="exampleFormControlSelect1"
                                                        className="col-xl-3 col-sm-4 mb-0">Category :</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <select
                                                            className="form-control digits mb-3"
                                                            name="category"
                                                            value={category?._id}
                                                            onChange={ handleCategoryChange }
                                                        >   
                                                         <option value="" disabled>
                                                                Select Category
                                                            </option>
                                                            {catData?.categoryList?.map((category) => (
                                                                <option key={category?._id} value={category?._id}>
                                                                    {category.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label htmlFor="exampleFormControlSelect1"
                                                        className="col-xl-3 col-sm-4 mb-0">Sub Category :</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <select
                                                            className="form-control digits mb-3"
                                                            name="subcategory"
                                                            value={subcategory?._id}
                                                            onChange={ handleSubcategoryChange }
                                                            disabled={!selectedCategory}
                                                        >
                                                            <option value="" disabled={selectedCategory}>
                                                                {subcategory?.name || "Select Subcategory"}
                                                            </option>
                                                            {selectedCategory?.children?.map((subcategory) => (
                                                                <option key={subcategory._id} value={subcategory._id}>
                                                                    {subcategory.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label htmlFor="exampleFormControlSelect1"
                                                        className="col-xl-3 col-sm-4 mb-0">Sub Subcategory :</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <select
                                                            className="form-control digits"
                                                            name="subSubcategory"
                                                            value={subSubcategory?._id}
                                                            onChange={ handleSubSubcategoryChange }
                                                            disabled={!selectedSubcategory}
                                                        >
                                                            <option value="" disabled={selectedSubcategory}>
                                                                {subSubcategory?.name || "Select Sub-Subcategory"}
                                                            </option>
                                                            {selectedSubcategory?.children?.map((subSubcategory) => (
                                                                <option key={subSubcategory._id} value={subSubcategory._id}>
                                                                    {subSubcategory.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-sm-4">Description :</label>
                                                    <div className="col-xl-8 col-sm-7 description-sm">
                                                        <textarea name="description" cols="70"
                                                            rows="4" value={description} onChange={onChange} required></textarea>
                                                    </div>

                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-sm-4">Reference :</label>
                                                    <div className="col-xl-8 col-sm-7 description-sm">
                                                        <textarea name="shortdescription" cols="70"
                                                            rows="4" value={shortdescription} onChange={onChange} required></textarea>
                                                    </div>

                                                </div>

                                                <div className="form-group row">
                                                    <label htmlFor="exampleFormControlSelect1"
                                                        className="col-xl-3 col-sm-4 mb-0">Datasheet :</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <select
                                                            className="form-control digits mb-3"
                                                            name="datasheet"
                                                            value={datasheet}
                                                            onChange={onChange}
                                                        >
                                                            <option value="" disabled>
                                                                Select a datasheet
                                                            </option>
                                                            {dataSheet?.datasheets?.map((datasheet) => (
                                                                <option key={datasheet._id} value={datasheet._id}>
                                                                    {datasheet.title}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form-group mb-3 row">
                                                    <label htmlFor="validationCustom01"
                                                        className="col-xl-3 col-sm-4 mb-0">SEO Title :</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <input className="form-control"
                                                            type="text" name="seo_title" value={seo_title} onChange={onChange} required />
                                                    </div>
                                                </div>

                                                <div className="form-group mb-3 row">
                                                    <label className="col-xl-3 col-sm-4">SEO Description :</label>
                                                    <div className="col-xl-8 col-sm-7 description-sm">
                                                        <textarea name="seo_description" cols="70"
                                                            rows="4" value={seo_description} onChange={onChange} required></textarea>
                                                    </div>
                                                </div>
                                                            
                                                {data?.product?.specifications?.map((spec) => {
                                                        const matchedSpec = allSpecifications.find(
                                                            (s) => s._id === spec.specId._id
                                                        );

                                                        return (
                                                            <div className="form-group row" key={spec._id}>
                                                                <label className="col-xl-3 col-sm-4 mb-0">
                                                                    {matchedSpec?.title}
                                                                </label>
                                                                <div className="col-xl-8 col-sm-7">
                                                                    <select
                                                                        className="form-control digits mb-3"
                                                                        name="specification"
                                                                        value={spec.value}
                                                                        onChange={onChange}
                                                                    >
                                                                        <option value="">
                                                                            {spec?.value?.title}
                                                                        </option>

                                                                        {matchedSpec?.children?.map((child) => (
                                                                            <option key={child._id} value={child._id}>
                                                                                {child.title}
                                                                            </option>
                                                                        ))}
                                                                            <option value="">
                                                                                None
                                                                            </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}

                                            </div>
                                            <div className="offset-xl-3 offset-sm-4 mt-4">
                                                <button type="submit" className="btn btn-primary" disabled={ isLoading }>{isLoading ? "Updating" : "Update"}</button>&nbsp;&nbsp;
                                                <button type="button" className="btn btn-light" onClick={discard}>Discard</button>
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

export default UpdateProduct;