function gender(self, id) {
    if (self.style.color == 'white') {
        self.style.backgroundColor = 'rgb(216, 213, 213)';
        self.style.color = 'black';
    }
    else {
        self.style.backgroundColor = 'rgba(88, 39, 4, 0.575)';
        self.style.color = 'white';
    }
    let other = document.querySelector(id);
    other.style.backgroundColor = 'rgb(216, 213, 213)';
    other.style.color = 'black';
}

var Judge = Judge || {};
Judge.flag = false;
Judge.correct = function (self) {
    let password = self.value;
    let judgement = document.getElementById('judgement_1');
    if (password == "") {
        judgement.innerHTML = "비밀번호는 필수정보 입니다.";
        judgement.style.color = 'red';
        self.style.borderStyle = 'solid';
        self.style.borderWidth = '1px';
        self.style.borderColor = 'red';
        Judge.flag = false;
    }
    else {
        for (let i = 0; i < password.length; i++) {
            if (((password[i] >= 'a' && password[i] <= 'z') || (password[i] >= 'A' && password[i] <= 'Z') || (password[i] >= 0 && password[i] <= 9)) && password.length >= 10) {
                let isNum = false;
                if (password[i] >= 0 && password[i] <= 9)
                    isNum = true;
                if (isNum) {
                    judgement.innerHTML = "사용 할 수 있는 비밀번호 입니다.";
                    judgement.style.color = 'rgb(51, 204, 51)';
                    self.style.borderStyle = 'solid';
                    self.style.borderWidth = '1px';
                    self.style.borderColor = 'rgb(51, 204, 51)';
                    Judge.flag = true;
                }
                else {
                    judgement.innerHTML = "사용 할 수 없는 비밀번호 입니다.";
                    judgement.style.color = 'red';
                    self.style.borderStyle = 'solid';
                    self.style.borderWidth = '1px';
                    self.style.borderColor = 'red';
                    Judge.flag = false;
                }
            }
            else {
                judgement.innerHTML = "사용 할 수 없는 비밀번호 입니다.";
                judgement.style.color = 'red';
                self.style.borderStyle = 'solid';
                self.style.borderWidth = '1px';
                self.style.borderColor = 'red';
                Judge.flag = false;
            }
        }
    }
}
Judge.same = function (self) {
    let password = document.getElementById('password');
    let passCheck = document.getElementById('pass_check');
    let judgement = document.getElementById('judgement_2');
    if (passCheck.value == "") {
        judgement.innerHTML = "";
        self.style.borderStyle = 'solid';
        self.style.borderWidth = '0.5px';
        self.style.borderColor = 'gray';
    }
    else {
        if (Judge.flag) {
            if (password.value == self.value) {
                judgement.innerHTML = "비밀번호가 같습니다.";
                judgement.style.color = 'rgb(51, 204, 51)';
                self.style.borderStyle = 'solid';
                self.style.borderWidth = '1px';
                self.style.borderColor = 'rgb(51, 204, 51)';
            }
            else {
                judgement.innerHTML = "비밀번호가 다릅니다.";
                judgement.style.color = 'red';
                self.style.borderStyle = 'solid';
                self.style.borderWidth = '1px';
                self.style.borderColor = 'red';
            }
        }
        else
            judgement.innerHTML = "";
    }
}

Judge.blank = function () {
    let infoList = document.getElementsByClassName('text');
    for (let i = 0; i < infoList.length; i++) {
        if (infoList[i].value == "") {
            alert("입력되지 않은 정보가 있습니다.");
            infoList[i].scrollIntoView();
            return;
        }
    }
}

function removeBlur(self) {
    self.style.opacity = 0.9;
}

function blur(self) {
    self.style.opacity = 0.6;
}
