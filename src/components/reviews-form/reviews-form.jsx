import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { FORM_PARAMS, REQUEST_STATUS } from "../../const";

class ReviewsForm extends PureComponent {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(evt) {
    const {
      handleSubmitFeedback,
      activeHotelId,
      rateData,
      textData,
      resetForm,
    } = this.props;

    evt.preventDefault();
    handleSubmitFeedback({ rate: rateData, text: textData }, activeHotelId);
    resetForm();
  }

  render() {
    const {
      reviewsResponse,
      isButtonActive,
      rateData,
      textData,
      handleTextareaChange,
      handleRadioChange,
    } = this.props;

    return (
      <form
        onSubmit={this.handleFormSubmit}
        className="reviews__form form"
        action="#"
        method="post"
      >
        <label className="reviews__label form__label" htmlFor="review">
          {reviewsResponse === REQUEST_STATUS.OK ? `Your review` : `Error`}
        </label>
        <div className="reviews__rating-form form__rating">
          {FORM_PARAMS.STARS.map((value, index) => {
            const stars = FORM_PARAMS.STARS.length - index;
            return (
              <React.Fragment key={value}>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  value={stars}
                  id={`${stars}-stars`}
                  type="radio"
                  onChange={handleRadioChange}
                  checked={stars.toString() === rateData}
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
          })}
        </div>
        <textarea
          value={textData}
          onChange={handleTextareaChange}
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
        ></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set{` `}
            <span className="reviews__star">rating</span> and describe your stay
            with at least{` `}
            <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled={isButtonActive}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

ReviewsForm.propTypes = {
  activeHotelId: PropTypes.string.isRequired,
  handleSubmitFeedback: PropTypes.func,
  reviewsResponse: PropTypes.number,
  isButtonActive: PropTypes.bool.isRequired,
  resetForm: PropTypes.func.isRequired,
  handleTextareaChange: PropTypes.func.isRequired,
  handleRadioChange: PropTypes.func.isRequired,
  rateData: PropTypes.string,
  textData: PropTypes.string,
};

export default ReviewsForm;
