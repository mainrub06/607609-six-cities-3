import { ChangeEvent } from "react";

export interface IReviewFormSubmit {
  rate: string | number;
  text: string;
}

export interface IReviewForm {
  activeHotelId: string;
  handleSubmitFeedback(
    firstArg: IReviewFormSubmit,
    secondArg: string | undefined
  ): void;
  reviewsResponse: number;
  resetForm(): void;
  isButtonActive: boolean;
  handleTextareaChange(e: ChangeEvent<HTMLTextAreaElement>): void;
  handleRadioChange(e: ChangeEvent<HTMLInputElement>): void;
  rateData: string | number;
  textData: string;
}
