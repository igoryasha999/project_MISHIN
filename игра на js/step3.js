//какие-то коробки =)
var bg1 = new Image();
var gaz = new Image();
var pipeBottom = new Image();

//расположение фото в папке img
bg1.src = "img/img/img/bg1.png";
pipeBottom.src = "img/img/img/pipeBottom.png";
gaz.src = "img/img/img/gaz.png";

var gap = 90;

var GAME = {
    width: 1745,
    height: 900,
}

var HERO = {
    img: new Image(),
    x: 0,
    y: 765,
    width: 75,
    height: 80,
    xDirection: 10,
    yDirection: 110,
}

var gaz = {
    img: new Image(),
    x: 600,
    y: 600,
    width: 550,
    height: 250,
}

var pipeBottom = {
    img: new Image(),
    x: 450,
    y: 635,
    width: 112,
    height: 112,
}

var pipeBottom1 = {
    img: new Image(),
    x: 250,
    y: 408,
    width: 112,
    height: 112,
    xDirection: 3,
}

var pipeBottom2 = {
    img: new Image(),
    x: 562,
    y: 258,
    width: 112,
    height: 112,
    xDirection: 2,
}

var pipeBottom3 = {
    img: new Image(),
    x: 562 + 112,
    y: 258,
    width: 112,
    height: 112,
    xDirection: 2,
}

var pipeBottom4 = {
    img: new Image(),
    x: 1000 + 112,
    y: 258,
    width: 112,
    height: 112,
}


var pipeBottom6 = {
    img: new Image(),
    x: 1300,
    y: 500,
    width: 112,
    height: 112,
}

var PIPES_BOTTOM = [
    pipeBottom,
    pipeBottom1,
    pipeBottom2,
    pipeBottom3,
    pipeBottom4,
    pipeBottom6,
]

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
window.addEventListener('keydown', function (event) {
    keyState[event.keyCode || event.which] = true;
}, true);
window.addEventListener('keyup', function (event) {
    keyState[event.keyCode || event.which] = false;
}, true);

x = 100;

function gameLoop() {
    if (keyState[37] || keyState[65]) {
        HERO.x -= 5;
    }
    if (keyState[39] || keyState[68]) {
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

    if (HERO.y > 765) {
        HERO.y = 765;
    }

    if (HERO.x + HERO.width > GAME.width) {
        HERO.x = GAME.width - HERO.width;
    }

    if (HERO.y + HERO.height > GAME.height) {
        HERO.y = GAME.height - HERO.height;
    }

    if (HERO.x >= GAME.width - HERO.width) {
        window.location.href = 'endGame.html';
    }
}

function updatepipe1(){
    pipeBottom1.x += pipeBottom1.xDirection;
    if ((pipeBottom1.x - pipeBottom1.width > 200) || (pipeBottom1.x + pipeBottom1.width < 150)){
        pipeBottom1.xDirection = -pipeBottom1.xDirection;
        }
}

function updatepipe2(){
    pipeBottom2.x += pipeBottom2.xDirection;
    if ((pipeBottom2.x - pipeBottom2.width > 550) || (pipeBottom2.x + pipeBottom2.width < 500)){
        pipeBottom2.xDirection = -pipeBottom2.xDirection;
        }
}

function updatepipe3(){
    pipeBottom3.x += pipeBottom3.xDirection;
    if ((pipeBottom3.x - pipeBottom3.width > 662) || (pipeBottom3.x + pipeBottom3.width < 612)){
        pipeBottom3.xDirection = -pipeBottom3.xDirection;
        }
}

function updategaz() {
    var gazTopLineCollision = HERO.y + HERO.height > gaz.y;
    var gazLeftLineCollision = HERO.x + HERO.width > gaz.x;
    var gazRightLineCollision = HERO.y - HERO.height < gaz.y + gaz.height;
    var gazBottomLineCollision = HERO.x - HERO.width < gaz.x + gaz.width;
    if (gazTopLineCollision && gazLeftLineCollision && gazRightLineCollision && gazBottomLineCollision) {
        HERO.x = 0;
        HERO.y = 745;
    }
}

function updateHero() {
    if (!JUMP.state) {
        HERO.y += HERO.yDirection
    }
    HERO.yDirection = 10
    if (HERO.y >= 765) {
        HERO.yDirection = 0 
        HERO.y = 765
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
    drawgaz()
    drawHero()
    drawPipesBottom()
}

//вставляем картинки игры
function drawBackground() {
    canvasContext.drawImage(bg1, 0, 0);
}

function drawHero() {
    canvasContext.drawImage(HERO.img, HERO.x, HERO.y, HERO.width, HERO.height)
}

function drawPipesBottom() {
    PIPES_BOTTOM.forEach(pipeBottom => {
        canvasContext.drawImage(pipeBottom.img, pipeBottom.x, pipeBottom.y, pipeBottom.width, pipeBottom.height)
    })
}

function drawgaz() {
    canvasContext.drawImage(gaz.img, gaz.x, gaz.y, gaz.width, gaz.height)
}

function update() {
    updateJump()
    updateHero()
    updatepipe1()
    updatepipe2()
    updatepipe3()
}

function play() {
    draw()
    updategaz()
    update()
    requestAnimationFrame(play);
}

function init() {
    initEventsListeners()
    HERO.img.src = "img/img/img/pers.png"
    gaz.img.src = "img/img/img/gaz.png"
    pipeBottom.img.src = "img/img/img/pipeBottom.png"
    pipeBottom1.img.src = "img/img/img/pipeBottom1.png"
    pipeBottom2.img.src = "img/img/img/pipeBottom2.png"
    pipeBottom3.img.src = "img/img/img/pipeBottom3.png"
    pipeBottom4.img.src = "img/img/img/pipeBottom4.png"
    pipeBottom6.img.src = "img/img/img/pipeBottom6.png"

    play()
}

init()