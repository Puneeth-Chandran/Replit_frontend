import React from 'react'
import StarRatings from 'react-star-ratings';

const ListReviews = ({reviews}) => {
    return (
        
           <> 
            {reviews?.map((review)=>(
                <div className="review" key={review?._id}>
                <div className="row no-gutters"> 
                <div className="col-auto">
                    <h4>{review?.name}</h4>
                    <div className="ratings-container">
                        <StarRatings
                                    rating={review?.rating}
                                    starRatedColor='#FCB941'
                                    numberOfStars={5}
                                    starDimension='14px'
                                    starSpacing='0.3px'
                                />
                    </div>
                    {/* <!-- End .rating-container --> */}
                </div>
                {/* <!-- End .col --> */}
                <div className="col">
                    <h5>{review?.heading}</h5>

                    <div className="review-content">
                        <p>{review?.comment}</p>
                    </div>
                    {/* <!-- End .review-content --> */}

                </div>
                {/* <!-- End .col-auto --> */}
                </div>
                </div>
            ))}
                
       </>     
    )
}

export default ListReviews;