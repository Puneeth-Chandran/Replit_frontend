import React from 'react'
import { Link } from 'react-router-dom';

const ProductItem = ({product}) => {
    
  return (
     
    <div className="product product-3">
    <Link to={`/products/${product?.slug}`}>
        <figure className="product-media">
                <img src={product?.images[0] ? product?.images[0]?.url : '/assets/images/banners/belcab/cables/01-500x500.jpg'} alt={product?.imagealt} 
        style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transform: 'scale(1.13)',
        transformOrigin: 'center center'
      }} 
      className="product-image mt-2" />
        </figure>
        {/* <!-- End .product-media --> */}
    </Link>
    <div className="product-body">
                                            <div className="product-cat text-center">
                                                <Link to={`/products?category=${product?.category?.slug}`}>{product?.category?.name}</Link>
                                            </div>
                                            {/* <!-- End .product-cat --> */}
                                            <div className="product-price">
                                            <Link to={`/products/${product?.slug}`} className='text-center fs-3'>{product?.name}</Link>
                                            </div>
                                            <h3 className="product-title">{product?.shortdescription}</h3>
                                            {/* <!-- End .product-title --> */}
                                            
                                            {/* <!-- End .product-price --> */}
                                        </div>
                                        {/* <!-- End .product-body --> */}
        {/* <!-- End .product-body --> */}

        {/* <div className="product-footer">
            <div className="product-action">
                <a href="#" className="btn-product btn-compare" title="Compare"><span>compare</span></a>
                <a href="#" className="btn-product btn-quickview" title="Quick view"><span>quick view</span></a>
            </div>
            
        </div> */}
        {/* <!-- End .product-footer --> */}
    </div>
    
// {/* <!-- End .col-6 col-md-4 col-lg-3 --> */}
  );
};

export default ProductItem