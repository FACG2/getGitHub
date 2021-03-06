const test = require('tape');
const myRepos = require('../public/js/index.js')
test('Generate repos. string test',function (t) {
  const input = [
                  {
                  	name:'test',
                  	desc:'test1',
                  	lang:'lang'
                  }
                ]
  const actual = myRepos(input);
  const expcted = '<div class="repoData">'+
                  '<a class="repoName" href="https://www.github.com/test" class="repoName" alt="test" target="_blank">test</a>'+
                  '<p class="repoDesc">test1</p>'+
                  '<p class="repoLang">Language : <span>lang</span></p></div>';
  t.deepEqual(actual,expcted,'test pass');
  t.end();
})
