module.exports = {
    isLogined:function(request, response){
        if(request.session.is_logined){
            return true;
        }
        else{
            return false;
        }
    },

    statusUi:function(request, response){
        var authStatusUi = `
        <a href="/auth/login">sign in</a>
        <a href="/auth/join">sign up</a>
        `;
        if(this.isLogined(request, response)){
            authStatusUi = `
            <a href="/auth/logout">logout</a>
            <a href="/">${request.session.nickname}</a>
            `;
        }
        return authStatusUi;
    }
}