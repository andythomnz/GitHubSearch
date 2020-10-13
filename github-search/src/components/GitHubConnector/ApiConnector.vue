<script>
import axios from "axios";

const PROTOCOL = "https";
const DOMAIN = "api.github.com";
const RESULTS_PER_PAGE = 10;

// Paramaters added to every request
const GLOBAL_PARAMS = [`per_page=${RESULTS_PER_PAGE}`];

export async function getRequest(endpoint, params) {
  if (!endpoint) {
    return {};
  }

  let baseURL = `${PROTOCOL}://${DOMAIN}${endpoint}`;

  let req_params = [...GLOBAL_PARAMS];
  if (params && params.length > 0) {
    req_params = [...params, ...GLOBAL_PARAMS];
  }
  baseURL += "?";
  req_params.forEach((parameter) => {
    baseURL += parameter + "&";
  });
  baseURL = baseURL.slice(0, -1); //remove trailing '&' character

  console.log(`Request URL is: ${baseURL}`);
  return await axios.get(baseURL);
}


export default {
  name: "ApiConnector",
};
</script>