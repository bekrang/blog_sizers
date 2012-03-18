//From : http://stackoverflow.com/questions/4579757/how-do-i-create-a-http-client-request-with-a-cookie

// NB:- node's http client API has changed since this was written
// this code is for 0.4.x
// for 0.6.5+ see http://nodejs.org/docs/v0.6.5/api/http.html#http.request

var http = require('http');

var data = JSON.stringify({ 'important': 'data' });
var cookie = 'something=anything'

var client = http.createClient(80, 'www.example.com');

var headers = {
    'Host': 'www.example.com',
    'Cookie': cookie,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data,'utf8')
};

var request = client.request('POST', '/', headers);

// listening to the response is optional, I suppose
request.on('response', function(response) {
  response.on('data', function(chunk) {
    // do what you do
  });
  response.on('end', function() {
    // do what you do
  });
});
// you'd also want to listen for errors in production

request.write(data);

request.end();
