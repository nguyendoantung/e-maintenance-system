/* eslint-disable import/no-cycle */
import axios from "axios";
// import * as apiLogin from './auth'

/**
 * Get token from state
 * @returns {string|*}
 */
export function getToken(tokenType) {
  try {
    const state = localStorage.getItem(tokenType);
    return state;
  } catch (e) {
    return "none";
  }
}

/**
 *
 * @type {{headers: {"Content-Type": string}}}
 */
const defaultOptions = {
  baseURL: process.env.REACT_APP_URL_API,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${getToken("token")}`,
  },
  timeout: 200000,
};

/**
 *
 * @type {Object}
 */
const rootApi = axios.create(defaultOptions);

rootApi.interceptors.request.use(function (config) {
  let token = localStorage.getItem("token");
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});

export default rootApi;
