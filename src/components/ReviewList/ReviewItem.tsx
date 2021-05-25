import React from "react";
import { getStarsFromNum } from "../../utils";
import { IReview } from "../../types/reviews/review";

interface IProps {
  review: IReview;
}

const ReviewsItem = ({ review }: IProps) => {
  return (
    <>
      {review && (
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
      )}
    </>
  );
};

export default ReviewsItem;
