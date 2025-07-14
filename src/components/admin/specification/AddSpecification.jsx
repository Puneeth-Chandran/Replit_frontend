import React, { useState } from 'react';
import { useGetAdminSpecificationsQuery } from '../../../redux/api/specApi';

const AddSpecification = ({ showModal, closeModal, onSave }) => {
    const { data, isLoading } = useGetAdminSpecificationsQuery();
    const [selectedSpecifications, setSelectedSpecifications] = useState([]);

    const handleSpecificationChange = (specId, value) => {
        // Only update the state if there is a valid value selected (not empty)
        if (value === "") {
            // If the value is empty, remove the specification from the list
            setSelectedSpecifications(prev => prev.filter(spec => spec.specId !== specId));
        } else {
            setSelectedSpecifications(prev => {
                // Create a fresh array reference on every update
                const updatedSpecs = [...prev];
                const specIndex = updatedSpecs.findIndex(spec => spec.specId === specId);
                
                if (specIndex !== -1) {
                    // If spec already exists, update it
                    updatedSpecs[specIndex] = { specId, value };
                } else {
                    // Otherwise, push the new spec
                    updatedSpecs.push({ specId, value });
                }

                return updatedSpecs;
            });
        }
    };

    const handleSave = () => {
        onSave(selectedSpecifications);  // Pass the updated specs to the parent component
        closeModal(); // Close the modal after saving
    };

    return (
        <div className={`modal ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }} tabIndex="-1">
            <div className="modal-dialog" role="document">
                <div className="modal-content px-5 py-3">
                    <div className="modal-header mb-3">
                        <h5 className="modal-title f-w-600">Add Specification</h5>
                        <button className="btn-close" type="button" onClick={closeModal}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="needs-validation">
                            <div className="form">
                                {data?.specifications?.map((spec) => (
                                    <div key={spec._id} className="form-group row">
                                        <label htmlFor={`spec-${spec._id}`} className="col-xl-3 col-sm-4 mb-0">
                                            {spec?.title} :
                                        </label>
                                        <div className="col-xl-8 col-sm-7">
                                            <select
                                                className="form-control digits mb-3"
                                                onChange={(e) => handleSpecificationChange(spec._id, e.target.value)}
                                            >
                                                <option value="">Select a {spec?.title}</option>
                                                {spec?.children?.map((specsChild) => (
                                                    <option key={specsChild._id} value={specsChild._id}>
                                                        {specsChild.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="modal-footer mt-3">
                                <button className="btn btn-primary" type="button" onClick={handleSave}>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSpecification;
