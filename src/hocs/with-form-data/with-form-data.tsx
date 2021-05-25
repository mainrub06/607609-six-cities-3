import React, { ChangeEvent, PureComponent } from "react";
import { FORM_PARAMS } from "../../const";

interface IState {
  rate: number | string;
  text: string;
  activeBtn: boolean;
}

export interface IWithFormData {
  rateData: string | number;
  textData: string;
  isButtonActive: boolean;
  handleTextareaChange(e: ChangeEvent<HTMLTextAreaElement>): void;
  handleRadioChange(e: ChangeEvent<HTMLInputElement>): void;
  resetForm(): void;
}

/*
Ниже приведен пример инкапсулирования типов в классе.
Сам же HOC принимает только типы для сквозных пропсов.
 */

function withFormData<P>(Component: React.ComponentType<P & IWithFormData>) {
  return class withFormDataComponent extends PureComponent<P, IState> {
    constructor(props: P) {
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

    handleRadioChange(evt: ChangeEvent<HTMLInputElement>) {
      this.setState({
        rate: evt.target.value,
      });
    }

    handleTextareaChange(evt: ChangeEvent<HTMLTextAreaElement>) {
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
          {...(this.props as P)}
          rateData={rate}
          textData={text}
          isButtonActive={activeBtn}
          handleTextareaChange={this.handleTextareaChange}
          handleRadioChange={this.handleRadioChange}
          resetForm={this.resetForm}
        />
      );
    }
  };
}

export default withFormData;
