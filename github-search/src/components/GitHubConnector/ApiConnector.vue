<script>
import axios from "axios";

const PROTOCOL = "https";
const DOMAIN = "api.github.com";

export async function getRequest(endpoint, params, headers) {
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

  let requestContent = {
    headers: {},
  };

  if (headers && headers.length > 0) {
    headers.forEach((header) => {
      if (header.key && header.value) {
        requestContent.headers[header.key] = header.value;
      }
    });
  }

  return await axios.get(baseURL,requestContent);
}

export default {
  name: "ApiConnector",
};
</script>