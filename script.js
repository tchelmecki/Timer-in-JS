const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const resetButton = document.querySelector(".reset");
const result = document.querySelector(".elapsed-time");
const meantimeButton = document.querySelector(".meantime-button");
const meantimeList = document.querySelector(".meantime-list");
const ul = document.querySelector(".ul");

let li;
let newContent = "";
let meantimeArray = [];
let time = 0;
let startTime = 0;
let isRunning = false;
let updateTime = 0;
let elapsedTime = 0;

function start(){
    if (!isRunning) {
        startTime = Date.now() - elapsedTime; 
        updateTime = setInterval(update, 5);
        isRunning = true;
    }
}

function stop(){
    if(isRunning){
        clearInterval(updateTime);
        isRunning = false;
        elapsedTime = Date.now() - startTime;
    }
}

function reset(){
    clearInterval(updateTime);
    startTime = 0;
    isRunning = false;
    updateTime = 0;
    elapsedTime = 0;
    result.textContent = "00:00:00:00";
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}

function update(){
    let currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    let miliseconds = Math.floor((elapsedTime % 1000 / 10));

    formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(miliseconds).padStart(2, '0')}`;
    
    result.textContent = formattedTime;
}

function meantime(){
    if(isRunning){
        li = document.createElement("li");
        liContent = document.createTextNode(formattedTime);
        li.appendChild(liContent);
        ul.appendChild(li);
    }
}

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);
meantimeButton.addEventListener("click", meantime);