import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { accuWeatherService } from "../../services/accuWeatherService";
import { loadFullCity } from "../../store/actions/cityActions";
import "./SearchBox.scss";
import { eventBusService } from "../../services/eventBusService";

export const SearchBox = () => {
  const dispatch = useDispatch();

  const [currText, setCurrText] = useState("");
  const [autocompletes, setAutocompletes] = useState([]);

  const loadAutoCompletes = async () => {
    if (!currText) return setAutocompletes([]);
    try {
      let exactSearch = autocompletes.find(({ LocalizedName }) => {
        return LocalizedName === currText;
      });
      if (exactSearch) handleSearch();

      const results = await accuWeatherService.getAutoCompletes(currText);

      const cleanResults = results.reduce((acc, currResult) => {
        const duplicatedResult = acc.find(({ LocalizedName }) => {
          return LocalizedName === currResult.LocalizedName;
        });
        if (!duplicatedResult) acc.push(currResult);
        return acc;
      }, []);

      setAutocompletes(cleanResults);
      exactSearch = cleanResults.find(({ LocalizedName }) => {
        return LocalizedName === currText;
      });

      if (exactSearch) handleSearch();
    } catch (error) {
      eventBusService.emit("notif", {
        type: "error",
        txt: `Couldn't load "${currText}" auto-completes. Check your internet connection, and make sure that you did'nt exceeded the daily weather requests`,
      });
    }
  };

  const cleanAutoCompletes = autocompletes.filter(
    ({ LocalizedName }) => LocalizedName !== currText
  );

  const handleSearch = async () => {
    const cityDetails = autocompletes.find(
      (currCity) => currCity.LocalizedName === currText
    );

    if (!cityDetails) return;
    dispatch(loadFullCity(cityDetails));
  };

  useEffect(() => {
    loadAutoCompletes();
  }, [currText]);

  return (
    <div className="search-box">
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        onChange={(ev, value) => setCurrText(value)}
        options={cleanAutoCompletes.map(({ LocalizedName }) => LocalizedName)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for location"
            margin="normal"
            variant="standard"
            value={currText}
            onChange={({ target: { value } }) => setCurrText(value)}
          />
        )}
      />
    </div>
  );
};
