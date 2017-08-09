const handlers = require("./handlers.js");

function router(req, res){
  let url = req.url;

  if(url == "/search"){
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
