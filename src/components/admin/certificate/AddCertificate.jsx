import React, {useRef, useEffect, useState} from 'react';
import { useCreateCertificateMutation } from '../../../redux/api/certificateApi';
import { toast } from 'react-hot-toast';

const AddCertificate = ({ showModal, closeModal }) => {

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [certificateImage, setCertificateImage] = useState('');
    const [description, setDescription] = useState('');
    const [certificateFile, setCertificateFile] = useState('');
    const [url, setUrl] = useState('');

    const fileInputRef = useRef(null);

    const [createCertificate, {isSuccess, error, isLoading}] = useCreateCertificateMutation();            

    const handleResetFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const resetForm = () => {
        setName('')
        setTitle('');
        setCertificateImage('');
        setDescription('');
        setCertificateFile('');
        setUrl('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    useEffect(() => {
            if (isSuccess) {
                toast.success('Category created successfully');
                resetForm();
                closeModal();
            }; 
    
            if (error) {
                toast.error(error?.data?.message || 'Something went wrong, please try again later');
            }
        }, [isSuccess, error])

    const handleFileChange = (e) => {
        setCertificateImage(e.target.files[0]);
    };

    const submitHandler = (e) => {
        e.preventDefault();
    
        if (!name && !title && !description && !certificateImage) {
            toast.error("Please fill all fields.");
            return;
        }
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('certificateImage', certificateImage);
        if (certificateFile) {
            formData.append('certificateFile', certificateFile);
        } 
        if (url) {
            formData.append('url', url);
        }
        
        createCertificate(formData);
    };

  return (
    <div className={`modal ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }} tabIndex="-1">
            <div className="modal-dialog" role="document">
                <div className="modal-content px-5 py-3">
                    <div className="modal-header">
                        <h5 className="modal-title f-w-600" id="exampleModalLabel">Update Certificate</h5>
                        <button className="btn-close" type="button" aria-label="Close" onClick={closeModal}><span
                            aria-hidden="true">&times;</span></button>
                    </div>
                    <div className="modal-body">
                        <form className="needs-validation" onSubmit={submitHandler} encType="multipart/form-data">
                            <div className="form">

                            <div className="form-group mb-0">
                                        <label htmlFor="validationCustom02" className="mb-1">
                                            Cerificate Image :</label>
                                        <input ref={fileInputRef} className="form-control" name='certificateImage' type="file" onChange={handleFileChange} onClick={handleResetFileInput} required />
                            </div>

                            <div className="form-group">
                                    <label htmlFor="validationCustom01" className="mb-1">
                                        Cerificate Name :</label>
                                    <input className="form-control" id="validationCustom01" type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>

                            <div className="form-group">
                                    <label htmlFor="validationCustom01" className="mb-1">
                                        Cerificate Heading :</label>
                                    <input className="form-control" id="validationCustom01" type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>

                            <div className="form-group">
                                    <label htmlFor="validationCustom01" className="mb-1">
                                        Cerificate Description :</label>
                                        <textarea name="description" cols="70" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                            </div>

                            <div className="form-group mb-0">
                                    <label htmlFor="certificateFile" className="mb-1">
                                        Verification File:
                                    </label>
                                    <input
                                        className="form-control"
                                        name="certificateFile"
                                        type="file"
                                        onChange={(e) => setCertificateFile(e.target.files[0])}
                                    />
                                </div>

                            <div className="form-group mt-1">
                                    <label htmlFor="validationCustom01" className="mb-1">
                                        Verification URL :</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="url"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                        />
                            </div>

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

export default AddCertificate;