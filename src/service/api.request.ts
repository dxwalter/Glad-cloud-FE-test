import { get, post, put, remove } from "../utils/request-types";

export const getGender = async (name: string) => {
  return await get(`https://api.genderize.io/?name=${name}`);
};

export const getAllCountries = async () => {
  return await get(`https://restcountries.com/v3.1/all`);
  // return await get(`http://universities.hipolabs.com/search?country=nigeria`);
};

export const getAllUninversities = async (country: string) => {
  return await get(
    `http://universities.hipolabs.com/search?country=${country}`
  );
};
