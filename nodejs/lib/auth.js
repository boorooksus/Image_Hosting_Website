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
        var authStatusUi = `<a href="/auth/login">sign in</a>`;
        if(this.isLogined(request, response)){
            authStatusUi = `<a href="/auth/sign out">logout</a>`;
        }
        return authStatusUi;
    }
}