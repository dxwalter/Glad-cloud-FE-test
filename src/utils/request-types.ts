import axios from "axios";

const instance = axios.create();

export const get = async (url: string, payload?: object) => {
  return await instance.get(url).catch((error) => {
    throw new Error(error.message);
  });
};

export const post = async (url: string, payload: any) => {
  const headers = { headers: { "Content-type": "application/json" } };
  return await axios.post(url, payload, headers).catch((error: any) => {
    throw new Error(error.response);
  });
};

export const remove = async (url: string, payload: any) => {
  const fullUrl = `${url}/${payload}`;
  const headers = { headers: { "Content-type": "application/json" } };
  return await axios.delete(fullUrl, headers).catch((error: any) => {
    throw new Error(error.response);
  });
};

export const put = async (url: string, payload: any) => {
  const headers = { headers: { "Content-type": "application/json" } };
  return await axios.put(url, payload, headers).catch((error: any) => {
    throw new Error(error.response);
  });
};
