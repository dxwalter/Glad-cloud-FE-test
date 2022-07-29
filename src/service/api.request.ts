import { get, post, put, remove } from "../utils/request-types";

export const getGender = async (name: string) => {
  return await get(`http://api.genderize.io/?name=${name}`);
};
