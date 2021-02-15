import React from "react";
import { getStarsFromNum } from "../../utils";
import PropTypes from "prop-types";

const ReviewsItem = ({ review }) => {
  if (review) {
    return (
      <li className="reviews__item">
        <div className="reviews__user user">
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img
              className="reviews__avatar user__avatar"
              src={review.user.avatar}
              width="54"
              height="54"
              alt={review.user.name}
            />
          </div>
          <span className="reviews__user-name">{review.user.name}</span>
        </div>
        <div className="reviews__info">
          <div className="reviews__rating rating">
            <div className="reviews__stars rating__stars">
              <span style={{ width: getStarsFromNum(review.rate) }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <p className="reviews__text">{review.comment}</p>
          <time className="reviews__time" dateTime="2019-04-24">
            {new Date(review.date).toLocaleDateString()}
          </time>
        </div>
      </li>
    );
  }
  return null;
};

ReviewsItem.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      isPro: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }),
  }),
};

export default ReviewsItem;
