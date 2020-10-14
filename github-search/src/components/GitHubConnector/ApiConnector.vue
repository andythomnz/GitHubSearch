<script>
import axios from "axios";

const PROTOCOL = "https";
const DOMAIN = "api.github.com";

export async function getRequest(endpoint, params, headers) {
  if (endpoint === undefined) {
    return {};
  }

  let baseURL = `${PROTOCOL}://${DOMAIN}${endpoint}`;

  if (params !== undefined && params.length > 0) {
    baseURL += "?";
    params.forEach((parameter) => {
      baseURL += parameter + "&";
    });
    baseURL = baseURL.slice(0, -1); //remove trailing '&' character
  }

  let requestContent = {
    headers: {},
  };

  if (headers !== undefined && headers.length > 0) {
    headers.forEach((header) => {
      if (header.key && header.value) {
        requestContent.headers[header.key] = header.value;
      }
    });
  }

  try {
    return await axios.get(baseURL, requestContent);
  } catch (err) {
    console.error("API Connector error");
    console.error(err);
    if (
      err.response.status === 403 &&
      err.response.statusText === "rate limit exceeded"
    ) {
      throw {
        error: new Error(),
        name: "Rate Limit Exceeded",
        description:
          "A maximum of 10 unauthenticated requests to the GitHub Search REST API are allowed per minute. Please try again later.",
        reference:
          "https://docs.github.com/en/free-pro-team@latest/rest/reference/search#rate-limit",
      };
    } else if (err.response) {
      throw {
        error: new Error(),
        name: "Request Denied",
        description: "The GitHub API denied the request.",
      };
    } else if (err.request) {
      throw {
        error: new Error(),
        name: "Service Unavailable",
        description:
          "The GitHub API is not responding. Please try again later.",
      };
    } else {
      throw {
        error: new Error(),
        name: "Unknown Error",
        description:
          "An unexpected error occurred. Please contact an administrator.",
      };
    }
  }
}

export default {
  name: "ApiConnector",
};
</script>