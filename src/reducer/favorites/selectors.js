export const getResponseStatusFavorite = (state) => {
  if(state.favorites.updatedHotel) {
    return state.favorites.updatedHotel.status;
  }
  return null;
};
