const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const modeDisplay = document.getElementById('mode');

let workTime = 25 * 60;
let breakTime = 5 * 60;
let time = workTime;
let timer = null;
let isRunning = false;
let isWorkMode = true;

function updateDisplay() {
    const min = String(Math.floor(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');
    timerDisplay.textContent = `${min}:${sec}`;
    modeDisplay.textContent = isWorkMode ? '作業中' : '休憩中';
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        if (time > 0) {
            time--;
            updateDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            if (isWorkMode) {
                alert('作業終了！休憩しましょう。');
                isWorkMode = false;
                time = breakTime;
            } else {
                alert('休憩終了！作業に戻りましょう。');
                isWorkMode = true;
                time = workTime;
            }
            updateDisplay();
        }
    }, 1000);
}

function stopTimer() {
    if (!isRunning) return;
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isWorkMode = true;
    time = workTime;
    updateDisplay();
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();
