let gameSeq=[];
let userSeq=[];

let btns=["yellow","red","purple","green"];
let started=false;
let level=0;
let count=0;

highscore=0;

let h1=document.querySelector("h1");

document.addEventListener('keypress',function(){
    if(started==false){
        console.log("game started");
        if(count==0){
            document.querySelector("p").remove();
            count++;
        }
        started=true;
        levelUp();
    }
})

function gameFlash(btn){
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    h1.innerText=`Level ${level}`;

    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    // console.log(randColor);
    gameFlash(randBtn);
}

function checkAns(idx){
    if(gameSeq[idx]==userSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        if(level>highscore){
            highscore=level;
        }
        h1.innerHTML=`Game Over! Your score was <b>${level}</b><br/> Your Highscore is ${highscore} <br/> Press any key to restart`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}

function btnPress(){
    let btn=this;
    userFlash(btn);
    userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener('click',btnPress);
}

function reset(){
    level=0;
    gameSeq=[];
    userSeq=[];
    started=false;
}