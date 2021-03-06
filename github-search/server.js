var express = require('express');
var history = require('connect-history-api-fallback');
var app = express();

// Middleware for serving '/dist' directory
const staticFileMiddleware = express.static('dist');

// 1st call for unredirected requests 
app.use(staticFileMiddleware);

// Support history api 
app.use(history({
  index: '/dist/index.html'
}));

// 2nd call for redirected requests
app.use(staticFileMiddleware);

const port = process.env.PORT || 8080
app.listen(port);

console.log(`Listening on port ${port}!`);