import React, { useState, useEffect } from 'react';
import Metadata from '../../layout/Metadata';
import Loader from '../../layout/Loader';
import { toast } from 'react-hot-toast';
import { useDeleteReviewMutation, useGetAdminProductsQuery, useLazyGetProductReviewsQuery } from '../../../redux/api/productsApi';
import StarRatings from 'react-star-ratings';

const ProductReviews = () => {

    const [productId, setProductId] = useState('');

    const [getProductReviews, { data, isLoading, error }] = useLazyGetProductReviewsQuery();
    const { data: productData, isLoading: productLoading, error: productError } = useGetAdminProductsQuery();
    const [deleteReview, { error: deleteError, isLoading: isDeleteLoading, isSuccess }] = useDeleteReviewMutation();

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }

        if (deleteError) {
            toast.error(deleteError?.data?.message);
        }

        if (isSuccess) {
            toast.success('Review deleted successfully');
        }

        if(productError){
            toast.error("Something went wrong please try again later")
        }
    }, [error, deleteError, isSuccess, productError]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (data?.review?.length<=0) {
            toast.error('No reviews found on this product');
            return;
        }
        getProductReviews(productId);
    };
    

    const deleteReviewHandler = (productId, reviewId) => {
        deleteReview({ productId, id: reviewId });
    };
    if(productLoading||isLoading){
        <Loader/>
    }
    let globalIndex = 1;
    return (
        <>
        <Metadata title={"Product Reviews"}/>
            <div className="container-fluid">
                <div className="page-header">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="page-header-left">
                                <h3>Product Reviews
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
                                <form className="form-inline search-form search-box" onSubmit={submitHandler}>
                                    <div className="form-group">
                                        <input className="form-control-plaintext" type="search" placeholder="Search.."
                                            value={productId} onChange={(e) => setProductId(e.target.value)}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="card-body">
                                <div>
                                    <div className="table-responsive table-desi">
                                    {data?.review?.length>0?(
                                        <table className="review-table table all-package">
                                            <thead>
                                                <tr>
                                                    <th>Index</th>
                                                    <th>Customer Name</th>
                                                    <th>Product Name</th>
                                                    <th>Rating</th>
                                                    <th>Comment</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {data?.review?.map((review) => (
                                                <tr key={review?._id}>
                                                            <td>{globalIndex++}</td>
                                                            <td>{review?.name}</td>
                                                            <td>{data?.name}</td>
                                                            <td>
                                                                <StarRatings
                                                                    rating={review?.rating}
                                                                    starRatedColor='#FCB941'
                                                                    numberOfStars={5}
                                                                    starDimension='18px'
                                                                    starSpacing='0.5px'
                                                                />
                                                            </td>
                                                            <td>{review?.comment}</td>
                                                            <td className="td-check">
                                                                <button
                                                                    style={{ border: "none", background: "none" }}
                                                                    onClick={() => deleteReviewHandler(productId, review?._id)}
                                                                    disabled={isDeleteLoading}
                                                                >
                                                                    <i className="bi bi-trash" title="Delete"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                            ))
                                            }
                                               </tbody>
                                        </table>):(
                                            <table className="review-table table all-package">
                                            <thead>
                                                <tr>
                                                    <th>Index</th>
                                                    <th>Customer Name</th>
                                                    <th>Product Name</th>
                                                    <th>Rating</th>
                                                    <th>Comment</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {productData?.products?.map((product) =>
                                                    product?.reviews?.map((review) => (
                                                        <tr key={review?._id}>
                                                        <td>{globalIndex++}</td>
                                                        <td style={{ fontWeight: "normal", textTransform:"none" }}>{review?.name}</td>
                                                            <td>{product?.name}</td>
                                                            <td>
                                                                <StarRatings
                                                                    rating={review?.rating}
                                                                    starRatedColor='#FCB941'
                                                                    numberOfStars={5}
                                                                    starDimension='18px'
                                                                    starSpacing='0.5px'
                                                                />
                                                            </td>
                                                            <td>{review?.comment}</td>
                                                            <td className="td-check">
                                                                <button
                                                                    style={{ border: "none", background: "none" }}
                                                                    onClick={() => deleteReviewHandler(product?._id, review?._id)}
                                                                    disabled={isDeleteLoading}
                                                                >
                                                                    <i className="bi bi-trash" title="Delete"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                        )}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductReviews;