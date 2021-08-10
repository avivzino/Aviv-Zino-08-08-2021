import { useSelector } from "react-redux";
import "./FavoritesList.scss";
import { FavoritePreview } from "../FavoritePreview/FavoritePreview";
import { MessageBox } from "../MessageBox/MessageBox";

export const FavoritesList = (props) => {
  const { favoriteCities } = useSelector(
    ({ favoriteCitiesReducer }) => favoriteCitiesReducer
  );

  const EmptyMessage = <MessageBox text={"Your favorites list is empty"} />;

  if (!favoriteCities?.length) return EmptyMessage;
  return (
    <ul className="favorites-list center-childs">
      {favoriteCities.map((currFav) => (
        <FavoritePreview key={currFav.details.Key} favorite={currFav} />
      ))}
    </ul>
  );
};
