import React, { useEffect, useState } from "react";
import { useGetSpecificationDetailsQuery, useUpdateSpecificationMutation } from "../../../redux/api/specApi"; // Ensure correct query is used
import { toast } from "react-hot-toast";

const UpdateSpec = ({ showModal, closeModal, id }) => {
  const [title, setTitle] = useState("");

    const { data, isLoading: isFetching, error: fetchingError } = useGetSpecificationDetailsQuery(id, { skip: !id || !showModal });
    const [updateSpecification, { isLoading, error, isSuccess, reset }] = useUpdateSpecificationMutation();


    useEffect(() => {
      if (data?.specification?.title) {
          setTitle(data.specification.title);
      }
  
      if (isSuccess) {
          setTitle("");
          closeModal();
          toast.success("Specification updated successfully!!!");
          reset();
      }
  
      if (error) {
          toast.error(error?.data?.message || "Something went wrong, please try again later");
      }
  
      if (showModal && fetchingError) {
          toast.error(fetchingError?.data?.message || "Failed to fetch specification.");
      }
  }, [data, isSuccess, error, fetchingError, showModal, reset]);
  
  useEffect(() => {
      if (!showModal) {
          setTitle(""); // Ensures title resets only when modal is closed
      }
  }, [showModal]);
  
  

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title field must be filled.");
      return;
    }
    
    updateSpecification({ id, title }); // Ensure correct API format
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }} tabIndex="-1">
      <div className="modal-dialog" role="document">
        <div className="modal-content px-5 py-3">
          <div className="modal-header">
            <h5 className="modal-title f-w-600">Update Specification</h5>
            <button className="btn-close" type="button" aria-label="Close" onClick={closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {isFetching ? (
              <p>Loading...</p>
            ) : (
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
                    {isLoading ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSpec;
