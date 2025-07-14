import React from 'react'
import { useGetProductsQuery } from '../../redux/api/productsApi';
import ProductItem from '../product/ProductItem';
import { Link } from 'react-router-dom';

const TopSelling = () => {
    const {data} = useGetProductsQuery();
  return (
            <>
                <div className="heading heading-center mb-3">
                    <h2 className="title-lg">Top Selling Products</h2>
                    {/* <!-- End .title-lg text-center --> */}
    
                    <ul className="nav nav-pills justify-content-center mb-4" role="tablist">
                    <li className="nav-item mt-2" >
                            <a className="nav-link active" id="top-all-link" data-toggle="tab" href="#top-all-tab" role="tab" aria-controls="top-all-tab" aria-selected="true">Cables</a>
                        </li>
                        <li className="nav-item mt-2" >
                            <a className="nav-link" id="top-all-link" data-toggle="tab" href="#top-all-tab" role="tab" aria-controls="top-all-tab" aria-selected="true">Fibers</a>
                        </li>
                    {/* {data?.products?.map((cat)=>(
                        <li className="nav-item mt-2" >
                            <a className="nav-link active" id="top-all-link" data-toggle="tab" href="#top-all-tab" role="tab" aria-controls="top-all-tab" aria-selected="true">{cat?.category}</a>
                        </li>
                    ))} */}
                     </ul>
                </div>
                {/* <!-- End .heading --> */}
    
                <div className="tab-content">
                    <div className="tab-pane p-0 fade show active" id="top-all-tab" role="tabpanel" aria-labelledby="top-all-link">
                        <div className="products just-action-icons-sm">
                            <div className="row">
                            {data?.products?.map((product)=>(
                                <div className="col-6 col-md-4 col-lg-3 col-xl-5col" key={product?.slug}>
                                <ProductItem product={product}/>
                                </div>
                            ))}
                                </div>
                            {/* <!-- End .row --> */}
                        </div>
                        {/* <!-- End .products --> */}
                    </div>
                    {/* <!-- .End .tab-pane --> */}
    
    
                </div>
                {/* <!-- End .tab-content --> */}
    
                <div className="more-container text-center mt-5">
                    <Link to="/products" className="btn btn-outline-lightgray btn-more btn-round"><span>View more products</span><i className="bi bi-arrow-right"></i></Link>
                </div>
                </>     
    
        )
    }
  
export default TopSelling;