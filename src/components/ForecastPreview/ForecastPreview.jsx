import Card from "@material-ui/core/Card";
import "./ForecastPreview.scss";

import { fromFerToCelc, fromCelcToFer, daysInWeek } from "../../services/utils";
import { useSelector } from "react-redux";

export const ForecastPreview = ({ forecast }) => {
  const { isCelsDegrees } = useSelector(({ uiReducer }) => uiReducer);
  const day = daysInWeek[new Date(forecast.Date).getDay()];

  const getTemp = () => {
    const valInFer =
      (forecast.Temperature.Minimum.Value +
        forecast.Temperature.Maximum.Value) /
      2;
    return isCelsDegrees ? fromFerToCelc(valInFer) : valInFer;
  };

  const uiTemp = `${Math.round((getTemp() * 10) / 10)}°${
    isCelsDegrees ? "C" : "F"
  }`;

  return (
    <Card className="forecast-preview flex column align-center ">
      <p style={{ fontWeight: "bold" }}>{day}</p>
      <p align="center" style={{ padding: "10px" }}>
        {uiTemp}
      </p>
    </Card>
  );
};
