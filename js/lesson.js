const phoneInput = document.querySelector("#phone_input");
const phoneBtn = document.querySelector("#phone_button");
const phoneResult = document.querySelector("#phone_result");

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;

phoneBtn.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = "Number found";
        phoneResult.style.color = "green";
    } else {
        phoneResult.innerHTML = "Number not found";
        phoneResult.style.color = "red";
    }
}

/////////////////////////////////////////////////////////////////////////

const tabsBlocks = document.querySelectorAll(".tab_content_block");
const tabsItemsParent = document.querySelector(".tab_content_items")
const tabsItems = document.querySelectorAll(".tab_content_item");

let intervalId;
// // console.log(tabsBlocks);
// // console.log(tabsItems);

const hide = () => {
    tabsBlocks.forEach((tabBlock) => {
        tabBlock.style.display = 'none';
    });
    tabsItems.forEach((tabItem) => {
        tabItem.classList.remove("tab_content_item_active")
    });
}

const show = (i = 0) => {
    tabsBlocks[i].style.display = "block";
    tabsItems[i].classList.add("tab_content_item_active")
}

hide();
show();

tabsItemsParent.onclick = (event) => {
    if (event.target.classList.contains("tab_content_item")) {
        tabsItems.forEach((tabItem, tabItemIndex) => {
            if (event.target === tabItem) {
                clearInterval(intervalId);
                hide();
                show(tabItemIndex);
                intervalId = setInterval(() => {
                    tabItemIndex++;
                    if (tabItemIndex > tabsItems.length - 1) {
                        tabItemIndex = 0;
                    }
                    hide();
                    show(tabItemIndex);
                }, 3000);
            }
        });
    }
};

let i = 0; //index

intervalId = setInterval(() => {

    i++;
    if (i > tabsItems.length - 1) {
        i = 0;
    }

    hide();
    show(i);
}, 3000);

/////////////////////////////////////////////////////////////////////////

const somInput = document.querySelector("#som");
const usdInput = document.querySelector("#usd");
const eurInput = document.querySelector("#eur");

const converter = (element, ...targets) => {
    element.oninput = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "../data/summ.json");
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send();

        xhr.onload = () => {
            const data = JSON.parse(xhr.response);

            if (element.value === "") {
                targets.forEach((t) => { t.value = ""; });
                return;
            }

            const value = parseFloat(element.value);
            if (isNaN(value)) {
                targets.forEach((t) => { t.value = ""; });
                return;
            }

            targets.forEach((target) => {
                if (element.id === "som") {
                    if (target.id === "usd") target.value = (value / data.usd).toFixed(2);
                    if (target.id === "eur") target.value = (value / data.eur).toFixed(2);
                } else if (element.id === "usd") {
                    if (target.id === "som") target.value = (value * data.usd).toFixed(2);
                    if (target.id === "eur") target.value = ((value * data.usd) / data.eur).toFixed(2);
                } else if (element.id === "eur") {
                    if (target.id === "som") target.value = (value * data.eur).toFixed(2);
                    if (target.id === "usd") target.value = ((value * data.eur) / data.usd).toFixed(2);
                }
            });
        };
    };
};

converter(somInput, usdInput, eurInput);
converter(usdInput, eurInput, somInput);
converter(eurInput, somInput, usdInput);

///////////////////////////////////////////////////////////////

const switcher = document.querySelector(".card_switcher");
const card = switcher.querySelector(".card");
const btns = switcher.querySelectorAll("button");

let cardId = 1
const cardMax = 200;

function cardloader(cardId) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${cardId}`)
        .then(response => response.json())
        .then(data => {
            const { title, id, completed } = data
            const completedTitle = completed ? "yes" : "no";
            const completedColor = completed ? "green" : "red";
            card.innerHTML = `
                <p>${title}</p>
                <p style="color: ${completedColor}">
                    ${completedTitle}
                </p>
                <span>${id}</span>
            `
        });
}

btns.forEach(button => {
    button.addEventListener("click", function cardSwitcher() {
        
        if (button.id === "btn-next") {
            cardId++
        } else {
            cardId--
        }
        if (cardId > cardMax) {
            cardId = 1
        } else if (cardId < 1) {
            cardId = cardMax
        }

        cardloader(cardId)

    })

});

cardloader(1)

///
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => console.log(data))