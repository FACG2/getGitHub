const handlers = require("./handlers.js");

function router(req, res){
  let url = req.url;

  if(url == "/search"){
    handlers.handleSearch(req, res);
  }
  else if(url == '/404'){
    handlers.handleNotFound(req, res);
  }
  // else if(url.startsWith('/:')){
  //   res.writeHead(200 , {'Content-Type': 'text/html'});
  //   let username = url.split("/:")[1];
  //   if(username.includes('/')){
  //     res.end('<h1>Username Not Found</h1>');
  //   }
  //   else if()
  //   else {
  //     req.username = username;
  //     // handlers.handleSearch(req, res);
  //     res.end('<h1>Username ' + username + ' is found</h1>');
  //   }
  // }
  else{
    console.log('1',req.url);
    if (url.includes('.') || url === '/') {
      console.log('2222',req.url);
        handlers.handleGeneric(req, res);
    }else{
      req.username = req.url.slice(1);
      handlers.handleSearch(req, res);
    }
    console.log(req.url);

  }
}

module.exports = router;
