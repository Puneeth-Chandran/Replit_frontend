import React, { useEffect, useState } from 'react';
import { useCreateSpecificationMutation } from '../../../redux/api/specApi';
import { toast } from 'react-hot-toast';

const CreateSpec = ({ showModal, closeModal, parentId }) => {
    const [title, setTitle] = useState("");
    const [specParentId, setSpecParentId] = useState('');
    const [createSpecification, { isLoading, error, isSuccess }] = useCreateSpecificationMutation();

    useEffect(() => {
        if (isSuccess) {
            setTitle("");
            closeModal();
            setSpecParentId(''); 
            toast.success("Specification created successfully!!!")
        }

        if (error) {
            toast.error(error?.data?.message || 'Something went wrong, please try again later');
        }
    }, [isSuccess, error]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error('Title field must be filled.');
            return;
        }
        createSpecification({ title, parentId }); // Send JSON, not FormData
        
    };

    return (
        <div className={`modal ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }} tabIndex="-1">
            <div className="modal-dialog" role="document">
                <div className="modal-content px-5 py-3">
                    <div className="modal-header">
                        <h5 className="modal-title f-w-600">Create Specification</h5>
                        <button className="btn-close" type="button" aria-label="Close" onClick={closeModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="needs-validation" onSubmit={submitHandler}>
                            <div className="form">
                                <div className="form-group">
                                    <label htmlFor="validationCustom01" className="mb-1">
                                        Specification Title:
                                    </label>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        name="title" 
                                        value={title} 
                                        onChange={(e) => setTitle(e.target.value)} 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="modal-footer mt-3">
                                <button className="btn btn-primary" type="submit" disabled={isLoading}>
                                    {isLoading ? "Creating..." : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateSpec;
