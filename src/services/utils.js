export const daysInWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const fromFerToCelc = (ferTemp) => {
  return (ferTemp - 32) / 1.8;
};
export const fromCelcToFer = (celcTemp) => {
  return 1.8 * celcTemp + 32;
};
