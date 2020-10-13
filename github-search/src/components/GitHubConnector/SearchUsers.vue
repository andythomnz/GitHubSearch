<script>
export async function search(searchTerm, sortBy, perPage, page) {
  //check args are not undefined

  let useArgs = `Search Term: ${searchTerm}, Sort: ${sortBy}, PerPage: ${perPage}, Page: ${page}`;
  console.log(useArgs);
  let response = await requestFromEndpoint();
  let users = normalizeData(response.data.items);
  return users;
}

async function requestFromEndpoint() {
  return {
    data: {
      total_count: 1,
      incomplete_results: false,
      items: [
        {
          login: "andythomnz",
          html_url: "https://github.com/users/andythomnz",
          type: "User",
          avatar_url: "https://avatars2.githubusercontent.com/u/10441834?v=4",
          something: "somethingElse",
        },
      ],
    },
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