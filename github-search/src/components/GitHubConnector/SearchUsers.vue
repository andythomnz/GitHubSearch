<script>
import { getRequest } from "@/components/GitHubConnector/ApiConnector.vue";

const SEARCH_API_MAX_RESULTS = 1000;

export async function search(searchTerm, sortBy, page, perPage) {
  let response = await getRequest("/search/users", [
    `q=${searchTerm}+sort:${sortBy}`,
    `page=${page}`,
    `per_page=${perPage}`,
  ]);
  let users = normalizeData(response.data.items);
  let { total_count } = response.data;
  if (total_count > SEARCH_API_MAX_RESULTS) {
    total_count = SEARCH_API_MAX_RESULTS;
  }
  return {
    users,
    total_count,
  };
}

function normalizeData(data) {
  return data.map(normalizeUser);
}

function normalizeUser(user) {
  let { login, html_url, type, avatar_url } = user;
  return {
    login,
    html_url,
    type,
    avatar_url,
  };
}

export default {
  name: "SearchUsers",
  data() {
    return {};
  },
};
</script>