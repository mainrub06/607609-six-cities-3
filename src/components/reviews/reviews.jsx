import React from "react";
import ReviewsList from "../reviews-list/reviews-list.jsx";
import ReviewsForm from "../reviews-form/reviews-form.jsx";
import withFormData from "../../hocs/with-form-data/with-form-data.jsx";
import { AUTHORIZATION_STATUS } from "../../const";
import PropTypes from "prop-types";

const ReviewsFormWrapper = withFormData(ReviewsForm);

const Reviews = ({
  reviews,
  authStatus,
  handleSubmitFeedback,
  activeHotelId,
  reviewsResponse,
}) => {
  if (reviews) {
    return (
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
    );
  }
  return null;
};

Reviews.propTypes = {
  authStatus: PropTypes.string,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      rate: PropTypes.number,
      comment: PropTypes.string,
      date: PropTypes.string,
      user: PropTypes.shape({
        id: PropTypes.number,
        isPro: PropTypes.bool,
        name: PropTypes.string,
        avatar: PropTypes.string,
      }),
    })
  ),
  activeHotelId: PropTypes.string.isRequired,
  handleSubmitFeedback: PropTypes.func,
  reviewsResponse: PropTypes.number,
};

export default Reviews;
