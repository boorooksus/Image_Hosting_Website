function gender(self, id)
{
    if (self.style.color == 'white')
    {
        self.style.backgroundColor = 'rgb(216, 213, 213)';
        self.style.color = 'black';
    }
    else{
        self.style.backgroundColor = 'rgba(88, 39, 4, 0.575)';
        self.style.color = 'white';
    }
    var other = document.querySelector(id);
    other.style.backgroundColor = 'rgb(216, 213, 213)';
    other.style.color = 'black';
}

var flag = false;
function correct(self){
    var password = self.value;
    var judgement = document.getElementById('judgement_1');
    for (var i = 0; i < password.length; i++)
    {
        if (((password[i] >= 'a' && password[i] <= 'z') || (password[i] >= 'A' && password[i] <= 'Z') || (password[i] >= 0 && password[i] <= 9)) && password.length >= 10)
        {
            judgement.innerHTML = "사용 할 수 있는 비밀번호 입니다.";
            flag = true;
        }
        else
        {
            judgement.innerHTML = "사용 할 수 없는 비밀번호 입니다.";
            flag = false;
        }
    }
}

function same(self)
{
    var password = document.getElementById('password');
    var judgement = document.getElementById('judgement_2');
    if (flag)
    {
        if (password.value == self.value)
            judgement.innerHTML = "비밀번호가 같습니다.";
        else
            judgement.innerHTML = "비밀번호가 다릅니다.";
    }
}
