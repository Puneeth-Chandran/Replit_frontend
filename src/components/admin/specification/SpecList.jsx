import React,{useEffect, useState} from 'react';
import { useDeleteSpecificationMutation, useGetAdminSpecificationsQuery } from '../../../redux/api/specApi';
import Loader from '../../layout/Loader';
import { toast } from 'react-hot-toast'
import CreateSpec from './CreateSpec';
import UpdateSpec from './UpdateSpec';

const SpecList = () => {
    const {data, isLoading, error} = useGetAdminSpecificationsQuery()
    const [deleteSpecification, {isLoading: isDeleteLoading, error: deleteError, isSuccess}] = useDeleteSpecificationMutation();

    const [showModal, setShowModal] = useState(false);
    const  [updateModal, setUpdateModal] = useState(false)
    const [specParentId, setSpecParentId] = useState(null);
    const [specIdUpdate, setSpecIdUpdate] = useState(null);

    const openModal = (specId) => {
        setSpecParentId(specId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSpecParentId(null);
    };
    
    const openUpdateModal = (specId) => {
        setSpecIdUpdate(specId);
        setUpdateModal(true);
    };
    
    const closeUpdateModal = () => {
        setUpdateModal(false);
        setSpecIdUpdate(null);
    };

    useEffect(()=>{
        if(error){
            toast.error(error?.data?.message);
        }

        if(deleteError){
            toast.error(deleteError?.data?.message);
        }

        if(isSuccess){
            toast.success('Spec deleted successfully');
        }

    },[error, deleteError, isSuccess]);

    const deleteSpecHandler = (id) =>{
        deleteSpecification(id)
    }

    if(isLoading) return <Loader/>;
    
  return (
    <>
        <div className="container-fluid">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="page-header-left">
                                    <h3>Specifications
                                        <small>Belcab Admin panel</small>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                
                    <div className="row">
                    <div className="card">
                    <div className="card-header">
                                <form className="form-inline search-form search-box">
                                    <div className="form-group">
                                        <input className="form-control-plaintext" type="search" placeholder="Search.." />
                                    </div>
                                </form>
                                <div className='add-category' style={{paddingLeft: "55%"}}>
                                <button type="button" className="btn btn-primary add-row mt-md-0 mt-2" onClick={() => setShowModal(true)}>
                                Add Specification</button>
                                </div>
                            </div>
                            </div>
                    {data?.specifications?.map((spec)=>(
                        <div className="col-sm-6" key={spec._id}>
                            <div className="card">
                                <div className="card-header">
                                    <div>
                                        <h5>{spec?.title}</h5>
                                    </div>

                                    
                                    <button style={{ background:"none"}} onClick={() => openModal(spec?._id)}>
                                    <i className="bi bi-plus" title="Add"></i> Add Spec </button>
                                        <button style={{ background:"none"}} onClick={() => openUpdateModal(spec?._id)}>
                                        <i className="bi bi-pencil-square" title="Edit"></i></button>
                                    <button style={{ background:"none"}} onClick={() => deleteSpecHandler(spec?._id)} disabled={isDeleteLoading}>
                                    <i className="bi bi-trash" title="Delete"></i></button>
                                        
                                </div>

                                <div className="card-body">
                                    <div className="table-responsive table-desi">
                                        <table className="table all-package table-category" id="editableTable">
                                            <thead>
                                                <tr>
                                                    <th>Index</th>
                                                    <th>Name</th>
                                                    <th>Action</th>
                                                    </tr>
                                            </thead>

                                            <tbody>
                                                
                                                {spec?.children?.map((specsChild, index)=>(
                                                    <tr key={specsChild.slug}>
                                                    <td data-field="id">{index+1}</td>
                                                    <td data-field="name">{specsChild?.title}</td>
                                                    <td>
                                                    <button style={{border:"none", background:"none"}} onClick={() => openUpdateModal(specsChild?._id)}>
                                                    <i className="bi bi-pencil-square" title="Edit"></i>
                                                        </button>
                                                        &nbsp; &nbsp;
                                                        <button style={{border:"none", background:"none"}} onClick={() => deleteSpecHandler(specsChild?._id)} disabled={isDeleteLoading}>
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
                    ))}
                    </div>
                    <CreateSpec showModal={showModal} closeModal={closeModal} parentId={specParentId} />
                    <UpdateSpec showModal={updateModal} closeModal={closeUpdateModal} id={specIdUpdate}/>
                </div>
    </>
  )
}

export default SpecList;