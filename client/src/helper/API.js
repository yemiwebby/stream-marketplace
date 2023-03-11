import axios from "axios";
import { showNotification } from "./notification";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

const makeGETRequest = async ({ url, bearerToken }) => {
  try {
    let config = {};
    if (bearerToken) {
      config = { Authorization: `Bearer ${bearerToken}` };
    }
    const response = await API.get(url, config);
    return response.data;
  } catch (error) {
    showNotification({
      title: error.response.data.error,
      isSuccess: false,
    });
    return error.response.data;
  }
};

const makePOSTRequest = async ({ url, values, bearerToken }) => {
  try {
    let config = {};
    if (bearerToken) {
      config = { Authorization: `Bearer ${bearerToken}` };
    }
    console.log(config);
    const response = await API.post(url, values, { headers: config });
    showNotification({
      title: response.data.message,
      isSuccess: true,
    });
    return response.data;
  } catch (error) {
    showNotification({
      title: error.response.data.error,
      isSuccess: false,
    });
    return error.response.data;
  }
};

export const register = async (values) =>
  await makePOSTRequest({ url: "/register", values });

export const login = async (values) =>
  await makePOSTRequest({ url: "/login", values });

export const createProduct = async ({ values, bearerToken }) =>
  await makePOSTRequest({
    url: "/product",
    values,
    bearerToken,
  });

export const getProducts = async ({ bearerToken }) =>
  await makeGETRequest({ url: "/product", bearerToken });

export const getProduct = async ({ bearerToken, _id }) =>
  await makeGETRequest({ url: `/product/${_id}`, bearerToken });
