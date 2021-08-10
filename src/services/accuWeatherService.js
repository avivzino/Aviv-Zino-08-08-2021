import { httpService } from "./httpService";

const ACCUWEATHER_BASE_URL = "https://dataservice.accuweather.com";
const API_KEY = "mO0XcixtapMUhtsQBCRoZssaOXX1YLLC";

const getAutoCompletes = async (text) => {
  let endpoint = `${ACCUWEATHER_BASE_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${text}`;
  try {
    return await httpService.get(endpoint);
  } catch (error) {
    try {
      return await httpService.get(endpoint);
    } catch (error) {
      throw error;
    }
  }
};

const getWeather = async (key) => {
  let endpoint = `${ACCUWEATHER_BASE_URL}/currentconditions/v1/${key}?apikey=${API_KEY}`;
  try {
    return await httpService.get(endpoint);
  } catch (error) {
    try {
      return await httpService.get(endpoint);
    } catch (error) {
      throw error;
    }
  }
};

const getForecasts = async (key) => {
  let endpoint = `${ACCUWEATHER_BASE_URL}/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}`;
  try {
    return await httpService.get(endpoint);
  } catch (error) {
    try {
      return await httpService.get(endpoint);
    } catch (error) {
      throw error;
    }
  }
};

const getByLocation = async (lat, lng) => {
  let endpoint = `${ACCUWEATHER_BASE_URL}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat}%2C${lng}`;
  try {
    return await httpService.get(endpoint);
  } catch (error) {
    try {
      console.log("entering the try-catch inside the big catch");
      return httpService.get(endpoint);
    } catch (error) {
      throw error;
    }
  }
};

export const accuWeatherService = {
  getAutoCompletes,
  getWeather,
  getForecasts,
  getByLocation,
};
