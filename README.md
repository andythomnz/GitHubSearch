# GitHub Search
Vue.js app which consumes GitHub's Search API for searching of users or topics.

Try the app here: https://vuejs-github-search.herokuapp.com/ 

Or run the app yourself by following instructions [here](/github-search/README.md).


## Tools Used

* Vue.js - I chose Vue because in my (limited) experience with the framework it is quicker to get started than Angular or React
* Vuetify - primarily utilised for UI components. I chose this over BootstrapVue because I thought their documentation was clearer on the topic of handling server-side pagination & sorting (which I planned to use) and due to prior experience with Google's Material UI
* Node.js + Express - to serve the deployed application on Heroku
* Heroku - Deployed to their free hobby tier for demo purposes
* Axios - for making HTTP requests. I chose Axios over fetch due to familiarity and its more succinct syntax 
* Moment - for easily converting timestamps into nicer human-friendly formats

## What Next?

I have summarised what I think could be improved about this app in a separate page [here](what-next.md)


## Screenshots

![desktop-search](https://github.com/andythomnz/GitHubSearch/raw/main/screenshots/desktop-1.png)

![desktop-search-results](https://github.com/andythomnz/GitHubSearch/raw/main/screenshots/desktop-2.png)

![mobile-view](https://github.com/andythomnz/GitHubSearch/raw/main/screenshots/mobile.png)