<script>
import { getRequest } from "@/components/GitHubConnector/ApiConnector.vue";

const SEARCH_API_MAX_RESULTS = 1000;

export async function search(searchTerm, sortBy, page, perPage, featuredOnly) {
  //check args are not undefined

  let query = searchTerm;
  if (featuredOnly) {
    query += "+is:featured";
  }

  let response = await getRequest(
    "/search/topics",
    [`q=${query}`, `page=${page}`, `per_page=${perPage}`],
    [{key: "Accept", value: "application/vnd.github.mercy-preview+json"}]
  );
  let topics = normalizeData(response.data.items, sortBy);
  let { total_count } = response.data;
  if (total_count > SEARCH_API_MAX_RESULTS) {
    total_count = SEARCH_API_MAX_RESULTS;
  }
  return {
    topics,
    total_count,
  };
}

function normalizeData(data, sortBy) {
  let sortedData = sortResults(data, sortBy);
  return sortedData.map(normalizeTopic);
}

function normalizeTopic(topic) {
  let { name, display_name, short_description, created_at, featured } = topic;

  if (featured) {
    featured = "Yes";
  } else {
    featured = "No";
  }

  if (display_name == null) {
    display_name = name;
  }

  return {
    display_name,
    short_description,
    created_at,
    featured,
  };
}

function sortResults(data, sortBy) {
  if (sortBy === "name") {
    return data.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortBy === "created_at") {
    return data.sort((a, b) => b.created_at.localeCompare(a.created_at));
  }
  
}

export default {
  name: "SearchTopics",
  data() {
    return {};
  },
};
</script>