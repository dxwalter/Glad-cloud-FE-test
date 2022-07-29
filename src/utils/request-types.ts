import axios from "axios";

export const get = async (url: string, payload?: object) => {
  return await axios
    .get(url, {
      params: payload,
    })
    .catch((error) => {
      throw new Error(`${error}`);
    });
};

export const post = async (url: string, payload: any) => {
  const headers = { headers: { "Content-type": "application/json" } };
  return await axios.post(url, payload, headers);
};

export const remove = async (url: string, payload: any) => {
  const fullUrl = `${url}/${payload}`;
  const headers = { headers: { "Content-type": "application/json" } };
  return await axios.delete(fullUrl, headers);
};

export const put = async (url: string, payload: any) => {
  const headers = { headers: { "Content-type": "application/json" } };
  return await axios.put(url, payload, headers).catch((error: any) => {
    throw new Error(error.response.data.error.message);
  });
};
