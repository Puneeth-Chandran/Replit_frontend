import React,{useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Metadata from '../layout/Metadata';

const Dashboard = () => {
    const [startDate, setStartDate] = useState(new Date().setDate(1));
    const [endDate, setEndDate] = useState(new Date());
  return (
    <>
    <Metadata title={"Admin Dashboard"}/>
    <div className="container-fluid">
    <div className="page-header" style={{backgroundColor:"#fff"}}>
        <div className="row">
            <div className="col-lg-5">
                <div className="page-header-left">
                    <h3>Dashboard
                        <small>Belcab Admin panel</small>
                    </h3>
                </div>
            </div>
            <div className='col-lg-7 mt-5'>
            <div className='row'>
            <div className="col-lg-4">
            <div className=" me-4">
<label className="form-label d-block">Start Date</label>
<DatePicker
selected={startDate}
onChange={(date) => setStartDate(date)}
selectsStart
startDate={startDate}
endDate={endDate}
className='form-control custom-month'
/>
</div>
            </div>
            <div className="col-lg-4">
            
<label className="form-label d-block">End Date</label>
<DatePicker
selected={endDate}
onChange={(date) => setEndDate(date)}
selectsEnd
startDate={startDate}
endDate={endDate}
minDate={startDate}
className='form-control'
/>
            </div>
            <div className="col-lg-3">
            <button className="btn fetch-btn ms-3 mt-1 px-1" >Fetch</button>
            </div>
            </div>
            </div>
        </div>
    </div>
</div>
{/* <!-- Container-fluid Ends--> */}
</>
  )
}

export default Dashboard;