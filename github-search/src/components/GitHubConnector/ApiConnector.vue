<script>
import axios from "axios";

const PROTOCOL = "https";
const DOMAIN = "api.github.com";

export async function getRequest(endpoint, params) {
  if (!endpoint) {
    return {};
  }

  let baseURL = `${PROTOCOL}://${DOMAIN}${endpoint}`;

  if (params && params.length > 0) {
    baseURL += "?";
    params.forEach((parameter) => {
      baseURL += parameter + "&";
    });
    baseURL = baseURL.slice(0, -1); //remove trailing '&' character
  }
  
  return await axios.get(baseURL);
}

export default {
  name: "ApiConnector",
};
</script>