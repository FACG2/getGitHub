const fs = require('fs');
const apiReq = require('./apiReq');

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

    req.on('data' , (chunk) => {
      content += chunk;
    });

    req.on('end' , () => {
      // let word = content.split('=')[1];
      // apiReq(word);
      console.log(content);
    });

    res.writeHead(302 , {'Location': '/'});
    res.end();
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
