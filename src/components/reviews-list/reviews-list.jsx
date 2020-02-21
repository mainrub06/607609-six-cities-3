import React, {PureComponent} from "react";
import ReviewsItem from "../reviews-item/reviews-item.jsx"
import PropTypes from "prop-types";



class ReviewsList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {review} = this.props;
    return (
      <ul className="reviews__list">
        {review.reviewsArr.map((it) => <ReviewsItem element = {it}/>)}
      </ul>
    );
  }
}

export default ReviewsList;
