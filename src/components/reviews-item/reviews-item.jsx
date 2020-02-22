import React, {PureComponent} from "react";
import {getStarsFromNum} from "../../utils";
import PropTypes from "prop-types";

class ReviewsItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {element} = this.props;

    return (
      <li className="reviews__item">
        <div className="reviews__user user">
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img
              className="reviews__avatar user__avatar"
              src={element.photo.src}
              width="54"
              height="54"
              alt={element.photo.alt}
            />
          </div>
          <span className="reviews__user-name">{element.author}</span>
        </div>
        <div className="reviews__info">
          <div className="reviews__rating rating">
            <div className="reviews__stars rating__stars">
              <span style={{width: getStarsFromNum(element.rate)}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <p className="reviews__text">{element.text}</p>
          <time className="reviews__time" dateTime="2019-04-24">
            {element.date}
          </time>
        </div>
      </li>
    );
  }
}

ReviewsItem.propTypes = {
  element: PropTypes.shape({
    author: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    photo: PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired
    })
  })
};

export default ReviewsItem;
