/*
3 routes to use
/ route
/search for searching in github
/generic for css img js html
*/
const handlers = require("./handlers.js");

function router(req, res){
  let url = req.url;
  if(url == "/"){
    handlers.handleHome(req, res);
  }
  else if(url == "/search"){
    handlers.handleSearch(req, res);
  }
  else if(url == '/404'){
    handlers.handleNotFound(req, res);
  }
  else{
    handlers.handleGeneric(req, res);
  }
}

module.exports = router;
