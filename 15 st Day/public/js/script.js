const menuIcon = document.getElementById("menu");
const cta = document.getElementById("cta");
const modalDefault = document.getElementById("modalDefault");
const closeModalSuccess = document.getElementById("closeModalSuccess");
const overlay = document.getElementById("overlay");
const products = document.getElementById("products");

// ---------------------------------------------MENU MOBILE---------------------------------------------
function menuState(url) {
    menuIcon.setAttribute("src", url);
    overlay.classList.toggle("hidden");
}

menuIcon.addEventListener("click", () => {
    const menu = menuIcon.nextElementSibling;
    const logo = document.querySelector("header img");

    logo.classList.toggle("z-20");
    menuIcon.classList.toggle("z-20");
    menu.classList.toggle("hidden");

    if (menu.classList.contains("hidden")) {
        menuState("images/icon-hamburger.svg");
    } else {
        menuState("images/icon-close-menu.svg");
    }
})

// ---------------------------------------------CTA SECTION---------------------------------------------
function bookmarkState(toggle, roundButtonColor, iconColor, textColor1, textColor2, message) {
    toggle.firstElementChild.firstElementChild.children[0].setAttribute("fill", roundButtonColor);
    toggle.firstElementChild.firstElementChild.children[1].setAttribute("fill", iconColor);
    toggle.lastElementChild.classList.replace(textColor1, textColor2);
    toggle.lastElementChild.textContent = message;
}

cta.addEventListener("click", e => {
    const textColor = "lg:text-darkgray";
    const textColorActive = "lg:text-cyan-200";
    const roundButtonColor = "#2F2F2F";
    const roundButtonColorActive = "hsl(176, 72%, 28%)";
    const iconColor = "#B1B1B1";
    const iconColorActive = "#fff";

    // bookmark button
    if (e.target.id === "bookmark") {
        const toggle = e.target;
        const toggleText = toggle.lastElementChild;

        if (toggleText.classList.contains("lg:text-darkgray")) {
            bookmarkState(toggle, roundButtonColorActive, iconColorActive, textColor, textColorActive, "Bookmarked");

        } else if (toggleText.classList.contains("lg:text-cyan-200")) {
            bookmarkState(toggle, roundButtonColor, iconColor, textColorActive, textColor, "Bookmark");
        }

        // back this project button
    } else if (e.target.id === "btnBack") {
        overlay.classList.remove("hidden");
        modalDefault.classList.remove("hidden");

        menuIcon.classList.remove("z-20");
        document.querySelector("header img").classList.remove("z-20");
    }
})

// ---------------------------------------------MAIN SECTION---------------------------------------------
function updateStatistics(inputPledge) {
    let backed = parseInt((document.getElementById("backed").firstElementChild.dataset.target));
    let backers = parseInt((document.getElementById("backers").dataset.target));
    let progressbar = document.getElementById("progressbar");

    let total = backed + parseInt(inputPledge);

    document.getElementById("backed").firstElementChild.textContent = (total).toLocaleString();
    document.getElementById("backed").firstElementChild.dataset.target = total;
    document.getElementById("backers").textContent = (backers + 1).toLocaleString();
    document.getElementById("backers").dataset.target = backers + 1;
    progressbar.style.width = ((backed * 100) / 100000) + "%";
}

function animatedStatistics() {
    const counters = document.querySelectorAll(".counter");
    const speed = 500;
    const speed2 = 4000;
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;
            let inc = 0;

            if (target > 50000) {
                inc = Math.floor(target / speed2);
            } else {
                inc = Math.floor(target / speed);
            }

            if (count < target) {
                counter.innerText = (count + inc).toLocaleString();
                setTimeout(updateCount, 5);
            } else {
                counter.innerText = (target).toLocaleString();
            }
        };
        updateCount();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    animatedStatistics();
})

// SELECT REWARD
products.addEventListener("click", (e) => {
    if (e.target.matches("a.button")) {
        overlay.classList.remove("hidden");
        modalDefault.classList.remove("hidden");

        // SELECT PRODUCT (from main section)
        const modalCardSelected = modalDefault.querySelectorAll(`section article:nth-of-type(${e.target.dataset.card})`)[0];

        modalCardSelected.className = "relative mx-auto mb-6 bg-white border border-2 rounded-md border-cyan-100 lg:pt-2 lg:rounded-lg available";
        modalCardSelected.lastElementChild.classList.replace("h-0", "h-32");
        modalCardSelected.lastElementChild.classList.replace("px-0", "px-6");
        modalCardSelected.lastElementChild.classList.replace("py-0", "py-5");
        modalCardSelected.lastElementChild.classList.replace("border-t-0", "border-t-2");
        modalCardSelected.querySelector("span.w-3.h-3").classList.remove("hidden");
    }
})

// ------------------------------------------------MODAL------------------------------------------------
function resetDefaultModal() {
    modalDefault.querySelectorAll("article.available").forEach(elem => {
        elem.className = "relative mx-auto mb-6 bg-white border border-gray-300 rounded-md lg:pt-2 lg:rounded-lg available";
        //  reset pledge sections
        elem.lastElementChild.classList.replace("h-32", "h-0");
        elem.lastElementChild.classList.replace("px-6", "px-0");
        elem.lastElementChild.classList.replace("py-5", "py-0");
        elem.lastElementChild.classList.replace("border-t-2", "border-t-0");
        //  hidden dot
        elem.querySelector("span.w-3.h-3").classList.add("hidden");
    });
}

// CLOSE MODAL
closeModalDefault.addEventListener("click", () => {
    modalDefault.classList.add("hidden");
    overlay.classList.add("hidden");
    resetDefaultModal();
})

// default MODAL
modalDefault.addEventListener("click", (e) => {
    // CONTINUE BUTTON
    if (e.target.matches("button")) {
        const modalSuccess = document.getElementById("modalSuccess");

        if (e.target.previousElementSibling !== null) {
            const inputPledge = e.target.previousElementSibling.firstElementChild.value;

            // updateStock(e.target);
            updateStatistics(inputPledge);
            modalDefault.classList.add("hidden");
            overlay.classList.remove("hidden");
            modalSuccess.classList.remove("hidden");
            resetDefaultModal();
        } else {
            modalDefault.classList.add("hidden");
            overlay.classList.remove("hidden");
            modalSuccess.classList.remove("hidden");
            resetDefaultModal();
        }

        // SELECT PRODUCT (INPUT RADIO)
    } else if (e.target.matches("input[type='radio']")) {
        resetDefaultModal();
        // selected product card
        if (e.target.checked) {
            let pledgeSection = e.target.parentElement.parentElement.nextElementSibling;
            const card = e.target.parentElement.parentElement.parentElement;
            const dot = e.target.parentElement.querySelector("span.w-3.h-3");

            card.className = "relative mx-auto mb-6 bg-white border border-2 rounded-md border-cyan-100 lg:pt-2 lg:rounded-lg available";
            dot.classList.remove("hidden");
            // selected pleged section
            pledgeSection.classList.replace("h-0", "h-32");
            pledgeSection.classList.replace("px-0", "px-6");
            pledgeSection.classList.replace("py-0", "py-5");
            pledgeSection.classList.replace("border-t-0", "border-t-2");
        }
    }
})

// GOT IT (SUCCESS MODAL)
closeModalSuccess.addEventListener("click", () => {
    closeModalSuccess.parentElement.classList.add("hidden");
    overlay.classList.add("hidden");
})