<<<<<<< HEAD

=======
>>>>>>> d166bc84caca9b511535057b984b9130e9cc2a92
(()=>{
  dom();
})();

function dom() {
<<<<<<< HEAD

  var searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var userName = event.target.firstElementChild.value;
        apiReq(userName, function(data) {
=======
  if (typeof document != 'undefined') {
    var searchForm = document.getElementById('searchForm');
    if (searchForm) {
      searchForm.addEventListener('submit', function(event){
        event.preventDefault();
        var userName = event.target.firstElementChild.value;
        apiReq(userName , function(data){
>>>>>>> d166bc84caca9b511535057b984b9130e9cc2a92
          document.querySelector('.avatar img').setAttribute("src", data.avatar_url);
          document.querySelector('.names h1').textContent = data.name;
          document.querySelector('.names h6').textContent = data.login;
          document.querySelector('#company').textContent = data.company;
          document.querySelector('#location').textContent = data.location;
<<<<<<< HEAD
        });
      }
    }
  }
=======
          document.querySelector('#followersNumber span').textContent = data.followers;
          document.querySelector('#followingNumber span').textContent = data.following;
          document.querySelector('.listRepos').innerHTML = myRepos(data.repos);
        });
  	  });
    }
  }
}
>>>>>>> d166bc84caca9b511535057b984b9130e9cc2a92

// Generate repos html as string
function myRepos(reposArray) {
  //return string with html needed to display repos
    var result = '';
    reposArray.forEach(function(repo) {
      result += '<div class="repoData">'+
                  '<a class="repoName" href="https://www.github.com/'+repo.name+'" class="repoName" alt="'+repo.name+'" target="_blank">'+repo.name+'</a>'+
                    '<p class="repoDesc">'+repo.desc+'</p>'+
                    '<p class="repoLang">Language : <span>'+repo.lang+'</span></p>'+
              '</div>';
    });
    return result;
  }

function apiReq(userName , callback) {
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              var myJSONRemote = JSON.parse(this.responseText);
              callback(myJSONRemote);
        }
      }
        xhttp.open("POST", "/search", true);
        xhttp.send(userName);

}
if (typeof module != 'undefined' ) {
  module.exports = myRepos;
}

module.exports = myRepos;
