const fs = require('fs');
const requests = require('./apiReq.js');

const contentTypes = {
  css: 'text/css',
  js: 'application/js',
  ico: 'image/x-icon',
  html: 'text/html'
}

function handleSearch(req, res){
  let content = '';
  req.on('data' , (chunk) => {
    content += chunk;
  });
  req.on('end' , () => {
    requests.apiReq(content, (err , obj) => {
      // console.log('err' , err);
      // console.log('obj' , obj);
      if(err){
        console.log(err, 'ssssError');
        res.writeHead(302 , {'Location': '/404'});
        res.end();
      } else {
        requests.getRepos(content , (error , repos) => {
          if(error){
            console.log(error);
            res.writeHead(302 , {'Location': '/404'});
            res.end();
          }else {
            obj.repos = repos;
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
  var url = req.url;
  if (url=='/') {
    url = '/index.html';
  }
  fs.readFile(__dirname + "/../public" + url, (err, data) => {
    if(err){
      res.writeHead(302 , {'Location': '/404'});
      res.end();
    }
    else{
      let parts = url.split('.');
      let fileExtension = parts[parts.length - 1];
      res.writeHead(200 , {'Content-Type': contentTypes[fileExtension]});
      res.end(data);
    }
  });
}

module.exports = {
  handleSearch: handleSearch,
  handleNotFound: handleNotFound,
  handleGeneric: handleGeneric
}
