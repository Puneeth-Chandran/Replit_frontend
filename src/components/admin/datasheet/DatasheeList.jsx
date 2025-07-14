import React, {useEffect, useState} from 'react';
import Metadata from '../../layout/Metadata';
import AddDatasheet from './AddDatasheet';
import { useDeleteDatasheetMutation, useGetAdminDatasheetsQuery } from '../../../redux/api/datasheetApi';
import Loader from '../../layout/Loader';
import { toast } from 'react-hot-toast'

const DatasheeList = () => {

 const {data, isLoading} = useGetAdminDatasheetsQuery()
 const [deleteDatasheet, { isLoading: isDeleteLoading, isError: isDeleteError, isSuccess:deleteSuccess }] = useDeleteDatasheetMutation();

 const [showModal, setShowModal] = useState(false);

    const closeModal = () => setShowModal(false);

    const deleteDatasheetHandler = (id) =>{
        deleteDatasheet(id)
    };

    useEffect(()=>{
        if(deleteSuccess){
            toast.success("Datasheet deleted successfully!!!")
        }

        if(isDeleteError){
            toast.error(isDeleteError?.data?.message);
        }
    }, [isDeleteError, deleteSuccess])

    if (isLoading) return <Loader />;


  return (
    <>
            <Metadata title={"Category List"} />
            <div className="container-fluid">
                <div className="page-header">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="page-header-left">
                                <h3>Datasheets
                                    <small>Belcab Admin panel</small>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Container-fluid Ends--> */}

            {/* <!-- Container-fluid starts--> */}
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
                                 Add Datasheet</button>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="table-responsive table-desi">
                                    <table className="table all-package table-category " id="editableTable">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Title</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {data?.datasheets?.map((datasheet) => (
                                                <tr key={datasheet?._id}>
                                                    <td data-field="id">{datasheet?.index}</td>

                                                    <td data-field="name">{datasheet?.title}</td>

                                                    <td>
                                                        <button style={{border:"none", background:"none"}} onClick={() => deleteDatasheetHandler(datasheet?._id)} disabled={isDeleteLoading}>
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

                <AddDatasheet showModal={showModal} closeModal={closeModal} />

            </div>
            {/* <!-- Container-fluid Ends--> */}
        </>
  )
}

export default DatasheeList