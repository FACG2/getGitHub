const fs = require('fs');
const requests = require('./apiReq.js');

const contentTypes = {
  css: 'text/css',
  js: 'application/js',
  ico: 'image/x-icon'
}

function handleHome(req, res){
  fs.readFile(__dirname + "/../public/index.html" , (err, data) => {
    if(err){
      res.writeHead(500 , {'Content-Type': 'text/html'});
      res.end('<h1>Internal Server Error</h1>');
    }else{
      res.writeHead(200 , {'Content-Type': 'text/html'});
      res.end(data);
    }
  });
}

function handleSearch(req, res){
    let content = '';
    let out = {};
    req.on('data' , (chunk) => {
      content += chunk;
    });

    req.on('end' , () => {
      let username = content.split('=')[1];
      let arr = [];
        requests.apiReq(username, (err , obj) => {
          if(err){
            console.log(err, 'Error');
          }
          else {
            requests.getRepos(username , (error , repos) => {
              if(error){
                console.log(error);
              }else {
                obj.repos = repos;
                res.writeHead(302 , {'Location': '/'});
                res.end(JSON.stringify(obj));
              }
            });
          }
      });
    });
}

function handleNotFound(req, res){
  res.writeHead(404 , {'Content-Type': 'text/html'});
  res.end('<h1>404 Page Not Found</h1>');
}

function handleGeneric(req, res){
  fs.readFile(__dirname + "/../public" + req.url, (err, data) => {
    if(err){
      res.writeHead(302 , {'Location': '/404'});
      res.end();
    }
    else{
      let parts = req.url.split('.');
      let fileExtension = parts[parts.length - 1];
      res.writeHead(200 , {'Content-Type': contentTypes[fileExtension]});
      res.end(data);
    }
  });
}

module.exports = {
  handleHome: handleHome,
  handleSearch: handleSearch,
  handleNotFound: handleNotFound,
  handleGeneric: handleGeneric
}
