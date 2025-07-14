import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import ScrollToTop from './ScrollToTop';

const CustomPagination = ({ resPerFilter, filteredProductsCount }) => {

    const [currentPage, setCurrentPage] = useState();

    let [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const page = Number(searchParams.get('page')) || 1;

    useEffect(() =>{
        setCurrentPage(page);
    },[page]);

    const setCurrentPageNo = (pageNumber) =>{
        setCurrentPage(pageNumber)

        if(searchParams.has("page")){
            searchParams.set("page", pageNumber);
        }else{
            searchParams.append("page",pageNumber);
        }

        const path = window.location.pathname + "?" + searchParams.toString()
        navigate(path);

        window.scrollTo(0, 0);
    };
    
    const lastPage = Math.ceil(filteredProductsCount / resPerFilter);

  return (
    <div className='d-flex justify-content-center my-5'>
        {filteredProductsCount > resPerFilter && (
            <Pagination 
           activePage={currentPage}
          itemsCountPerPage={resPerFilter}
          totalItemsCount={filteredProductsCount}
          onChange={setCurrentPageNo}
          nextPageText={"Next"}
          prevPageText={"Prev"}
          firstPageText={"First"}
          lastPageText={"Last"}
          itemClass="page-item"
          linkClass="page-link"
          />
        )}
    </div>
  )
}

export default CustomPagination;