const tape = require('tape');
const shot = require('shot');
const router = require('./router.js');

tape('Home Route Test' , (t) => {
  shot.inject(router , {method: 'get' , url: "/"} , (res) => {
    t.equal(res.statusCode , 200 , "statusCode should equal 200");
    t.end();
  });
});


tape('Search Route Test' , (t) => {
  shot.inject(router , {method: 'post' , url: '/search'} , (res) => {
    t.equal( res.statusCode, 302 , 'should equal 302');
    t.end();
  });
});


tape('Not Found Route (/404) Test' , (t) => {
  shot.inject(router , {method: 'get' , url: '/404'} , (res) => {
    t.equal(res.statusCode , 404 , 'should equal 404');
    t.end();
  });
});

tape('Css Request Test' , (t) => {
  shot.inject(router , {method: 'get' , url: '/css/style.css'} , (res) => {
    t.equal(res.statusCode ,200 ,'should equal 200' );
    t.end();
  });
});

tape('JS Request Test' , (t) => {
    shot.inject(router , {method: 'get', url: '/js/index.js'} , (res) =>{
      t.equal(res.statusCode , 200 , 'should equal 200');
      t.end();
    });
});
