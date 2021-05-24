import { ChangeEvent } from "react";

export interface IReviewForm {
  activeHotelId?: string;
  handleSubmitFeedback?(): void;
  reviewsResponse?: number;
  resetForm?(): void;
  isButtonActive: boolean;
  handleTextareaChange(e: ChangeEvent<HTMLTextAreaElement>): void;
  handleRadioChange(e: ChangeEvent<HTMLInputElement>): void;
  rateData: string | number;
  textData: string;
}
