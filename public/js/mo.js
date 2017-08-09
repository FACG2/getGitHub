function myRepos(reposArray) {
  //return string with html needed to display repos
  console.log(reposArray);
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

  module.exports=myRepos
