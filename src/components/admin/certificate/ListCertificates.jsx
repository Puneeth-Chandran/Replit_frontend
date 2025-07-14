import React, {useEffect, useState} from 'react'
import { useDeleteCertificateMutation, useGetAdminCertificateQuery } from '../../../redux/api/certificateApi';
import Metadata from '../../layout/Metadata';
import Loader from '../../layout/Loader';
import toast from 'react-hot-toast';
import AddCertificate from './AddCertificate';
import UpdateCertificate from './UpdateCertificate';

const ListCertificates = () => {

    const {data, error, isLoading} = useGetAdminCertificateQuery();
    const [deleteCertificate, { isLoading: isDeleteLoading, isError: isDeleteError, isSuccess: deleteSuccess, error: deleteError }] = useDeleteCertificateMutation();

    const [showModal, setShowModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [certId, setCertId] = useState('');

    const closeModal = () => setShowModal(false);
    const closeUpdate = () => setUpdateModal(false);

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || 'Failed to fetch certificates');
        }

        if(isDeleteError){
            toast.error(deleteError?.data?.message || 'Failed to delete certificate');
        }
        
        if(deleteSuccess){
            toast.success('Certificate deleted successfully');
        }

    },[deleteSuccess, error, isDeleteError, deleteError]);

    const deleteCertificateHandler = async (id) => {
        try {
            await deleteCertificate(id).unwrap();
        } catch (err) {
            toast.error(err?.data?.message || 'Error deleting certificate');
        }
    };

    if(isLoading) return <Loader/>;

  return (
    <>
            <Metadata title={"Certificate List"} />
            <div className="container-fluid">
                <div className="page-header">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="page-header-left">
                                <h3>Cerificates
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
                        <div className="card">
                            <div className="card-header">
                                <form className="form-inline search-form search-box">
                                    <div className="form-group">
                                        <input className="form-control-plaintext" type="search" placeholder="Search.." />
                                    </div>
                                </form>
                                <div className='add-category' style={{paddingLeft: "55%"}}>
                                <button  type="button" className="btn btn-primary add-row mt-md-0 mt-2" onClick={() => setShowModal(true)}>
                                 Add Certificate</button>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="table-responsive table-desi">
                                    <table className="table all-package table-category " id="editableTable">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Image</th>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {data?.certificates?.map((cert, index) => (
                                                <tr key={cert?._id}>
                                                    <td data-field="id">{index + 1}</td>

                                                    <td>
                                                        <img src={cert?.certificateImage}
                                                            data-field="image" alt={cert?.title || 'Certificate Image'}/>
                                                    </td>

                                                    <td data-field="name">{cert?.name}</td>

                                                    <td data-field="descripton">{cert?.description}</td>

                                                    <td>
                                                    <button style={{border:"none", background:"none"}} onClick={(e) => {setUpdateModal(true); setCertId(cert?._id);}}>
                                                    <i className="bi bi-pencil-square" title="Edit"></i>
                                                        </button>
                                                        &nbsp; &nbsp;
                                                        <button style={{border:"none", background:"none"}} onClick={() => deleteCertificateHandler(cert?._id)} disabled={isDeleteLoading}>
                                                        <i className="bi bi-trash" title="Delete"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <AddCertificate showModal={showModal} closeModal={closeModal}/>
                <UpdateCertificate showModal={updateModal} closeModal={closeUpdate} id={certId}/>

            </div>
            {/* <!-- Container-fluid Ends--> */}
        </>
  )
}

export default ListCertificates;