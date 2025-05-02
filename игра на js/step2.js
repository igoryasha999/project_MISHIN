//какие-то коробки =)
var bg = new Image();
var fg = new Image();
var fg1 = new Image();
var fg2 = new Image();
var fg3 = new Image();
var lava = new Image();
var pipeBottom = new Image();

//расположение фото в папке img
bg.src = "img/img/bg.png";
fg.src = "img/img/fg.png";
fg1.src = "img/img/fg1.png";
fg2.src = "img/img/fg2.png";
fg3.src = "img/img/fg3.png";
lava.src = "img/img/lava.png";
pipeBottom.src = "img/img/pipeBottom.png";

var gap = 90;

var GAME = {
    width: 1900,
    height: 850,
}

var HERO = {
    img: new Image(),
    x: 0,
    y: 700,
    width: 75,
    height: 80,
    xDirection: 20,
    yDirection: 110,
}

var lava = {
    img: new Image(),
    x: 963,
    y: 682,
    width: 448,
    height: 100,
}


var pipeBottom = {
    img: new Image(),
    x: 515,
    y: 670,
    width: 448,
    height: 112,
}

var pipeBottom1 = {
    img: new Image(),
    x: 627,
    y: 558,
    width: 448,
    height: 112,
}

var pipeBottom2 = {
    img: new Image(),
    x: 739,
    y: 446,
    width: 112,
    height: 112,
}

var pipeBottom3 = {
    img: new Image(),
    x: 1525,
    y: 559,
    width: 112,
    height: 112,
}

var pipeBottom4 = {
    img: new Image(),
    x: 1411,
    y: 112,
    width: 224,
    height: 112,
}


var pipeBottom5 = {
    img: new Image(),
    x: 1411,
    y: 670,
    width: 336,
    height: 112,
}

var pipeBottom6 = {
    img: new Image(),
    x: 1000,
    y: 0,
    width: 784,
    height: 112,
}

var PIPES_BOTTOM = [
    pipeBottom,
    pipeBottom1,
    pipeBottom2,
    pipeBottom3,
    pipeBottom4,
    pipeBottom5,
    pipeBottom6,
]

var fg = {
    img: new Image(),
    x: 0,
    y: -70,
    width: 1745,
    height: 1000,
}

var fg1 = {
    img: new Image(),
    x: 1745,
    y: -70,
    width: 1745,
    height: 1000,
}

var fg2 = {
    img: new Image(),
    x: 0,
    y: 78,
    width: 1745,
    height: 1000,
}

var fg3 = {
    img: new Image(),
    x: 1745,
    y: 78,
    width: 1745,
    height: 1000,
}

var JUMP = {
    state: false,
    yInit: 0,
    yDirection: -10,
    yStep: 1,
}

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

var keyState = {};    
window.addEventListener('keydown',function(event){
    keyState[event.keyCode || event.which] = true;
},true);    
window.addEventListener('keyup',function(event){
    keyState[event.keyCode || event.which] = false;
},true);

x = 100;

function gameLoop() {
    if (keyState[37] || keyState[65]){
        HERO.x -= 5;
    }    
    if (keyState[39] || keyState[68]){
        HERO.x += 5;
    }

    setTimeout(gameLoop, 10);
}    
gameLoop();

function startJump() {
    JUMP.state = true
    JUMP.yInit = HERO.y
    JUMP.yDirection = -15
    JUMP.yStep = 0.5
}

function initEventsListeners() {
    document.addEventListener("keydown", onCanvasKeyDown);
}

function onCanvasKeyDown(event) {
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'ц') {
        if (!JUMP.state) {
            startJump()
        }
    }
    clampHeroPosition()
}

function updateJump() {
    if (JUMP.state) {
        HERO.y += JUMP.yDirection
        JUMP.yDirection += JUMP.yStep
        if (HERO.y >= JUMP.yInit) {
            JUMP.state = false
        }
    }
}

function clampHeroPosition() {
    if (HERO.x < 0) {
        HERO.x = 0;
    }

    if (HERO.y < 0) {
        HERO.y = 0;
    }

    if (HERO.y > 700) {
        HERO.y = 700;
    }

    if (HERO.x + HERO.width > GAME.width) {
        HERO.x = GAME.width - HERO.width;
    }

    if (HERO.y + HERO.height > GAME.height) {
        HERO.y = GAME.height - HERO.height;
    }

    if (HERO.x >= 1820) {
        window.location.href = 'step3.html';
    }
}

function updatelava(){
    var lavaTopLineCollision = HERO.y + HERO.height > lava.y;
    var lavaLeftLineCollision = HERO.x + HERO.width > lava.x;
    var lavaRightLineCollision = HERO.y - HERO.height < lava.y + lava.height;
    var lavaBottomLineCollision = HERO.x - HERO.width < lava.x + lava.width;
    if (lavaTopLineCollision && lavaLeftLineCollision && lavaRightLineCollision &&lavaBottomLineCollision){
        HERO.x = 0;
        HERO.y = 700;
}
}

function updateHero() {
    if (!JUMP.state) {
        HERO.y += HERO.yDirection
    }
    HERO.yDirection = 10
    if (HERO.y >= 700) {
        HERO.yDirection = 0 
        HERO.y = 700
    }
    PIPES_BOTTOM.forEach(pipeBottom => {
        var pipeBottomTopCollision = HERO.y + HERO.height > pipeBottom.y && HERO.y < pipeBottom.y && HERO.x + HERO.width > pipeBottom.x && HERO.x < pipeBottom.x + pipeBottom.width
        if (pipeBottomTopCollision) {
            JUMP.state = false
            HERO.y = pipeBottom.y - HERO.height
            HERO.yDirection = 0
        }

        var pipeBottomLeftCollision = HERO.x + HERO.width > pipeBottom.x && HERO.x < pipeBottom.x && HERO.y + HERO.height > pipeBottom.y && HERO.y < pipeBottom.y + pipeBottom.height
        if (pipeBottomLeftCollision) {
            HERO.x = pipeBottom.x - HERO.width
        }

        var pipeBottomRightCollision = HERO.x < pipeBottom.x + pipeBottom.width && HERO.x + HERO.width > pipeBottom.x + pipeBottom.width && HERO.y + HERO.height > pipeBottom.y && HERO.y < pipeBottom.y + pipeBottom.height
        if (pipeBottomRightCollision) {
            HERO.x = pipeBottom.x + pipeBottom.width
        }

        var pipeBottombottomCollision = HERO.y + HERO.height > pipeBottom.y + pipeBottom.height && HERO.y < pipeBottom.y + pipeBottom.height && HERO.x + HERO.width > pipeBottom.x && HERO.x < pipeBottom.x + pipeBottom.width
        if (pipeBottombottomCollision) {
            HERO.y = pipeBottom.x + pipeBottom.width
            HERO.yDirection = -JUMP.yDirection
        }

        // Оказался внутри блока -> поднимаем его на блок
        var topCollision = HERO.y + HERO.height > pipeBottom.y; // + 112
        var leftCollision = HERO.x + HERO.width > pipeBottom.x; // + 448
        var rightCollision = HERO.x + HERO.width < pipeBottom.x + pipeBottom.width; // - 112
        var bottomCollision = HERO.y < pipeBottom.y + pipeBottom.height; // - 112
        if (topCollision && leftCollision && rightCollision && bottomCollision) {
            HERO.y = pipeBottom.y - HERO.height
        }
    })
}

//создание блока


function draw() {
    drawBackground()
    drawHero()
    drawlava()
    drawPipesBottom()
    drawfg()
    drawfg1()
    drawfg2()
    drawfg3()
}

//вставляем картинки игры
function drawBackground() {
    canvasContext.drawImage(bg, 0, 0);
}

function drawHero() {
    canvasContext.drawImage(HERO.img, HERO.x, HERO.y, HERO.width, HERO.height)
}

function drawPipesBottom() {
    PIPES_BOTTOM.forEach(pipeBottom => {
        canvasContext.drawImage(pipeBottom.img, pipeBottom.x, pipeBottom.y, pipeBottom.width, pipeBottom.height)
    })
}

function drawfg() {
    canvasContext.drawImage(fg.img, fg.x, fg.y, fg.width, fg.height)
}

function drawfg1() {
    canvasContext.drawImage(fg1.img, fg1.x, fg1.y, fg1.width, fg1.height)
}

function drawfg2() {
    canvasContext.drawImage(fg2.img, fg2.x, fg2.y, fg2.width, fg2.height)
}

function drawfg3() {
    canvasContext.drawImage(fg3.img, fg3.x, fg3.y, fg3.width, fg3.height)
}

function drawlava() {
    canvasContext.drawImage(lava.img, lava.x, lava.y, lava.width, lava.height)
}

function update() {
    updateJump()
    updateHero()
}

function play() {
    draw()
    updatelava()
    update()
    requestAnimationFrame(play);
}

function init() {
    initEventsListeners()
    HERO.img.src = "img/img/pers.png"
    lava.img.src = "img/img/lava.png"
    pipeBottom.img.src = "img/img/pipeBottom.png"
    pipeBottom1.img.src = "img/img/pipeBottom1.png"
    pipeBottom2.img.src = "img/img/pipeBottom2.png"
    pipeBottom3.img.src = "img/img/pipeBottom3.png"
    pipeBottom4.img.src = "img/img/pipeBottom4.png"
    pipeBottom5.img.src = "img/img/pipeBottom5.png"
    pipeBottom6.img.src = "img/img/pipeBottom6.png"
    fg.img.src = "img/img/fg.png"
    fg1.img.src = "img/img/fg1.png"
    fg2.img.src = "img/img/fg2.png"
    fg3.img.src = "img/img/fg3.png"

    play()
}

init()