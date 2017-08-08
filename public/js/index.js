

(()=>{
  dom();
})()

function dom() {

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
