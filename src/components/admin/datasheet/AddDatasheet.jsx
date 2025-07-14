import React, {useState, useRef, useEffect} from 'react';
import { toast } from 'react-hot-toast';
import { useUploadDatasheetMutation } from '../../../redux/api/datasheetApi';

const AddDatasheet = ({showModal, closeModal}) => {

    const [title, setTitle] = useState("");
    const [datasheet, setDatasheet] = useState('');

    const fileInputRef = useRef(null);

    const [uploadDatasheet, {isLoading, error, isSuccess}] = useUploadDatasheetMutation();

    const handleResetFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleFileChange = (e) => {
        setDatasheet(e.target.files[0]);
    };

    useEffect(() =>{
        if (isSuccess) {
            toast.success('Datasheet uploaded successfully!!!');
            setTitle("");
            setDatasheet("");
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
        
        if(error){
            toast.error(error?.data?.message || 'Something went wrong, please try again later');
        }
    }, [isSuccess, error])

    const submitHandler = async (e) => {
        e.preventDefault();
    
        if (!title || !datasheet) {
            toast.error('All required fields must be filled.');
            return;
        }
    
        const formData = new FormData();
        formData.append("title", title);
        formData.append("datasheet", datasheet);
    
        uploadDatasheet(formData);
        closeModal();
    };
    

    return (
        <div className={`modal ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }} tabIndex="-1">
            <div className="modal-dialog" role="document">
                <div className="modal-content px-5 py-3">
                    <div className="modal-header">
                        <h5 className="modal-title f-w-600">Upload Datasheet</h5>
                        <button className="btn-close" type="button" aria-label="Close" onClick={closeModal}><span
                            aria-hidden="true">&times;</span></button>
                    </div>
                    <div className="modal-body">
                        <form className="needs-validation" onSubmit={submitHandler} encType="multipart/form-data">
                            <div className="form">
                                <div className="form-group">
                                    <label htmlFor="validationCustom01" className="mb-1">
                                        Datasheet Title :</label>
                                    <input className="form-control" type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)} required />
                                </div>
                                <div className="form-group mb-0">
                                    <label htmlFor="validationCustom02" className="mb-1">
                                        Datasheet File :</label>
                                    <input className="form-control" name='datasheet' type="file" onChange={handleFileChange} onClick={handleResetFileInput} required />
                                </div>

                            </div>
                            <div className="modal-footer mt-3">
                                <button className="btn btn-primary" type="submit" disabled={isLoading}>{isLoading?"Uploading":"Upload"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDatasheet