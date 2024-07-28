const body = document.querySelector("body");

document.querySelectorAll('.option-styling').forEach(button => {
    button.addEventListener('click', function() {

        let timerType= button.getAttribute("timer-type");

        body.className="";

        switch(timerType) {
            case "lock-in":
                body.classList.add("red");
                break;
            case "short-break":
                body.classList.add("blue");
                break;
            case "long-break":
                body.classList.add("green");
                break;
            case "auto-mode":
                body.classList.add("purple");
                break;
        }

        document.querySelectorAll('.option-styling').forEach(btn => {
            btn.classList.remove('permanent-active');
        });
        this.classList.add('permanent-active');
    });
});

const timer = (min) => {
    let time = min * 60 * 1000;
    let intervalId;

    const start = () => {
        intervalId = setInterval(() => {}, time);
        return intervalId;
    };

    return start;
};