class Main {
  constructor() {
    this.loading = true;
    this.initTheme();
    this.initBlog();
  }

  initTheme() {
    var sunButtonRef = document.querySelector('#set-light');
    var moonButtonRef = document.querySelector('#set-dark');
    var bodyRef = document.querySelector('body');

    sunButtonRef.addEventListener('click', function () {
      bodyRef.classList.add('light');
      bodyRef.classList.remove('dark');
      window.localStorage.setItem('theme', 'light');
    });

    moonButtonRef.addEventListener('click', function () {
      bodyRef.classList.add('dark');
      bodyRef.classList.remove('light');
      window.localStorage.setItem('theme', 'dark');
    });

    switch (window.localStorage.getItem('theme')) {
      case 'dark':
        moonButtonRef.click();
        break;
      case 'light':
      default:
        sunButtonRef.click();
        break;
    }
  }

  initBlog() {
    this.loading = true;
    var request = new XMLHttpRequest();

    request.addEventListener('load', function (response) {
      var articleListRef = document.querySelector('#blog ul');
      var articles = JSON.parse(response.target.response);

      if (articles.length) {
        for (let article of articles.slice(0, 5)) {
          var liElement = document.createElement('li');
          var articleAnchorElement = document.createElement('a');
          articleAnchorElement.href = article.url;
          articleAnchorElement.innerText = article.title;
          articleAnchorElement.target = '_blank';
          liElement.appendChild(articleAnchorElement);
          articleListRef.appendChild(liElement);
        }
      } else {
        var liElement = document.createElement('li');
        liElement.innerText = 'I have not written any article yet ¯\\_(ツ)_/¯';
        articleListRef.appendChild(liElement);
      }
    });

    request.open('GET', 'https://dev.to/api/articles?username=alberto');

    request.send();
  }
}

new Main();
