const modal = document.querySelector(".modal");
const openModalBtn = document.querySelector("#btn-get");
const closeModalBtn = document.querySelector(".modal_close");

// console.log(modal);

const openModal = () => {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
}

openModalBtn.onclick = () => {
    openModal();
}

closeModalBtn.onclick = () => { 
    closeModal();
}

modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal();
    };
};

setTimeout (() => {
    openModal();
}, 10000);

let modalStopper = true;

function scroll() {
    let documentHeight = document.documentElement.scrollHeight;
    let windowHeight = window.innerHeight;
    let scrollTop = window.scrollY;
    // console.log(scrollTop); // проверка работы отключения функции
             

    if (scrollTop + windowHeight >= documentHeight && modalStopper === true) {
        openModal();
        modalStopper === false
        window.removeEventListener("scroll", scroll);
    };

    closeModalBtn.addEventListener('click', ()=>{
        modalStopper = false;
    });

    modal.addEventListener('click', ()=>{
        modalStopper = false;
    });
};

window.addEventListener("scroll", scroll);
