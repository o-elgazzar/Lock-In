const body = document.querySelector("body");

window.onload = function() {
    document.querySelector('.option-styling').click();
};

document.querySelectorAll('.option-styling').forEach(button => {
    button.addEventListener('click', function() {

        let timerType = button.getAttribute("timer-type");

        body.className = "";

        switch(timerType) {
            case "lock-in":
                body.classList.add("red");
                reset(25, "Your 25 minutes of working are up!");
                break;
            case "short-break":
                body.classList.add("blue");
                reset(5, "Your 5 minute break is done!");
                break;
            case "long-break":
                body.classList.add("dark-blue");
                reset(15, "Your 15 minute break is done!");
                break;
            case "auto-mode":
                body.classList.add("dark-purple");
                startAutoMode();
                break;
        }

        document.querySelectorAll('.option-styling').forEach(btn => {
            btn.classList.remove('permanent-active');
        });
        this.classList.add('permanent-active');
    });
});

const display = document.getElementById("display");
let timer = null;
let startTime = 0;
let remainingTime = 25 * 60 * 1000; 
let isRunning = false;
let autoMode = false;
let endMessage = "Your 25 minutes of working are up!";

const autoSequence = [
    { type: "lock-in", duration: 25, message: "Your 25 minutes of working are up!" },
    { type: "short-break", duration: 5, message: "Your 5 minute break is done!" },
    { type: "lock-in", duration: 25, message: "Your 25 minutes of working are up!" },
    { type: "short-break", duration: 5, message: "Your 5 minute break is done!" },
    { type: "lock-in", duration: 25, message: "Your 25 minutes of working are up!" },
    { type: "short-break", duration: 5, message: "Your 5 minute break is done!" },
    { type: "lock-in", duration: 25, message: "Your 25 minutes of working are up!" },
    { type: "long-break", duration: 15, message: "Your 15 minute break is done!" }
];
let currentStep = 0;

function start() {
    if (!isRunning) {
        startTime = Date.now();
        timer = setInterval(update, 1000);
        isRunning = true;
    }
}

function pause() {
    if (isRunning) {
        clearInterval(timer);
        remainingTime -= Date.now() - startTime;
        isRunning = false;
    }
}

function reset(duration, message) {
    clearInterval(timer);
    startTime = 0;
    remainingTime = duration * 60 * 1000;
    endMessage = message;
    isRunning = false;
    updateDisplay(remainingTime);
}

function update() {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    const timeLeft = remainingTime - elapsed;

    if (timeLeft <= 0) {
        clearInterval(timer);
        display.textContent = "00:00";
        isRunning = false;
        alert(endMessage);

        if (autoMode) {
            proceedToNextStep();
        }
        return;
    }

    updateDisplay(timeLeft);
}

function updateDisplay(timeLeft) {
    let minutes = Math.floor(timeLeft / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    display.textContent = `${minutes}:${seconds}`;
}

function startAutoMode() {
    autoMode = true;
    currentStep = 0;
    proceedToNextStep();
}

function proceedToNextStep() {
    if (currentStep >= autoSequence.length) {
        currentStep = 0;
    }
    const step = autoSequence[currentStep];
    currentStep++;

    body.className = "";
    switch(step.type) {
        case "lock-in":
            body.classList.add("red");
            break;
        case "short-break":
            body.classList.add("blue");
            break;
        case "long-break":
            body.classList.add("dark-blue");
            break;
    }

    reset(step.duration, step.message);
    start();
}