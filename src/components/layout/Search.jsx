import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {

    const [keyword,setKeyword] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) =>{
        e.preventDefault();

        if(keyword?.trim()){
            navigate(`/products?keyword=${keyword}`);
        }else{
            navigate('/products');
        }
    };
    
  return (
    <>
    <a href="#" className="search-toggle" role="button"><i className="bi bi-search" style={{color:"#fff"}}></i></a>
                    <form onSubmit={submitHandler}>
                        <div className="header-search-wrapper">
                            <label htmlFor="q" className="sr-only">Search</label>
                            <input type="search" className="form-control" name="q" id="q" placeholder="Search in..." value={keyword} onChange={(e)=>setKeyword(e.target.value)}  required/>
                        </div>
                        
                    </form>
                    </>
  )
}

export default Search;