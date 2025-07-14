import React, {useState, useEffect} from 'react';
import { useUpdateCertificateMutation, useGetCertificateDetailsQuery, useDeleteCertificateFileMutation } from '../../../redux/api/certificateApi';
import Loader from '../../layout/Loader';
import { toast } from 'react-hot-toast';
import UpdateCertificateImage from './UpdateCertificateImage';

const UpdateCertificate = ({ showModal, closeModal, id }) => {

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [certificateFile, setCertificateFile] = useState('');
    const [url, setUrl] = useState('');
    
    const [deleteCertificateFile, { isLoading: deleteLoading, error: deleteError, isSuccess: deleteSuccess}] = useDeleteCertificateFileMutation();
    const [updateCertificate, { isLoading, error, isSuccess: updationSuccessfull }] = useUpdateCertificateMutation();
    const { data, isLoading: isFetching, refetch, error:detailsError } = useGetCertificateDetailsQuery(id);

    const close = () => {
        closeModal();
        setTitle("");
        setName("");
        setDescription("");
        setUrl("");
        setCertificateFile("");
    }; 
    
    useEffect(() => {
        if (data?.certification) {
            setName(data.certification.name || "");
            setTitle(data.certification.title || "");
            setDescription(data.certification.description || "");
            setUrl(data.certification.url || "");
            setCertificateFile(data.certification.certificateFile || "");
        }
    }, [data]);

        useEffect(() => {
            if (error) {
                toast.error(error?.data?.message || 'Something went wrong, please try again later');
            }

            if(showModal){
            if(detailsError){
                toast.error(detailsError?.data?.message || 'Something went wrong, failed to fetch certificate details');
            }}

        }, [error, detailsError, showModal]);

        const deleteCertificateHandler = async (id) => {
            try {
                await deleteCertificateFile(id).unwrap();
                toast.success("Verification file deleted successfully");
                setCertificateFile("");
                refetch();
            } catch (error) {
                toast.error("Failed to delete certificate file");
            }
        };

        const submitHandler = async (e) => {
            e.preventDefault();
          
            const formData = new FormData();
            formData.append('name', name);
            formData.append('title', title);
            formData.append('description', description);
          
            if (certificateFile && typeof certificateFile !== "string") {
              formData.append('certificateFile', certificateFile);
            }

            formData.append('url', typeof url === "string" ? url : String(url || ""));

            try {
              await updateCertificate({ id, body: formData }).unwrap();
              toast.success("Certificate updated successfully");
              close();
            } catch (err) {
              toast.error(err?.data?.message || "Failed to update certificate");
            }
          };

    if (isFetching) return <Loader />;

  return (
    <div className={`modal ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }} tabIndex="-1">
            <div className="modal-dialog" role="document">
                <div className="modal-content px-5">
                <div className='d-flex justify-content-end'>
                <button className="btn-close p-4" type="button" aria-label="Close" onClick={close}><span
                          className='fs-1'  aria-hidden="true">&times;</span></button>
                          </div>
                    <div className="modal-header">
                        <h5 className="modal-title f-w-600" id="exampleModalLabel">Update Certificate</h5>
                    </div>
                    {isFetching ? (
                        <div className="modal-body mt-3">
                            <Loader />
                        </div>
                    ) : (
                        <div className="modal-body mt-3">

                                <UpdateCertificateImage id={id} closeModal={closeModal}/>

                            <form className="needs-validation" onSubmit={submitHandler} encType="multipart/form-data">
                                <div className="form">

                                <div className="form-group">
                                        <label htmlFor="validationCustom01" className="mb-1">
                                            Certificate Name :</label>
                                        <input className="form-control" id="validationCustom01" type="text" name='name' value={name} onChange={(e)=>setName(e.target.value)} required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="validationCustom01" className="mb-1">
                                            Certificate Heading :</label>
                                        <input className="form-control" id="validationCustom01" type="text" name='title' value={title} onChange={(e)=>setTitle(e.target.value)} required />
                                    </div>

                                    <div className="form-group">
                                    <label htmlFor="validationCustom01" className="mb-1">
                                        Certificate Description :</label>
                                        <textarea name="description" cols="70" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                             </div>
                             {certificateFile ? (
  <div>
    <div className="d-flex justify-content-between align-items-center mb-2">
      <span>Verification File:</span>

      {typeof certificateFile === 'string' ? (
        // Existing file from DB — show delete button
        <button
          onClick={() => deleteCertificateHandler(id)}
          className="btn btn-sm btn-outline-danger"
          disabled={deleteLoading}
        >
          Delete
        </button>
      ) : (
        // Newly selected local file — show clear button
        <button
          type="button"
          className="btn btn-sm btn-outline-danger"
          onClick={() => {
            setCertificateFile('');
            if (window.fileInputRef) window.fileInputRef.value = '';
          }}
        >
          Clear
        </button>
      )}
    </div>

    <iframe
      src={typeof certificateFile === 'string' ? certificateFile : URL.createObjectURL(certificateFile)}
      title="PDF Preview"
      width="100%"
      height="400px"
      style={{ border: '1px solid #ccc', borderRadius: '4px' }}
    />
  </div>
) : (
  <div className="form-group mb-0">
    <label htmlFor="certificateFile" className="mb-1">Verification File:</label>
    <div className="d-flex gap-3">
      <input
        className="form-control"
        name="certificateFile"
        type="file"
        onChange={(e) => setCertificateFile(e.target.files[0])}
        ref={(ref) => (window.fileInputRef = ref)}
      />
    </div>
  </div>
)}
                                <div className="form-group mt-1">
                                    <label htmlFor="validationCustom01" className="mb-1">
                                        Verification URL:</label>
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
                                    <button className="btn btn-primary" type="submit" disabled={isLoading}>{isLoading ? "Updating..." : "Update"}</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
  )
};

export default UpdateCertificate;