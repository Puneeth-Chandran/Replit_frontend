import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DatasheetSearch = () => {

    const [keyword,setKeyword] = useState("");
        const navigate = useNavigate();
    
        const submitHandler = (e) =>{
            e.preventDefault();
    
            if(keyword?.trim()){
                navigate(`/technical-library?keyword=${keyword}`);
            }else{
                navigate('/technical-library?tab=datasheets');
            }
        };

  return (
    <div className="cta cta-horizontal cta-horizontal-box bg-image mb-5">
	                   	<div className="row align-items-center">
	                    	<div className="col-lg-4 col-xl-3 offset-xl-1">
	                    		<h3 className="cta-title">Seach here if you are looking for a specific product's datasheet.</h3>
	                    		<p className="cta-desc"></p>
	                    	</div>
							
							<div className="col-lg-8 col-xl-7">
								<form onSubmit={submitHandler}>
		                    		<div className="input-group">
										<input type="search" className="form-control" placeholder="Enter the product's name" aria-label="Search" value={keyword} onChange={(e)=>setKeyword(e.target.value)} required/>
										<div className="input-group-append">
											<button className="btn btn-primary btn-rounded" type="submit"><span>Search</span><i className="bi bi-search"></i></button>
										</div>
									</div>
		                    	</form>
	                    	</div>
                    	</div>
                    </div>
  )
}

export default DatasheetSearch;