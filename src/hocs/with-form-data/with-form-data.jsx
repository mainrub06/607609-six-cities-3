import React, { PureComponent } from "react";
import { FORM_PARAMS } from "../../const";

const withFormData = (Component) => {
  class withFormDataComponent extends PureComponent {
    constructor(props) {
      super(props);

      this.handleTextareaChange = this.handleTextareaChange.bind(this);
      this.handleRadioChange = this.handleRadioChange.bind(this);
      this.resetForm = this.resetForm.bind(this);

      this.state = {
        rate: `0`,
        text: ``,
        activeBtn: true,
      };
    }

    componentDidUpdate() {
      this.getBtnStatus();
    }

    getBtnStatus() {
      const { rate, text } = this.state;

      this.setState({
        activeBtn: !(
          rate >= FORM_PARAMS.MIN_STARS_CHECKED &&
          text.length > FORM_PARAMS.MIN_TEXTAREA_VALUE &&
          text.length < FORM_PARAMS.MAX_TEXTAREA_VALUE
        ),
      });
    }

    handleRadioChange(evt) {
      this.setState({
        rate: evt.target.value,
      });
    }

    handleTextareaChange(evt) {
      evt.preventDefault();
      this.setState({
        text: evt.target.value,
      });
    }

    resetForm() {
      this.setState({
        rate: `0`,
        text: ``,
        activeBtn: true,
      });
    }

    render() {
      const { text, rate, activeBtn } = this.state;
      return (
        <Component
          {...this.props}
          rateData={rate}
          textData={text}
          isButtonActive={activeBtn}
          handleTextareaChange={this.handleTextareaChange}
          handleRadioChange={this.handleRadioChange}
          resetForm={this.resetForm}
        />
      );
    }
  }

  withFormDataComponent.propTypes = {};

  return withFormDataComponent;
};

export default withFormData;
