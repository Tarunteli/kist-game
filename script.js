const questionOne =
    document.getElementById("questionOne");

const questionTwo =
    document.getElementById("questionTwo");

const gameEnd =
    document.getElementById("gameEnd");


const yesBtn =
    document.getElementById("yesBtn");

const noBtn =
    document.getElementById("noBtn");

const cashBtn =
    document.getElementById("cashBtn");

const gpayBtn =
    document.getElementById("gpayBtn");

const restartBtn =
    document.getElementById("restartBtn");


const redCharacter =
    document.getElementById("redCharacter");

const blueCharacter =
    document.getElementById("blueCharacter");

const game =
    document.querySelector(".game");

const status =
    document.getElementById("status");

const endMessage =
    document.getElementById("endMessage");


/* =========================
   YES
========================= */

yesBtn.addEventListener("click", () => {

    questionOne.classList.add("hidden");

    gameEnd.classList.remove("hidden");

    endMessage.innerText =
        "बहुत बढ़िया! आपकी किस्त पहले ही भरी हुई है।";

    status.innerText =
        "Payment Already Done ✓";

});


/* =========================
   NO
========================= */

noBtn.addEventListener("click", () => {

    questionOne.classList.add("hidden");

    questionTwo.classList.remove("hidden");

    status.innerText =
        "Payment Method चुनें";

});


/* =========================
   CASH
========================= */

cashBtn.addEventListener("click", () => {

    questionTwo.classList.add("hidden");

    gameEnd.classList.remove("hidden");

    endMessage.innerText =
        "आपने पैसे देकर किस्त भरने का विकल्प चुना।";

    status.innerText =
        "Cash Payment ✓";

});


/* =========================
   GPAY
========================= */

gpayBtn.addEventListener("click", () => {

    questionTwo.classList.add("hidden");

    game.classList.add("gpay-mode");

    status.innerText =
        "G Pay Processing...";

    /*
       Animation को कुछ समय चलने देंगे।
    */

    setTimeout(() => {

        gameEnd.classList.remove("hidden");

        endMessage.innerText =
            "G Pay से किस्त भरने की प्रक्रिया पूरी हुई!";

        status.innerText =
            "Payment Successful ✓";

    }, 5500);

});


/* =========================
   RESTART
========================= */

restartBtn.addEventListener("click", () => {

    game.classList.remove("gpay-mode");

    gameEnd.classList.add("hidden");

    questionTwo.classList.add("hidden");

    questionOne.classList.remove("hidden");

    status.innerText =
        "Just for Fun 😎";

});