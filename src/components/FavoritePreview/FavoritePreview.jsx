import Card from "@material-ui/core/Card";
import { daysInWeek } from "../../services/utils";
import { ToggleFavoriteButton } from "../ToggleFavoriteButton/ToggleFavoriteButton";
import { useSelector } from "react-redux";
import "./FavoritePreview.scss";

export const FavoritePreview = ({ favorite: { weather, details } }) => {
  const { isCelsDegrees } = useSelector(({ uiReducer }) => uiReducer);
  const day =
    daysInWeek[new Date(weather[0].LocalObservationDateTime).getDay()];

  const getUiTemp = () => {
    const temp =
      weather[0].Temperature[isCelsDegrees ? "Metric" : "Imperial"].Value;

    return `${Math.round((temp * 10) / 10)}°${isCelsDegrees ? "C" : "F"}`;
  };

  return (
    <Card className="favorite-preview flex column align-center">
      <p
        className="title"
        align="center"
        variant="body1"
        style={{ fontSize: "18px" }}
      >
        {details.LocalizedName}
      </p>
      <p align="center" variant="body1" style={{ fontWeight: "bold" }}>
        Today
      </p>
      <p align="center" variant="body1">
        {getUiTemp()}
      </p>
      <ToggleFavoriteButton cityKey={details.Key} />
    </Card>
  );
};
