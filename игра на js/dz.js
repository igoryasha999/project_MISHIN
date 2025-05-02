//какие-то коробки =)
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
var demon = new Image();

//расположение фото в папке img
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";
demon.src = "img/demon.png";

var gap = 90;

var GAME = {
    width: 1745,
    height: 932,
}

var HERO = {
    img: new Image(),
    x: 0,
    y: 700,
    width: 75,
    height: 80,
    xDirection: 20,
    yDirection: 112,
}

var demon = {
    img: new Image(),
    x: 900,
    y: 654,
    width: 120,
    height: 120,
    xDirection: 3,
}

var pipeBottom = {
    img: new Image(),
    x: 200,
    y: 668,
    width: 448,
    height: 112,
}

var pipeBottom1 = {
    img: new Image(),
    x: 312,
    y: 556,
    width: 224,
    height: 112,
}

var pipeBottom2 = {
    img: new Image(),
    x: 1075,
    y: 668,
    width: 672,
    height: 112,
}

var pipeBottom3 = {
    img: new Image(),
    x: 1187,
    y: 556,
    width: 336,
    height: 112,
}

var pipeBottom4 = {
    img: new Image(),
    x: 1411,
    y: 444,
    width: 112,
    height: 112,
}

var PIPES_BOTTOM = [
    pipeBottom,
    pipeBottom1,
    pipeBottom2,
    pipeBottom3,
    pipeBottom4,
]

var fg = {
    img: new Image(),
    x: 0,
    y: -70,
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

function initEventsListeners() {
    document.addEventListener("keydown", onCanvasKeyDown);
}

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

    if (HERO.y > 700) {
        HERO.y = 700;
    }

    if (HERO.x + HERO.width > GAME.width) {
        HERO.x = GAME.width - HERO.width;
    }

    if (HERO.y + HERO.height > GAME.height) {
        HERO.y = GAME.height - HERO.height;
    }

    if (HERO.x >= 1640) {
        window.location.href = 'step2.html';
    }
}


function updatedemon() {
  
    demon.x += demon.xDirection;
    if ((demon.x - demon.width > 835) || (demon.x + demon.width < 770)){
        demon.xDirection = -demon.xDirection;
        }

    var demonTopLineCollision = HERO.y + HERO.height > demon.y;
    var demonLeftLineCollision = HERO.x + HERO.width > demon.x;
    var demonRightLineCollision = HERO.y - HERO.height < demon.y + demon.height;
    var demonBottomLineCollision = HERO.x - HERO.width < demon.x + demon.width;
    if (demonTopLineCollision && demonLeftLineCollision && demonRightLineCollision && demonBottomLineCollision) {
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
    drawPipesBottom()
    drawfg()
    drawdemon()
}

//вставляем картинки игры
function drawBackground() {
    canvasContext.drawImage(bg, 0, 0);
    canvasContext.drawImage(pipeUp, -100, -150);
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

function drawdemon() {
    canvasContext.drawImage(demon.img, demon.x, demon.y, demon.width, demon.height)
}

function update() {
    updateJump()
    updatedemon()
    updateHero()
}

function play() {
    update()
    draw()
    requestAnimationFrame(play);
}
function init() {
    initEventsListeners()
    HERO.img.src = "img/pers.png"
    demon.img.src = "img/demon.png"
    pipeBottom.img.src = "img/pipeBottom.png"
    pipeBottom1.img.src = "img/pipeBottom1.png"
    pipeBottom2.img.src = "img/pipeBottom2.png"
    pipeBottom3.img.src = "img/pipeBottom3.png"
    pipeBottom4.img.src = "img/pipeBottom4.png"
    fg.img.src = "img/fg.png"

    play()
}


init()