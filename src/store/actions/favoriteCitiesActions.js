import { eventBusService } from "../../services/eventBusService";
import { storageService } from "../../services/storageService";

// Thunk - Action Dispatcher
export function setFavorites(favorites) {
  return (dispatch) => {
    const action = {
      type: "SET_FAVORITES",
      favorites,
    };
    dispatch(action);
    storageService.setItem("favoriteCities", favorites);
  };
}

export function addFavorite(favorite) {
  return (dispatch, getState) => {
    const action = {
      type: "ADD_FAVORITE",
      favorite,
    };
    dispatch(action);
    storageService.setItem(
      "favoriteCities",
      getState().favoriteCitiesReducer.favoriteCities
    );
    eventBusService.emit("notif", {
      type: "success",
      txt: `${favorite.details.LocalizedName} was added to favorites!`,
    });
  };
}

export function removeFavorite(cityKey, favorite) {
  return (dispatch, getState) => {
    console.log("removing from action: ", cityKey);
    const action = {
      type: "REMOVE_FAVORITE",
      cityKey,
    };
    dispatch(action);
    storageService.setItem(
      "favoriteCities",
      getState().favoriteCitiesReducer.favoriteCities
    );
    eventBusService.emit("notif", {
      type: "success",
      txt: `${favorite.details.LocalizedName} was removed from favorites`,
    });
  };
}
