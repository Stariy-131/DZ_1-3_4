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

