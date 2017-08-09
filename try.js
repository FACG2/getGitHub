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
