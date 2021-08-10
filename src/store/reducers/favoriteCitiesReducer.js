import { storageService } from "../../services/storageService";

const INITIAL_STATE = {
  favoriteCities: storageService.getItem("favoriteCities") || [],
};

export function favoriteCitiesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_FAVORITES":
      return {
        favoriteCities: action.favorites,
      };
    case "ADD_FAVORITE":
      return {
        favoriteCities: [...state.favoriteCities, action.favorite],
      };
    case "REMOVE_FAVORITE":
      return {
        favoriteCities: state.favoriteCities.filter(
          (currFavorite) => currFavorite.details.Key !== action.cityKey
        ),
      };
    // case "UPDATE_FAVORITE":
    //   const { updatedFavorite } = action;
    //   return {
    //     favoriteCities: state.favoriteCities.map((currFavorite) =>
    //       currFavorite._id === updatedFavorite._id
    //         ? updatedFavorite
    //         : currFavorite
    //     ),
    //   };
    default:
      return state;
  }
}
