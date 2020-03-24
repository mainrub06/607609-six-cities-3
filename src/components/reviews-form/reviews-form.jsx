import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {FORM_PARAMS, REQUEST_STATUS} from "../../const";

class ReviewsForm extends PureComponent {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);

    this.state = {
      rate: 0,
      text: ``,
      activeBtn: true,
    };
  }

  getBtnStatus() {
    const {rate, text} = this.state;

    this.setState({
      activeBtn: !(rate >= FORM_PARAMS.MIN_STARS_CHECKED && text.length > FORM_PARAMS.MIN_TEXTAREA_VALUE && text.length < FORM_PARAMS.MAX_TEXTAREA_VALUE)
    });
  }

  handleRadioChange(evt) {
    this.setState({
      rate: evt.target.value
    });
  }

  handleTextareaChange(evt) {
    evt.preventDefault();
    this.setState({
      text: evt.target.value
    });

  }

  handleFormSubmit(evt) {
    const {handleSubmitFeedback, activeHotelId} = this.props;
    const {rate, text} = this.state;
    evt.preventDefault();
    handleSubmitFeedback({rate, text}, activeHotelId);
    this.setState({
      rate: 0,
      text: ``,
      activeBtn: true
    });
  }

  componentDidUpdate() {
    this.getBtnStatus();
  }

  render() {
    const {reviewsResponse} = this.props;

    return (
      <form onSubmit={this.handleFormSubmit} className="reviews__form form" action="#" method="post">
        <label className="reviews__label form__label" htmlFor="review">
          {reviewsResponse === REQUEST_STATUS.OK ? `Your review` : `Error`}
        </label>
        <div className="reviews__rating-form form__rating">
          {
            FORM_PARAMS.STARS.map((value, index) => {
              const stars = FORM_PARAMS.STARS.length - index;
              return (
                <React.Fragment key = {value}>
                  <input
                    className="form__rating-input visually-hidden"
                    name="rating"
                    value={stars}
                    id={`${stars}-stars`}
                    type="radio"
                    onChange={this.handleRadioChange}
                    checked={stars.toString() === this.state.rate}
                  />
                  <label
                    htmlFor={`${stars}-stars`}
                    className="reviews__rating-label form__rating-label"
                    title={value}
                  >
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  </label>
                </React.Fragment>
              );
            })
          }
        </div>
        <textarea
          value={this.state.text}
          onChange={this.handleTextareaChange}
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
        ></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set{` `}
            <span className="reviews__star">rating</span> and describe your
                stay with at least{` `}
            <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={this.state.activeBtn}>Submit</button>
        </div>
      </form>
    );
  }
}

ReviewsForm.propTypes = {
  activeHotelId: PropTypes.string.isRequired,
  handleSubmitFeedback: PropTypes.func,
  reviewsResponse: PropTypes.number
};


export default ReviewsForm;
