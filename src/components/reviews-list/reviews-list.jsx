import React, {PureComponent} from "react";
import ReviewsItem from "../reviews-item/reviews-item.jsx";
import PropTypes from "prop-types";

class ReviewsList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {review} = this.props;

    if (review) {
      return (
        <ul className="reviews__list">
          {review.reviewsArr.map((reviewItem, id) => <ReviewsItem key = {id + reviewItem.author} element = {reviewItem}/>)}
        </ul>
      );
    }
    return null;
  }
}

ReviewsList.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.string.isRequired,
    reviewsArr: PropTypes.arrayOf(
        PropTypes.shape({
          author: PropTypes.string.isRequired,
          rate: PropTypes.number.isRequired,
          text: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
          photo: PropTypes.shape({
            src: PropTypes.string.isRequired,
            alt: PropTypes.string.isRequired
          }).isRequired
        })
    ).isRequired
  })
};

export default ReviewsList;
