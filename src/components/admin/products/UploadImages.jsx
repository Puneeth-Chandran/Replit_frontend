import React, { useEffect, useRef, useState } from 'react';
import { useDeleteProductImageMutation, useGetAdminProductDetailsQuery, useUploadProductImagesMutation } from '../../../redux/api/productsApi';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';
import Metadata from '../../layout/Metadata';

const UploadImages = ({slug}) => {
    
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);

    const [uploadProductImages, {isLoading, error, isSuccess}] = useUploadProductImagesMutation();
    const [deleteProductImage, {isLoading: isDeleteLoading, error: deleteError, isSuccess: deleteSuccess}] = useDeleteProductImageMutation();

    const { data } = useGetAdminProductDetailsQuery(slug);

    useEffect(()=>{
        if(data?.product){
            setUploadedImages(data?.product?.images)
        }

        if(error){
            toast.error(error?.data?.message)
        }

        if(deleteError){
            toast.error(deleteError?.data?.message)
        }

        if(deleteSuccess){
            toast.success('Image deleted successfully')
        }

        if(isSuccess){
            setImagesPreview([]);
            toast.success('Images uploaded successfully');
            navigate('/admin/products');
        }
    },[data, isSuccess, error, navigate, deleteError, deleteSuccess]);

    const onChange = (e) => {

        const files = Array.from(e.target.files);

        files.forEach((file) =>{
            const reader = new FileReader();

        reader.onload = () =>{
            if(reader.readyState === 2){
                setImagesPreview((oldArray)=> [...oldArray, reader.result]);
                setImages((oldArray)=> [...oldArray, reader.result]); 
            }
        };

        reader.readAsDataURL(file)
        })
    };

    const handleResetFileInput = () => {
        if(fileInputRef.current){
            fileInputRef.current.value = '';
        }
    }

    const handleImagePreviewDelete = (image) =>{
        const filteredImagesPreview = imagesPreview.filter(
            img => img !== image
        )

        setImages(filteredImagesPreview);
        setImagesPreview(filteredImagesPreview);
    }

    const submitHandler = (e) =>{
        e.preventDefault()

        uploadProductImages({slug: slug, body: { images }})
    };

    const deleteImage = (imgId) =>{
        deleteProductImage({slug: slug, body: { imgId }})
    }

return (
    <>
    <Metadata title={"Upload Product Images"}/>
    <div className="admin-panel add-product">
    <form 
    encType='multipart/form-data'
    onSubmit={submitHandler}
    >
    <ul className="file-upload-product">
  {uploadedImages?.length > 0 &&
    uploadedImages.map((img) => (
      <li key={img._id}>
        <div className="product-box">
          <div className="img-wrapper px-1">
            <div className="front">
              <img
                src={img?.url}
                className="img-fluid blur-up img-prev lazyload"
                alt=""
                style={{ height: '20rem', width: '20rem', objectFit: 'cover' }}
              />
              {uploadedImages?.length === 1 ? null : (
            <div className="product-hover">
                <button
                type="button"
                className="btn"
                disabled={isLoading || isDeleteLoading}
                onClick={() => deleteImage(img.public_id)}
                >
                <i className="bi bi-trash" title="Delete"></i>
                </button>
            </div>
            )}
            </div>
          </div>
        </div>
      </li>
    ))}

  {/* Upload Input as the last list item */}
  <li>
    <div className="box-input-file">
      <input
        ref={fileInputRef}
        className="upload"
        type="file"
        name="product_images"
        multiple
        onChange={onChange}
        onClick={handleResetFileInput}
      />
      <i className="bi bi-plus" title="Add"></i>
    </div>
  </li>
</ul>
            
            {imagesPreview?.length > 0 && (
    <div className="file-upload-product">
        {/* Separate block for heading */}
        <div className='image-preview'>
            <h5 style={{ display: "block", width: "100%" }}>Images Preview</h5>
        </div>

        {/* Container to ensure images are always displayed below */}
        <ul className="image-list" style={{ display: "block", width: "100%" }}>
            {imagesPreview?.map((img) => (
                <li key={img} className="product-box" style={{ display: "inline-block", marginRight: "10px" }}>
                    <div className="img-wrapper px-1">
                        <div className="front">
                            <img 
                                src={img} 
                                className="img-fluid blur-up img-prev lazyload" 
                                alt="" 
                                style={{ height: "20rem", width: "20rem", display: "block" }} 
                            />
                            <div className="product-hover">
                                <button 
                                    type='button' 
                                    className="btn"
                                    onClick={() => handleImagePreviewDelete(img)}
                                >
                                    <i className="bi bi-x-circle-fill"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>{isLoading?"Uploading":"Upload"}</button>
    </div>
)}

            
            </form>  
        </div>
        </>
  )
}

export default UploadImages;