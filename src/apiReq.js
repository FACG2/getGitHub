const request = require('request');
const env = require('env2')('.env');

function apiReq(username, cb){
  let obj = {};
  let arr = [];
  let path = 'https://api.github.com/users/' + username + '?access_token='+process.env.TOKEN;
  //console.log('https://api.github.com/users/' + username + '?access_token='+process.env.TOKEN);
  request({url: path , headers: {'user-agent': 'node.js'}}, (err, response , body) => {
    if(err) cb(err, {});
    else {
      let data = JSON.parse(body);
      if(data.message){
        cb('Error' , null)
        return;
      }
      obj.name = data.name;
      obj.login = data.login;
      obj.avatar_url = data.avatar_url;
      obj.company = data.company;
      obj.location = data.location;
      obj.followers = data.followers;
      obj.following = data.following;
      cb(null, obj);
    }
  });
}

function getRepos(username , cb){
  let path = "https://api.github.com/users/" + username + "/repos"+ '?access_token='+process.env.TOKEN ;
  request({url: path , headers: {'user-agent': 'node.js'}} , (err, response , body) => {
    if(err) cb(err, []);
    else {
      let data = JSON.parse(body);
      let counter = 0;
      // console.log(data);
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
