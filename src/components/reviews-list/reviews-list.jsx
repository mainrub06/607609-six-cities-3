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
    id: PropTypes.string,
    reviewsArr: PropTypes.arrayOf(
        PropTypes.shape({
          author: PropTypes.string,
          rate: PropTypes.number,
          text: PropTypes.string,
          date: PropTypes.string,
          photo: PropTypes.shape({
            src: PropTypes.string,
            alt: PropTypes.string
          })
        })
    )
  })
};

export default ReviewsList;
