import React from "react";
import ReviewsList from "../ReviewList/ReviewList";
import ReviewsForm from "../ReviewsForm/ReviewsForm";
import withFormData, {
  IWithFormData,
} from "../../hocs/with-form-data/with-form-data";
import { AUTHORIZATION_STATUS } from "../../const";
import { IReview } from "../../types/Reviews/Review";
import { IReviewForm } from "../../types/Reviews/ReviewForm";

export interface IFormWrapper extends IWithFormData {
  activeHotelId: string;
  handleSubmitFeedback(): void;
  reviewsResponse: number;
}

interface IReviews extends IFormWrapper {
  reviews: Array<IReview>;
  authStatus: string;
}

const ReviewsFormWrapper = withFormData<IReviewForm>(ReviewsForm);

const Reviews = ({
  reviews,
  authStatus,
  handleSubmitFeedback,
  activeHotelId,
  reviewsResponse,
}: IReviews) => {
  return (
    <>
      {reviews && (
        <section className="property__reviews reviews">
          <h2 className="reviews__title">
            Reviews &middot;
            {reviews.length > 0 && (
              <span className="reviews__amount">{reviews.length}</span>
            )}
          </h2>
          <ReviewsList reviews={reviews} />
          {authStatus === AUTHORIZATION_STATUS.AUTH && (
            <ReviewsFormWrapper
              reviewsResponse={reviewsResponse}
              activeHotelId={activeHotelId}
              handleSubmitFeedback={handleSubmitFeedback}
            />
          )}
        </section>
      )}
    </>
  );
};

export default Reviews;
