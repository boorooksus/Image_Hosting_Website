module.exports = {
    html:function(list, authStatusUi, pageList, term){
        return `
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>web_14</title>
            <link rel="stylesheet" href="/css/reset.css">
            <link rel="stylesheet" href="/css/style.css">
            <link rel="stylesheet" href="/css/style-template.css">
            <link href="https://fonts.googleapis.com/css2?family=Monoton&family=Roboto+Mono:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
            <script src="https://kit.fontawesome.com/8efa19c011.js" crossorigin="anonymous"></script>
            </head>
            <body>
                <div class="membership2">
                <a href="/"><i class="fas fa-home"></i></a>
                <a href="/topic/create"><i class="fas fa-plus"></i></a>
                </div>

                <div class="contents">
                <div class="contents_searching">
                <form action="/topic/search/1" method="post">
                  <input type="text" name="term" placeholder="${term}">
                  <button>검색</button>
                </form>
                </div>
                </div>

                <div class="membership">
                ${authStatusUi}
                </div>
  
              ${list}
              ${pageList}
            </body>
        </html>
    `;
    }
}