import React, {PureComponent} from "react";
import ReviewsItem from "../reviews-item/reviews-item.jsx";
import PropTypes from "prop-types";

class ReviewsList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {review} = this.props;

    return (
      <ul className="reviews__list">
        {review.reviewsArr.map((it, id) => <ReviewsItem key = {id + it.author} element = {it}/>)}
      </ul>
    );
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
          })
        })
    ).isRequired
  })
};

export default ReviewsList;
