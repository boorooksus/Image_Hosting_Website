module.exports = {
    html:function(list, authStatusUi, pageList){
        return `
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>browsing</title>
            <link rel="stylesheet" href="/css/reset.css">
            <link rel="stylesheet" href="/css/style.css">
            <link href="https://fonts.googleapis.com/css2?family=Monoton&family=Roboto+Mono:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
            <style>
              #columns{
                margin-top:50px;
                column-width:250px;
                column-gap: 15px;
              }
              #columns figure{
                display: inline-block;
                border:1px solid rgba(0,0,0,0.2);
                margin:0;
                margin-bottom: 15px;
                padding:10px;
                box-shadow: 2px 2px 5px rgba(0,0,0,0.5);;
              }
              #columns figure img{
                width:100%;
              }
              #columns figure figcaption{
                border-top:1px solid rgba(0,0,0,0.2);
                padding:10px;
                margin-top:11px;
              }

              #page_list{
                text-align: center;
              }

              #page_list li{
                display: inline;
                text-align: center;
                
              }
              .membership a{
                  color: black;
                  border: 1px solid black;
              }
            </style>
            </head>
            <body>
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