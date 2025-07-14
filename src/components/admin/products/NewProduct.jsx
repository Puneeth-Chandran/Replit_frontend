import React, { useEffect, useRef, useState } from 'react';
import { useCreateProductMutation, useGetProductDetailsQuery, useCreateProductVariantMutation } from '../../../redux/api/productsApi';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Metadata from '../../layout/Metadata';
import { useGetAdminCategoriesQuery } from '../../../redux/api/categoryApi';
import { useGetAdminDatasheetsQuery } from '../../../redux/api/datasheetApi';
import AddSpecification from '../specification/AddSpecification';

const NewProduct = (props) => {
    
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [specifications, setSpecifications] = useState([]);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [product, setProduct] = useState({
        name: "",
        sku: "",
        category: "",
        subcategory:"",
        subSubcategory:"",
        datasheet:"",
        description: "",
        imagealt:"",
        shortdescription:"",
        seo_title:"",
        seo_description:"",
    });
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const slug = props.slug;
    console.log("Slug:", slug);
    
    const isVariant = !!slug && slug !== "new";
    console.log("Is Variant:", isVariant);
    

    const { data: parentData, isLoading: parentLoading } = useGetProductDetailsQuery(slug, {
        skip: !isVariant,
      });
      console.log("Parent Data:", parentData);
      
      useEffect(() => {
        if (isVariant && parentData?.product) {
          const parent = parentData.product;
      
          setProduct(prev => ({
            ...prev,
            category: parent.category._id,
            subcategory: parent.subcategory || "",
            subSubcategory: parent.subSubcategory?._id || "",
          }));
      
          setSelectedCategory(parent.category);
          setSelectedSubcategory(parent.subcategory || null);
        }
      }, [isVariant, parentData]);
console.log(product.subcategory.name);

    const closeModal = () => setShowModal(false);

    const onChanges = (e) => {

        const files = Array.from(e.target.files);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((prev) => [...prev, reader.result]);
                    setImages((prev) => [...prev, reader.result]);
                }
            };

            reader.readAsDataURL(file)
        })
    };
    

    const handleSaveSpecifications = (selectedSpecs) => {
        setSpecifications(selectedSpecs);
    };

    const handleCategoryChange = (e) => {
        if (!data || !data.categoryList) return;
        const selectedId = e.target.value;
        const category = data?.categoryList?.find((cat) => cat._id === selectedId);
        setProduct((prev) => ({
            ...prev,
            category: selectedId,
            subcategory: "",
            subSubcategory: ""
        }));
        setSelectedCategory(category);
        setSelectedSubcategory(null);

    };

    const handleSubcategoryChange = (e) => {
        const selectedId = e.target.value;
        const subcategory = selectedCategory?.children?.find((sub) => sub._id === selectedId);
        setProduct((prev) => ({
            ...prev,
            subcategory: selectedId,
            subSubcategory: ""
        }));
        setSelectedSubcategory(subcategory);
    };

    const handleSubSubcategoryChange = (e) => {
        const selectedId = e.target.value;
        setProduct((prev) => ({
            ...prev,
            subSubcategory: selectedId
        }));
    };

    const handleResetFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleImagePreviewDelete = (index) => {
        setImagesPreview((prev) => prev.filter((_, i) => i !== index));
        setImages((prev) => prev.filter((_, i) => i !== index));
    };
    
    const { name, sku, description, datasheet, imagealt, shortdescription, seo_description, seo_title  } = product;

    const [createProduct, { isLoading, error, isSuccess }] = useCreateProductMutation();
    const { data } = useGetAdminCategoriesQuery();
    const {data: datasheets} = useGetAdminDatasheetsQuery();
    const [createProductVariant, { isLoading:variantLoading, error:variantError, isSuccess:variantSuccess}] = useCreateProductVariantMutation();
    
    useEffect(() => {
        if (error||variantError) {
            toast.error(error?.data?.message || variantError?.data?.message);
        }
        if (isSuccess||variantSuccess) {
            toast.success("Product created");
            navigate('/admin/products');
            setImages([]);
            setImagesPreview([]);
        }
    }, [error, isSuccess, navigate, variantError, variantSuccess]);

    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };
    

    const submitHandler = (e) => {
    e.preventDefault();

    if (!product.name || !product.category || !product.description) {
        toast.error("Please fill all required fields.");
        return;
    }

    if (images.length === 0) {
        toast.error("Please upload at least one image.");
        return;
    }

    const productData = {
        ...product,
        images,
        isVariant: isVariant, 
        parentProductId: isVariant ? parentData?.product?._id : null,
        subcategory: product.subcategory || null,
        subSubcategory: product.subSubcategory || null,
        specifications: specifications.map(spec => ({
            specId: spec.specId,  
            value: spec.value    
        })),
    };

    if (isVariant) {
        createProductVariant({
            slug,
            ...productData,
          });
      } else {
        createProduct(productData);
      }
};

    const discard = (e) => {
        setProduct({ name: "", sku: "", category: "", description: "", images: "", imagealt:"", shortdescription:"", seo_description:"", seo_title:"", datasheet:"" });
        navigate('/admin/dashboard');
    };

    return (
        <>
            <Metadata title={"Create new product"} />
            <div className="container-fluid">
                <div className="page-header" style={{ backgroundColor: "#fff" }}>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="page-header-left">
                                <h3>{isVariant?`Adding Variant of ${parentData?.product?.name}`:"Add Product"}
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
                        <form className="needs-validation add-product-form" onSubmit={submitHandler}>
                            <div className="card">
                            <div className="card-header">
                                <div className='add-category' style={{paddingLeft: "79%"}}>
                                <button type="button" className="btn btn-primary add-row mt-md-0 mt-2" onClick={() => setShowModal(true)}>
                                Add Specification</button>
                                </div>
                            </div>
                                <div className="card-body">
                                    <div className="row product-adding">
                                        <div className="col-xl-6">
                                            <div className="add-product">
                                                <ul className="file-upload-product">

                                                    <li>
                                                        {imagesPreview?.map((img, index) => (
                                                            <div className="product-box" key={index}>
                                                                <div className="img-wrapper px-1">
                                                                    <div className="front">
                                                                        <img src={img} className="img-fluid blur-up img-prev lazyload" alt="" style={{height:"20rem", width:"20rem"}}/>
                                                                        <div className="product-hover">
                                                                            <li>
                                                                                <button
                                                                                    type='button'
                                                                                    className="btn"
                                                                                    onClick={() => handleImagePreviewDelete(index)}
                                                                                >
                                                                                    <i className="bi bi-x-circle-fill"></i></button>
                                                                            </li>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}

                                                    </li>

                                                    <li>
                                                        <div className="box-input-file">
                                                            <input
                                                                ref={fileInputRef}
                                                                className="upload"
                                                                type="file"
                                                                name="images"
                                                                multiple
                                                                onChange={onChanges}
                                                                onClick={handleResetFileInput}
                                                            />
                                                            <i className="bi bi-plus" title="Add"></i>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
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
                                        
                                    </div>
                                    <div className="col-xl-9 mt-6">
                                            <div className="form">
                                                <div className="form-group mb-3 row">
                                                    <label htmlFor="validationCustom01"
                                                        className="col-xl-3 col-sm-4 mb-0">Name :</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <input className="form-control"
                                                            type="text" name="name" value={name} onChange={onChange} required />
                                                    </div>

                                                </div>
                                               
                                            </div>

                                            <div className="form">
                                                <div className="form-group mb-3 row">
                                                    <label htmlFor="SKU"
                                                        className="col-xl-3 col-sm-4 mb-0">SKU :</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <input className="form-control"
                                                            type="text" name="sku" value={sku} onChange={onChange} />
                                                    </div>

                                                </div>
                                               
                                            </div>  
                                                { isVariant ? null : (
                                                    <>
                                                <div className="form-group row">
                                                    <label htmlFor="exampleFormControlSelect1"
                                                        className="col-xl-3 col-sm-4 mb-0">Category :</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <select
                                                            className="form-control digits mb-3"
                                                            name="category"
                                                            value={product.category}
                                                            onChange={handleCategoryChange}
                                                            required
                                                        >
                                                            <option value="" disabled>
                                                                Select a category
                                                            </option>
                                                            {data?.categoryList?.map((category) => (
                                                                <option key={category._id} value={category._id}>
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
                                                            value={product.subcategory}
                                                            onChange={handleSubcategoryChange}
                                                            disabled={!selectedCategory}
                                                        >
                                                            <option value="" disabled>
                                                                Select a subcategory
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
                                                            value={product.subSubcategory}
                                                            onChange={handleSubSubcategoryChange}
                                                            disabled={!selectedSubcategory}
                                                        >
                                                            <option value="" disabled>
                                                                Select a sub-subcategory
                                                            </option>
                                                            {selectedSubcategory?.children?.map((subSubcategory) => (
                                                                <option key={subSubcategory._id} value={subSubcategory._id}>
                                                                    {subSubcategory.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                </>
                                                            )}
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-sm-4">Description :</label>
                                                    <div className="col-xl-8 col-sm-7 description-sm">
                                                        <textarea name="description" cols="70"
                                                            rows="4" value={description} onChange={onChange} required></textarea>
                                                    </div>

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
                                                            {datasheets?.datasheets?.map((datasheet) => (
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

                                        </div>
                                        <hr style={{color:"#333"}}></hr>
                            <div className="offset-xl-3 offset-sm-4 mt-4">
                                                        <button type="submit" className="btn btn-primary" disabled={ isLoading || variantLoading } >{isLoading || variantLoading ? "Creating" : "Create"}</button>&nbsp;&nbsp;
                                                        <button type="button" className="btn btn-light" onClick={discard}>Discard</button>
                                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <AddSpecification showModal={showModal} closeModal={closeModal} onSave={handleSaveSpecifications}/>
            </div>
        </>
    )
}

export default NewProduct;