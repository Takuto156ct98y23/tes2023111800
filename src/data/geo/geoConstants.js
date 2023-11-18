import { localDataGeo } from "./localDataGeo";

export const countryCodeVSCountryName = localDataGeo.countryCodeVSCountryName;
export const countryCodeVSCities = localDataGeo.countryCodeVSCities;

// const citiesByCountriesArr = [];
// for (const [countryCode, countryName] of Object.entries(
//   countryCodeVSCountryName
// )) {
//   const cities = countryCodeVSCities[countryCode];
//   citiesByCountriesArr.push({ name: countryName, cities: cities });
// }
// export const citiesByCountries = citiesByCountriesArr;
