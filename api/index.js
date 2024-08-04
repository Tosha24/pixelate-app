import axios from "axios";
import { API_KEY } from "../env";

const MY_API_KEY = API_KEY;

const apiUrl = `https://pixabay.com/api/?key=${MY_API_KEY}`;


const formatUrl = (param) => {
  //{q, page, category, order}
  let url = apiUrl + "&per_page=25&safesearch=true&editor_choice=true";  // we create a url with the base url and some default parameters like per_page, safesearch, and editor_choice which are fixed for all requests.

  if (!param) return url;  // if we get no parameters (we are not searching for anything), we return the url with the default parameters.

  let paramKeys = Object.keys(param);  // with Object.keys(param) we get an array of the keys of the param object. In this case, the keys are q, page, category, and order.
  paramKeys.map((key) => {
    let value = key == "q" ? encodeURIComponent(param[key]) : param[key];  // we check if the key is q, if it is, we encode the value with encodeURIComponent to avoid errors with special characters like spaces. encodeURIComponent encodes means that it will convert spaces to %20, also it will convert special characters to their ASCII code, also it will convert characters like ñ to %F1, etc. if not, we just get the value.
    url += `&${key}=${value}`;
  });
  console.log("url: " + url);
  return url;
};

export const apiCall = async (param) => {
  try {
    const response = await axios.get(formatUrl(param));
    const { data } = response;
    return { success: true, data };
  } catch (error) {
    console.log("Something Went Wrong: ", error.message);
    return { success: false, error: error.message };
  }
};
