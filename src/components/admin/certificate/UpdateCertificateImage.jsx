import React, {useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateCertificateImageMutation, useGetCertificateDetailsQuery } from '../../../redux/api/certificateApi';
import { toast } from 'react-hot-toast';
import Metadata from '../../layout/Metadata';

const UpdateCertificateImage = ({id}) => {

  const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const [images, setImages] =useState('');
    const [imagesPreview, setImagesPreview] = useState('');
    const [localSuccess, setLocalSuccess] = useState(false);

    const [updateCertificateImage, {isLoading, error, isSuccess}] = useUpdateCertificateImageMutation();

    const { data, isLoading: isFetching } = useGetCertificateDetailsQuery(id);

    const [uploadedImages, setUploadedImages] = useState('');
    
    useEffect(()=>{
        if (data?.certification) {
            setUploadedImages(data.certification.certificateImage);
        }

        if(error){
            toast.error(error?.data?.message||"Something went wrong, please try again later");
            
        }

        if(isSuccess){
            setImagesPreview('');
            setLocalSuccess(true);

            setTimeout(() => setLocalSuccess(false), 1000);
        }

    },[data, isSuccess, error, navigate]);

    useEffect(() => {
        if (localSuccess) {
            toast.success('Images updated successfully');
        }
    }, [localSuccess]);

    const onChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
            const reader = new FileReader();
    
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(reader.result);
                    setImages(file);
                }
            };
    
            reader.readAsDataURL(file);
        }
    };

    const handleResetFileInput = () => {
        if(fileInputRef.current){
            fileInputRef.current.value = '';
        }
    }

    const handleImagePreviewDelete = () => {
        setImages('');
        setImagesPreview('');
    };

    const submitHandler = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("certificateImage", images); 
    
        try {
            await updateCertificateImage({ id, body: formData }).unwrap();
          } catch (err) {
            toast.error("Failed to update certificate image");
          }
    };

  return (
    <>
    <Metadata title={"Update Certificate Images"}/>
    <div className="admin-panel add-product">
    <form 
    encType='multipart/form-data'
    onSubmit={submitHandler}
    >
    <ul className="file-upload-product">
        <li>
                    <div className="product-box">
                        <div className="img-wrapper">
                            <div className="front">
                            {isFetching || !uploadedImages ? (
                                        <p>Loading...</p> // or use a placeholder image
                                    ) : (
                                <img src={uploadedImages} className="img-fluid blur-up img-prev lazyload p-2" alt="Certificate" style={{height:"20rem", width:"20rem"}}/>
                                )}
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="box-input-file">
                        <input
                        ref={fileInputRef}
                        className="upload"
                        type="file"
                        name="certificateImage"
                        onChange={onChange}
                        onClick={handleResetFileInput}
                        />
                            <i className="bi bi-plus" title="Add"></i>
                            </div>
                </li>
            </ul>
            
            {imagesPreview?.length> 0 && ( 
        <div className='image-preview'>
            <ul className="file-upload-product">
            <h5 style={{ display: "block", width: "100%" }}>Images Preview</h5>
                <li>
                
                    <div className="product-box">
                        <div className="img-wrapper">
                            <div className="front">
                                <img src={imagesPreview} className="img-fluid blur-up img-prev lazyload p-2" alt="Certificate Image" style={{height:"20rem", width:"20rem"}}/>
                                <div className="product-hover">
                                        <div>
                                        <button 
                                            type='button' 
                                            className="btn"
                                            onClick={handleImagePreviewDelete}
                                            >
                                            <i className="bi bi-x-circle-fill"></i></button>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <button type="submit" className="btn btn-primary mb-2" disabled={isLoading}>{isLoading?"Uploading":"Upload"}</button>
            </div>
            )}
            </form>  
        </div>
        </>
  )
}

export default UpdateCertificateImage;