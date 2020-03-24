import React, {PureComponent} from "react";
import ReviewsItem from "../reviews-item/reviews-item.jsx";
import {REVIEWS_PARAMS} from "../../const";
import PropTypes from "prop-types";

class ReviewsList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {reviews} = this.props;

    if (reviews) {
      return (
        <ul className="reviews__list">
          {reviews.slice(0, REVIEWS_PARAMS.MAX_REVIEWS).map((review) => <ReviewsItem key = {review.id} element = {review}/>)}
        </ul>
      );
    }
    return null;
  }
}

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        rate: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        user: PropTypes.shape({
          id: PropTypes.number.isRequired,
          isPro: PropTypes.bool.isRequired,
          name: PropTypes.string.isRequired,
          avatar: PropTypes.string.isRequired
        })
      })
  ).isRequired
};

export default ReviewsList;
