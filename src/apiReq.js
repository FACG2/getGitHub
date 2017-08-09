const request = require('request');
const env = require('env2')('.env');

function apiReq(username, cb){
  let obj = {};
  let arr = [];
  let path = 'https://api.github.com/users/' + username + '?access_token='+process.env.TOKEN;
  request({url: path , headers: {'user-agent': 'node.js'}}, (err, response , body) => {
    if(err) cb(err, {});
    else {
      let data = JSON.parse(body);
      obj.name = data.name;
      obj.username = data.login;
      obj.company = data.company;
      obj.location = data.location;
      obj.followers = data.followers;
      obj.following = data.following;
      cb(null, obj);
    }
  });
}

function getRepos(username , cb){
  let path = "https://api.github.com/users/" + username + "/repos?access_token="+process.env.TOKEN;
  request({url: path , headers: {'user-agent': 'node.js'}} , (err, response , body) => {
    if(err) cb(err, []);
    else {
      let data = JSON.parse(body);
      let counter = 0;
      if(data.length <= 6) counter = data.length;
      else counter = 6;
      let arr = [];
      for(let i= 0 ;i < counter ; ++i)
        arr.push({fullname: data[i].full_name , description: data[i].description, language: data[i].language});
      cb(null , arr);
    }
  });
}

module.exports = {
  apiReq: apiReq,
  getRepos: getRepos
}
