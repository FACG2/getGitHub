
(()=>{
  dom();
})();

function dom() {

  var searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var userName = event.target.firstElementChild.value;
        apiReq(userName, function(data) {
          document.querySelector('.avatar img').setAttribute("src", data.avatar_url);
          document.querySelector('.names h1').textContent = data.name;
          document.querySelector('.names h6').textContent = data.login;
          document.querySelector('#company').textContent = data.company;
          document.querySelector('#location').textContent = data.location;
        });
      }
    }
  }

// Generate repos html as string
function myRepos(reposArray) {
  //return string with html needed to display repos
    var result = '';
    reposArray.forEach(function(repo) {
      result += '<div class="repoData">'+
                  '<p>Link : <a herf= class="repoName" src="'+repo.name+'" alt="">'+
                    '<p id="overView">'+repo.desc+'</p>'+
                    '<p id="repoLang">'+repo.lang+'</p>'+
              '</div>';
    }
    return result;
  }


//Return object of only the data needed in dom
function apiReq(userName , callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      var data = JSON.parse(this.responseText);
      callback(data);
    }
  }
  xhr.open('POST',"/search");
  xhr.send(userName);
}

module.exports = myRepos;
