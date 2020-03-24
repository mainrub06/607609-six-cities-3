import {getFallingSortByDate} from "../../utils";

export const getReviews = (state) => getFallingSortByDate(state.reviews.reviewsList);
export const getReviewsResponse = (state) => state.reviews.reviewsResponse;
