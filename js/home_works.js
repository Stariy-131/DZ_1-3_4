const gmailInput = document.querySelector("#gmail_input");
const gmailBtn = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");

const regExp = /^\w+@gmail\.com$|^\w+@mail\.ru$|^\w+@yandex\.ru$|^\w+@email\.com$/;

gmailBtn.onclick = () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = "Gmail found";
        gmailResult.style.color = "green";
    } else {
        gmailResult.innerHTML = "Gmail not found";
        gmailResult.style.color = "red";
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const box = document.querySelector(".parent_block");
    const block = document.querySelector(".child_block");



    const offsetWidth = box.clientWidth - block.clientWidth;
    const offsetHeight = box.clientHeight - block.clientHeight;

    let positionX = 0;
    let positionY = 0;

    function moveBlock() {
        block.style.transform = `translate(${positionX}px, ${positionY}px)`;

        if (positionX < offsetWidth && positionY === 0) { 
            positionX += 2;
        } 
        else if (positionX >= offsetWidth && positionY < offsetHeight) { 
            positionY += 2;
        } 
        else if (positionX > 0 && positionY >= offsetHeight) {
            positionX -= 2;
        } 
        else if (positionX <= 0 && positionY > 0) {
            positionY -= 2;
        }
        requestAnimationFrame(moveBlock);
        
    }
    moveBlock();
    
});

///////////////////////////////////////////////////////////

const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#reset");
const timerDisplay = document.querySelector("#seconds");

let isRunning = false;
let seconds = 0;

function start() {

    if (isRunning) return;
    isRunning = true;

    const timer = setInterval(() => {
        seconds++;
        timerDisplay.textContent = seconds;
    }, 1000);

    stopBtn.onclick = () => {
        clearInterval(timer);
        isRunning = false;
    };

    resetBtn.onclick = () => {
        clearInterval(timer);
        seconds = 0;
        timerDisplay.textContent = seconds;
        isRunning = false;
    };
}

startBtn.onclick = () => {
    start()
}

///////////////////////////////////////////////////////////

const charactersList = document.querySelector(".characters-list");

function infoBlock() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/data/characters.json");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();

    xhr.onload = () => {
        const data = JSON.parse(xhr.response);
        data.forEach((character) => block(character));
    };
}



function lastPerson() {
    const xhrTwo = new XMLHttpRequest();
    xhrTwo.open("GET", "/data/person.json");
    xhrTwo.setRequestHeader("Content-type", "application/json");
    xhrTwo.send();

    xhrTwo.onload = () => {
        const person = JSON.parse(xhrTwo.response);
        console.log(person.img, person.name, person.age, person.info);
        console.log(person);
    }
}

infoBlock();
lastPerson()

function block(character) {
    const div = document.createElement("div");
    div.className = "character-list";
    div.style.display = "flex";


    const content = document.createElement("div");
    content.className = "block-content"
    content.style.maxWidth = "400px";
    content.style.backgroundColor = "#333";
    content.style.marginBottom = "20px";

    const img = document.createElement("img");
    img.className = "character-img";
    img.style.width = "100%";
    img.style.height = "400px";
    img.style.padding = "10px"
    img.src = character.img;
    img.alt = character.name;

    const name = document.createElement("h3");
    name.className = "character-name";
    name.style.height = "80px";
    name.style.padding = "10px"
    name.style.alignContent = "center";
    name.style.backgroundColor = "orange";
    name.textContent = character.name;

    const ages = document.createElement("h4");
    ages.className = "character-name";
    ages.style.height = "30px";
    // ages.style.padding = "10px"
    ages.style.display = "flex"
    ages.style.justifyContent = "center"
    // ages.style.alignContent = "center";
    ages.style.backgroundColor = "orange";
    ages.textContent = character.age;

    const info = document.createElement("p");
    info.className = "character-info";
    info.style.padding = "10px"
    info.style.display = "flex"
    info.style.color = "#fff"
    info.style.alignContent = "justify";
    info.textContent = character.history;

    content.append(img, name, ages, info);
    div.appendChild(content)
    charactersList.appendChild(div);
}
