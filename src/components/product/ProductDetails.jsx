import React, { useEffect, useState, useRef } from 'react';
import { useGetProductDetailsQuery, useGetAllProductsQuery } from '../../redux/api/productsApi';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../layout/Loader';
import NewReview from '../review/NewReview';
import ListReviews from '../review/ListReviews';
import NotFound from '../layout/NotFound';
import Metadata from '../layout/Metadata';
import QuotationModal from './QuotationModal';

const ProductDetails = () => {

    const params = useParams();
    const { data, isLoading, isError, error } = useGetProductDetailsQuery(params?.slug);
    const { data: variantsData ,isLoading: variantsLoading, error: variantsError, isError: variansIsError } = useGetAllProductsQuery();
    const product = data?.product;
    
    // const variants = variantsData?.products?.filter(
    //     (variant) => variant.isVariant && variant.parentProductId === product?._id
    //   ) || [];
    
    const [activeProduct, setActiveProduct] = useState(product);
    const [activeImg, setActiveImg] = useState(product?.images?.[0]?.url);
    const [variants, setVariants] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showQuotation, setShowQuotation] = useState(false);

    const closeModal = () => setShowModal(false);
    const closeQuotation = () => setShowQuotation(false);

  const modalRef = useRef(null);

  useEffect(() => {
    if ((showModal || showQuotation) && modalRef.current) {
      setTimeout(() => {
        modalRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [showModal, showQuotation]);

    useEffect(() => {
        if (data?.product) {
            setActiveProduct(data.product);
            setActiveImg(data.product.images?.[0]?.url || '/assets/images/banners/belcab/cables/01-500x500.jpg');
        }
    }, [data?.product]);
    
    useEffect(() => {
        if (variantsData?.products && data?.product?._id) {
            const filteredVariants = variantsData.products.filter(
                (variant) => variant.isVariant && variant.parentProductId === data.product._id
            );
            setVariants(filteredVariants);
        }
    }, [variantsData, data?.product]);

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message);
        }
    }, [isError, error]);

    if (isLoading) return <Loader />;

    if (error && error?.status === 404) {
        return <NotFound />
    }
      
    console.log(activeProduct);
    
    

    // const scrollContainer = useRef(null);

  // Scroll Left
//   const scrollLeft = () => {
//     if (scrollContainer.current) {
//       scrollContainer.current.scrollBy({ left: -250, behavior: "smooth" });
//     }
//   };

//   // Scroll Right
//   const scrollRight = () => {
//     if (scrollContainer.current) {
//       scrollContainer.current.scrollBy({ left: 250, behavior: "smooth" });
//     }
//   };

    return (

        <div className="page-content">
            <Metadata title={product?.seo_title} />
            <div className="container">
                <div className="product-details-top">

                    <h1 className="product-title mt-2" style={{ fontSize: "25px" }}>{activeProduct?.name}</h1>
                    {/* <!-- End .product-title --> */}


                    <div className="product-cat mb-3">
                        <span>Category:</span>
                        {product?.category?.name}
                    </div>
                    {/* <!-- End .product-cat --> */}

                    <div className="row">
                        <div className="col-md-5">
                            <div className="product-gallery" style={{ position: 'sticky', top: '20px', zIndex: 10 }}>
                                <figure className="product-main-image">
                                    <img src={activeImg} alt={activeProduct?.imagealt} />
                                </figure>
                                {/* <!-- End .product-main-image --> */}

                                {activeProduct?.images?.length > 1 ?
                                    <div className="product-image-gallery">
                                        {activeProduct?.images?.map((image) => (
                                            <Link key={image?._id} className={`product-gallery-item ${image.url === activeImg ? "active" : ""}`} to="#" onClick={(e) => setActiveImg(image?.url)}>
                                                <img src={image.url} alt={product?.name} style={{ height: "100px" }} />
                                            </Link>
                                        ))}
                                    </div>
                                    :
                                    ""
                                }

                            </div>
                            {/* <!-- End .product-gallery --> */}
                        </div>
                        {/* <!-- End .col-md-6 --> */}

                        <div className="col-md-7">
                            <div className="product-details fs-4">

                                <div className="accordion accordion-plus product-details-accordion" id="product-accordion">
                                    <div className="card card-box card-sm">
                                        <div className="card-header" id="product-desc-heading">
                                            <h2 className="card-title">
                                                <a role="button" data-toggle="collapse" href="#product-accordion-desc" aria-expanded="true" aria-controls="product-accordion-desc">
                                                    Description
                                                </a>
                                            </h2>
                                        </div>
                                        {/* <!-- End .card-header --> */}
                                        <div id="product-accordion-desc" className="collapse show" aria-labelledby="product-desc-heading" data-parent="#product-accordion">
                                            <div className="card-body">
                                                <div className="product-details">
                                                    <div className="product-content mb-2">
                                                        <p className='fs-3'>{activeProduct?.description}</p>
                                                    </div>

                                                    {activeProduct?.sku && (
                                                    <div className="social-icons social-icons-sm mb-1">
                                                        <span className="social-label">SKU:</span>

                                                        <p className='fs-4'>{activeProduct?.sku}</p>
                                                    </div>
                                                    )}

                                                    {/* <!-- End .product-content --> */}
                                                    {variants?.length > 0 && (
                                                    <div className="details-filter-row details-row-size mb-1">
                                                        <label>Color:</label>

                                                        <div className="product-nav product-nav-dots">
                                                            {/* Active color (optional default swatch) */}
                                                            {product.specifications
                                                            .filter(spec => spec.specId.title === "Color")
                                                            .map((spec) => (
                                                                <a
                                                                key={spec.value._id}
                                                                href="#"
                                                                onClick={(e) => {
                                                                        e.preventDefault();
                                                                        setActiveProduct(product);
                                                                        setActiveImg(product?.images?.[0]?.url);
                                                                        }}
                                                                className={`inline-block w-6 h-6 rounded-full border ${product?._id === activeProduct?._id ? "active" : ""}`}
                                                                style={{ background: spec.value.title.toLowerCase() }}
                                                                >
                                                                <span className="sr-only">{spec.value.title}</span>
                                                                </a>
                                                            ))}

                                                            {/* Render all color swatches */}
                                                            {variants.flatMap((variant) =>
                                                                variant.specifications
                                                                .filter(spec => spec.specId.title === "Color")
                                                                .map((spec) => (
                                                                    <a
                                                                    key={spec.value._id}
                                                                    href="#"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        setActiveProduct(variant);
                                                                        setActiveImg(variant?.images?.[0]?.url);
                                                                        }}
                                                                    style={{ background: spec.value.title.toLowerCase() }}
                                                                    className={`inline-block w-6 h-6 rounded-full border ${variant?._id === activeProduct?._id ? "active" : ""}`}
                                                                    >
                                                                    <span className="sr-only">{spec.value.title}</span>
                                                                    </a>
                                                                ))
                                                            )}
                                                            </div>
                                                    </div>
                                                    )}

                                                    
                                                    
                                                    <div className="social-icons social-icons-sm mb-1">
                                                        <span className="social-label">Share:</span>

                                                        <a href= {`mailto:?subject=Check out this product from Belcab&body=Hey, I found this product and thought you might like it: ${activeProduct?.name}%0D%0A${window.location.href}`} className='share-button' title="Share via Email">
                                                            <i className="bi bi-envelope"></i>
                                                            <span>Email</span>
                                                        </a>
                                                    </div>

                                                    {/* <div className="details-filter-row details-row-size">
                                                        <label htmlFor="size">Size:</label>
                                                        <div className="select-custom">
                                                            <select name="size" id="size" className="form-control">
                                                                <option value="#" selected="selected">Select a size</option>
                                                                <option value="s">Small</option>
                                                                <option value="m">Medium</option>
                                                                <option value="l">Large</option>
                                                                <option value="xl">Extra Large</option>
                                                            </select>
                                                        </div>
                                                        </div> */}

                                                    <div className="row product-details-action">
                                                        <div className="col-3 my-2">
                                                            <a
                                                                href="#"
                                                                className="btn-product btn-cart"
                                                                onClick={(e) =>{
                                                                    e.preventDefault();
                                                                    setShowQuotation(true)
                                                                }}
                                                            >
                                                            <span>Quotation</span></a>
                                                        </div>
                                                        <div className="col-5 my-2">
                                                        {activeProduct?.datasheet && (
                                                            <a
                                                                href={activeProduct.datasheet.datasheet}
                                                                className="btn-product btn-cart"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <span>Datasheet</span>
                                                            </a>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {activeProduct?.specifications?.length > 0 && (
                                                        <div className="product-desc-content">
                                                            <table className="specifications-table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Specification</th>
                                                                        <th>Value</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {activeProduct?.specifications.map((spec, index) => (
                                                                        <tr key={spec?.specId?.title || index}>
                                                                            <th>{spec?.specId?.title}</th>
                                                                            <td>{spec?.value?.title}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    
                                        )}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        <div className="card card-box card-sm">
                                        <div className="card-header" id="product-review-heading">
                                            <h2 className="card-title">
                                                <a className="collapsed" role="button" data-toggle="collapse" href="#product-accordion-review" aria-expanded="false" aria-controls="product-accordion-review">
                                                    Reviews
                                                </a>
                                            </h2>
                                        </div>
                                        <div id="product-accordion-review" className="collapse" aria-labelledby="product-review-heading" data-parent="#product-accordion">
                                            <div className="card-body">
                                                <div className="product-desc-content">
                                                    <div className="reviews">
                                                        <div className='row'>
                                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                                                <h3>Reviews({activeProduct?.numOfReviews})</h3>

                                                                <div className="btn-wrap">
                                                                    <button
                                                                        className="btn btn-primary btn-rounded"
                                                                        onClick={() => setShowModal(true)} // Open review modal
                                                                    ><span className="bi bi-pencil-square"></span>&nbsp;&nbsp;Add review</button>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <ListReviews reviews={activeProduct?.reviews} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {(showModal || showQuotation) && (
    <div className="modalOverlay" ref={modalRef}>
        <div className={showModal?"modalContent":"modalContent2"}>
            {showModal && (
                <NewReview closeModal={closeModal} slug={activeProduct?.slug} />
            )}

            {showQuotation && (
                <QuotationModal closeQuotation={closeQuotation} productId={activeProduct?.slug} />
            )}
        </div>
    </div>
)}

        </div>
    )
}

export default ProductDetails;