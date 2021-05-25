import React from "react";
import ReviewsItem from "./ReviewItem";
import { REVIEWS_PARAMS } from "../../const";
import { IReview } from "../../types/reviews";

interface IProps {
  reviews: Array<IReview>;
}

const ReviewsList = ({ reviews }: IProps) => {
  return (
    <>
      {reviews && (
        <ul className="reviews__list">
          {reviews.slice(0, REVIEWS_PARAMS.MAX_REVIEWS).map((review) => (
            <ReviewsItem key={review.id} review={review} />
          ))}
        </ul>
      )}
    </>
  );
};

export default ReviewsList;
