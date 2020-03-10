import React, {PureComponent} from "react";
import ReviewsList from "../reviews-list/reviews-list.jsx";
import ReviewsForm from "../reviews-form/reviews-form.jsx";
import PropTypes from "prop-types";

class Reviews extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {review} = this.props;
    if (!review) {
      return (
        <section className="property__reviews reviews">
          <h2 className="reviews__title">
            Reviews &middot;
            {/* <span className="reviews__amount">{review.reviewsArr.length}</span> */}
          </h2>
          {/* <ReviewsList review={review} /> */}

          <ReviewsForm/>
        </section>
      );
    }
    return null;
  }
}

Reviews.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.string,
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

export default Reviews;
