
const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
}


const makeBgColor = {
    intervalId: null,

    start() {
        this.intervalId = setInterval(getRandomHexColor, 1000);
        refs.startBtn.disabled = true;
        
        
    },

    stop() {
        clearInterval(this.intervalId);
        refs.startBtn.disabled = false;
        
    },
    
}

refs.startBtn.addEventListener('click', makeBgColor.start.bind(makeBgColor));
refs.stopBtn.addEventListener('click', makeBgColor.stop.bind(makeBgColor));

function getRandomHexColor() {
    const bgColor =  `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    console.log(bgColor);
    document.body.style.backgroundColor = bgColor;

}