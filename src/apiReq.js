const request = require('request');
const env = require('env2')('.env');

function apiReq(username, cb){
  let obj = {};
  let arr = [];
  let path = 'https://api.github.com/users/' + username ;
  request({url: path , headers: {'user-agent': 'node.js'}}, (err, response , body) => {
    if(err) cb(err, {});
    else {
      let data = JSON.parse(body);
      if(data.message){
        return cb(Error('Error in Github Response: ' + data.message) , null);
      }
      obj = {
        name: data.name,
        login: data.login,
        avatar_url: data.avatar_url,
        company: data.company,
        location: data.location,
        followers: data.followers,
        following: data.following
      }
      cb(null, obj);
    }
  });
}

function getRepos(username , cb){
  let path = "https://api.github.com/users/" + username + "/repos";
  request({url: path , headers: {'user-agent': 'node.js'}} , (err, response , body) => {
    if(err) cb(err, []);
    else {
      let data = JSON.parse(body);
      let counter = 0;
      if(data.length <= 12) counter = data.length;
      else counter = 12;
      let arr = [];
      for(let i= 0 ;i < counter ; ++i)
        arr.push({name: data[i].full_name , desc: data[i].description, lang: data[i].language});
      cb(null , arr);
    }
  });
}

module.exports = {
  apiReq: apiReq,
  getRepos: getRepos
}
