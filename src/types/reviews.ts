import { ChangeEvent } from "react";

export interface IReview {
  id: number;
  rate: number;
  comment: string;
  date: string;
  user: IUser;
}

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

export interface IUser {
  id: number;
  isPro: boolean;
  name: string;
  avatar: string;
}

export interface IReviewsReducer {
  reviews: IReview[];
  reviewResponse: string;
}
