const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const game = document.querySelector(".game");
const overlay = document.getElementById("gameover");
const restartBtn = document.getElementById("restart");

const startTime = Date.now();
let gameOver = false;

// shrink the 600px game area to fit small phone screens
function fitGame(){
    var s = Math.min(1, document.documentElement.clientWidth / 620);
    game.style.transform = "scale(" + s + ")";
}
fitGame();
window.addEventListener("resize", fitGame);

function jump(){
    if(gameOver) return;
    if(!dino.classList.contains("jump")) // only jump if not already mid-jump
    {
       dino.classList.add("jump");

        setTimeout (function(){
            dino.classList.remove("jump"); // removes the jump class once landed so it can jump again
        },300)
    }
}

let checkAlive = setInterval(function(){
    if(gameOver) return;
    // grace period: don't kill the player while the first cactus is still sweeping in
    if(Date.now() - startTime < 1500) return;

    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    //check for collision
    if(cactusLeft>0 && cactusLeft<70 && dinoTop>=143){
        gameOver = true;
        clearInterval(checkAlive);
        dino.style.animationPlayState = 'paused';
        cactus.style.animationPlayState = 'paused';
        overlay.classList.add("show");
    }
},10);

document.addEventListener("keydown", function(event){
    jump();
});

// tap / click support for phones and mice
game.addEventListener("touchstart", function(e){
    e.preventDefault();
    jump();
}, {passive:false});
game.addEventListener("mousedown", function(){
    jump();
});

restartBtn.addEventListener("click", function(){
    window.location.reload();
});
