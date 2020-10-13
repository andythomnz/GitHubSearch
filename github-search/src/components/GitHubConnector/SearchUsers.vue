<script>
import { getRequest } from "@/components/GitHubConnector/ApiConnector.vue";

export async function search(searchTerm, sortBy, page) {
  //check args are not undefined

  let useArgs = `Search Term: ${searchTerm}, Sort: ${sortBy}, Page: ${page}`;
  console.log(useArgs);
  let response = await getRequest("/search/users",[`q=${searchTerm}+sort:${sortBy}`,`page=${page}`]);
  console.log("Response is: ");
  console.log(response);
  let users = normalizeData(response.data.items);
  return users;
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
    avatar_url
  };
}

export default {
  name: "SearchUsers",
  data() {
    return {
      foo: "bar",
    };
  },
};
</script>