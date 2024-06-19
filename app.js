//Break
const break_decrement = document.getElementById("break-decrement");
const break_increment = document.getElementById("break-increment");
const break_text = document.getElementById("break-label");
const break_length = document.getElementById("break-length");

//Session
const session_decrement = document.getElementById("session-decrement");
const session_increment = document.getElementById("session-increment");
const session_text = document.getElementById("session-label");
const session_length = document.getElementById("session-length");

//Time Display
const timer_label = document.getElementById("timer-label");
const timer = document.getElementById("time-left");
const play = document.getElementById("play");

//controls
const stop = document.getElementById("start_stop");
const reset = document.getElementById("reset");

let session_time = 25;
let break_time = 5;
let time_remaining = 0;
let break_remaining = 0;
let isPaused = false;
let countdown;
let break_countdown;

reset.addEventListener("click", handleReset);
stop.addEventListener("click", handleStop);
play.addEventListener("click", startTimer);

session_increment.addEventListener("click", () =>
  handleIncrement((type = "session_increment"))
);

break_increment.addEventListener("click", () =>
  handleIncrement((type = "break_increment"))
);

session_decrement.addEventListener("click", () =>
  handleDecrement((type = "session_decrement"))
);

break_decrement.addEventListener("click", () =>
  handleDecrement((type = "break_decrement"))
);

function handleReset() {
  //stop the running timer
  timer_label.innerText = "Session";
  timer.innerText = "25:00";
  break_length.innerText = 5;
  session_length.innerText = 25;
  timer.innerText = formatTime(60 * 25);
  time_remaining = 0;
  break_remaining = 0;
  isPaused = true;
  clearInterval(countdown);
  clearInterval(break_countdown);
}

function handleIncrement(type) {
  if (type === "break_increment") {
    break_time += 1;
    break_length.innerText = break_time;
  } else {
    session_time += 1;
    session_length.innerText = session_time;
    timer.innerText = formatTime(60 * session_time);
  }
}

function handleDecrement(type) {
  if (type === "break_decrement") {
    break_time -= 1;
    if (break_time < 0) {
      break_time = 0;
    }
    break_length.innerText = break_time;
  } else {
    session_time -= 1;
    if (session_time < 0) {
      session_time = 0;
    }
    session_length.innerText = session_time;
    timer.innerText = formatTime(60 * session_time);
  }
}

function formatTime(seconds) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${secs}`;
}

function updateTimer() {
  const minutes = String(Math.floor(time_remaining / 60)).padStart(2, "0");
  const seconds = String(time_remaining % 60).padStart(2, "0");
  timer.innerText = `${minutes}:${seconds}`;
  if (time_remaining <= 0) {
    clearInterval(countdown);
    timer.innerText = `00:00`;
    breakTimer();
  }
  time_remaining--;
}
function updateBreak() {
  const minutes = String(Math.floor(break_remaining / 60)).padStart(2, "0");
  const seconds = String(break_remaining % 60).padStart(2, "0");
  timer.innerText = `${minutes}:${seconds}`;
  if (break_remaining <= 0) {
    clearInterval(break_countdown);
    timer.innerText = `00:00`;
    startTimer();
  }
  break_remaining--;
}

function startTimer() {
  timer_label.innerText = "Session";
  time_remaining = isPaused ? time_remaining : session_time * 60;
  isPaused = false;
  clearInterval(countdown);
  countdown = setInterval(updateTimer, 1000);
}

function breakTimer() {
  timer_label.innerText = "Break Time";
  break_remaining = break_time * 60;
  clearInterval(break_countdown);
  break_countdown = setInterval(updateBreak, 1000);
}

function handleStop() {
  clearInterval(countdown);
  clearInterval(break_countdown);
  isPaused = true;
}
