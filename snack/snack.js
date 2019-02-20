//打开游戏
//进行游戏
var lose = document.getElementById('lose');
var loserscore = document.getElementById('loserscore');
var scoreBox = document.getElementById('score');
var conent = document.getElementById('content');
var starpage = document.getElementById('starpage');
var snackmove;
var startP = document.getElementById('startP');
var close = document.getElementById('close');
var starBtn = document.getElementById('starBtn')
var startGameBool = true;
var startPaushBool = true;
var speed = 200;
init();

function init() {
    //地图参数定义
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    this.mapDiv = content;
    //食物的属性
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;
    //蛇的属性
    this.snackW = 20;
    this.snackH = 20;
    this.snackBody = [
        [3, 1, 'head'],
        [2, 1, 'body'],
        [1, 1, 'body']
    ]
    this.direct = 'right';
    this.right = false;
    this.left = false;
    this.up = true;
    this.down = true;
    this.score = 0;
}

function starGame() {
    starpage.style.display = 'none'
    startP.style.display ='block';
    snack();
    startP.style.display = 'block'
    food();
}
bindEvent();
function food() {
    var food = document.createElement('div');
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.position = 'absolute';
    this.foodX = Math.floor(Math.random() * (this.mapW / 20))
    this.foodY = Math.floor(Math.random() * (this.mapH / 20))
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 + 'px';
    this.mapDiv.appendChild(food).setAttribute('class', 'food');
}

function snack() {
    for (var i = 0, len = snackBody.length; i < len; i++) {
        var snack = document.createElement('div');
        snack.style.width = this.snackW + 'px';
        snack.style.height = this.snackH + 'px';
        snack.style.position = 'absolute';
        snack.style.left = this.snackBody[i][0] * 20 + 'px';
        snack.style.top = this.snackBody[i][1] * 20 + 'px';
        snack.classList.add(this.snackBody[i][2]);
        this.mapDiv.appendChild(snack).classList.add('snack');
        switch (this.direct) {
            case 'right':
                break;
            case 'left':
                snack.style.transform = 'rotate(180deg)';
                break;
            case 'up':
                snack.style.transform = 'rotate(270deg)';
                break;
            case 'down':
                snack.style.transform = 'rotate(90deg)';   
                break;
            default:
                break;
        }
    }
}

function move() {
    for (var i = this.snackBody.length - 1; i > 0; i--) {
        this.snackBody[i][0] = this.snackBody[i - 1][0];
        this.snackBody[i][1] = this.snackBody[i - 1][1];
    }
    switch (this.direct) {
        case 'right':
            this.snackBody[0][0] += 1;
            break;
        case 'left':
            this.snackBody[0][0] -= 1;
            break;
        case 'up':
            this.snackBody[0][1] -= 1;
            break;
        case 'down':
            this.snackBody[0][1] += 1;
            break;
        default:
            break;
    }
    removeClass('snack');
    snack();
    if (this.snackBody[0][0] == this.foodX &&this.snackBody[0][1] == this.foodY) {
        var snackEndX = this.snackBody[this.snackBody.length - 1][0];
        var snackEndY = this.snackBody[this.snackBody.length - 1][1];
        switch (this.direct) {
            case 'right':
                this.snackBody.push([snackEndX + 1,snackEndY,'body']);
                break;
            case 'left':
                this.snackBody.push([snackEndX - 1 ,snackEndY,'body']);
                break;
            case 'up':
                this.snackBody.push([snackEndX,snackEndY - 1,'body']);
                break;
            case 'down':
                this.snackBody.push([snackEndX,snackEndY + 1,'body']);
                break;
            default:
                break;
        }; 
        this.score += 1;
        scoreBox.innerHTML = this.score;
        removeClass('food');
        food();
    }
    if (this.snackBody[0][0] < 0 || this.snackBody[0][0] > mapW/20){
        relodGame();
    }
    if (this.snackBody[0][1] < 0 || this.snackBody[0][1] > mapH/20){
        relodGame();
    }
    snackHX = this.snackBody[0][0];
    snackHY = this.snackBody[0][1];
   for (var i =1; i < snackBody.length; i++) {
        if (snackHX == snackBody[i][0] && snackHY == snackBody[i][1]){
            relodGame();
        }  
   }
}
function relodGame(){
    removeClass('snake');
    removeClass('food');
    clearInterval(snackmove);
    this.snackBody = [
        [3, 1, 'head'],
        [2, 1, 'body'],
        [1, 1, 'body']
    ]
    this.direct = 'right';
    this.right = false;
    this.left = false;
    this.up = true;
    this.down = true;
    startGameBool = true;
    startPaushBool = true;
    lose.style.display = 'block';
    loserscore.innerHTML = this.score;
    this.score = 0;
    scoreBox.innerHTML = this.score;
    startP.setAttribute('str','start.png');
}

function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0]);
    }

}

function setDerict(code) {
    switch (code) {
        case 37:
            if (this.left) {
                this.direct = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 38:
            if (this.up) {
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 39:
            if (this.right) {
                this.direct = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 40:
            if (this.down) {
                this.direct = 'down'; 
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        default:
            break;
    }

}

function bindEvent() {
    close.onclick = function(){
        lose.style.display = 'none';
    }
    starBtn.onclick = function(){
        startAndPush();
    }
    startP.onclick = function(){
        startAndPush();
    }
}
function startAndPush(){
    if(startPaushBool){
        if(startGameBool){
            starGame();
            startGameBool =  false;
        }
        startP.setAttribute('src','pause.png');
        document.onkeydown = function (e) {
            var code = e.keyCode;
            setDerict(code);
        }
        snackmove = setInterval(function () {
            move();
        },speed);
        startPaushBool = false;

    }  else{
        startP.setAttribute('src','start.png');
        clearInterval(snackmove);
        document.onkeydown =  function(e){
            e.returnValue = false;
            return false;
        };
        startGameBool = true;
        startPaushBool = true;
    } 
}
