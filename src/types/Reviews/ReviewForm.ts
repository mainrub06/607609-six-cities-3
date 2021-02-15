import { ChangeEvent } from "react";

interface IEvent {
  event: ChangeEvent<HTMLInputElement>;
}

export interface IReviewForm {
  activeHotelId: string;
  handleSubmitFeedback: Function;
  reviewsResponse: number;
  isButtonActive: boolean;
  resetForm: Function;

  // todo
  handleTextareaChange: IEvent;
  handleRadioChange: IEvent;
  rateData: string;
  textData: string;
}
