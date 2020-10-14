# What Next?

This is a non-exhaustive brain-dump of some ideas for improvement I've had but not yet implemented... 

1. I used a `v-card` component to utilise its loading animation while the data was loading. Later, I realised the `v-data-table` component has its own built-in loading spinner. It would probably make sense to switch to that.
1. I added a drop-down selector for users to select a Sort By parameter as this was fast and easy. This could be replaced by using the table-header row as buttons for sorting by column. 
1. While the frontend is awaiting a data response from the GitHub API it displays a loading animation. It could be made nicer if the loading animation waited for user's profile avatars to be downloaded.
1. Routing could be improved. 
   * I used history mode to avoid an unsightly '#' in the URL, however this requires proper server configuration which I did not yet achieve with heroku. As a result, if users manually enter custom routes other than the root, they may encounter an error. 
   * Functionality of the browser back/forward buttons could be improved.
   * Path parameters should be implemented in the page URL (e.g. myapp.com/user-results?q=andythomnz&sort=name) so that a user could copy & paste the URL to share with a friend or to bookmark the page. 
1. In some areas the method of achieving my desired layout was less than ideal due to unfamiliarity with Vuetify. E.g. there are a couple of blank spaces created artificially with `<br>` which should definitely be fixed. 
1. I did encounter the Vue.js Style Guide while Googling but due to time restraints have not closely checked my style against their recommendation. 
1. From an architecture point of view, there is room for improvement...
   * In hindsight, the `TopicResults` and `UserResults` views have a lot of overlapping code. I originally thought they wouldn't be so similar. They should probably be refactored to reduce code duplication. Extracting the search results table into its own Component would probably be wise. 
   * The Search Box input on the Home page should have been its own component. Then I could have also included a copy of the Search Box above the search results (like Google does).
   * Researching conventional architectures in Vue would also help, as I designed this having little previous experience in Vue. Again, the official Style Guide would likely help too.
1. One point regarding the GitHub API. The `/topics` endpoint of their Search API is only in Developer Preview status:
   * Its design may change and this app could need to be updated to reflect that
   * Most endpoints of the API implement server-side pagination & sorting. As a result, I designed this frontend application to utilise that. Unfortunately the `/topics` endpoint does not yet support server-side sorting. As individual pages of data are retrieved they are sorted by the client-side prior to display. I reached this compromise because I think thorough client-side sorting of this data is not feasible. Firstly, because only a limited number of free unauthenticated requests are allowed, it would not be possible to retrieve ALL of the data to the front-end. Secondly, even if you retrieved all of the data, sorting it on the frontend would be inefficient due to its large size and could overwhelm low-powered devices like smartphones.
2. A CI / CD pipeline to automate the deploy process to Heroku would be nice
3. Testing.... 

![testing-meme](https://github.com/andythomnz/GitHubSearch/raw/main/screenshots/tests-meme.jpeg)



