const textDisplay = document.getElementById("text-display");
const inputField = document.getElementById("input-field");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const timerDisplay = document.getElementById("timer");
const restartBtn = document.getElementById("restart");
const themeToggle = document.getElementById("theme-toggle");

let startTime;
let timerInterval;
let timeElapsed = 0;
let totalTyped = 0;
let correctTyped = 0;

const sentences = [
  "Practice makes a person perfect in coding.",
  "Typing fast requires both speed and accuracy.",
  "JavaScript makes web pages interactive.",
  "Consistency is the key to improvement.",
  "Focus on accuracy before increasing speed."
];

// Load random sentence
function loadSentence() {
  const random = sentences[Math.floor(Math.random() * sentences.length)];
  textDisplay.innerHTML = "";

  random.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    textDisplay.appendChild(span);
  });
}

// Start timer
function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(() => {
    timeElapsed = Math.floor((new Date() - startTime) / 1000);
    timerDisplay.innerText = timeElapsed;
  }, 1000);
}

// Calculate WPM
function calculateWPM() {
  const minutes = timeElapsed / 60;
  const wpm = Math.round((correctTyped / 5) / minutes || 0);
  return wpm;
}

// Calculate accuracy
function calculateAccuracy() {
  const accuracy = Math.round((correctTyped / totalTyped) * 100 || 100);
  return accuracy;
}

// Input logic
inputField.addEventListener("input", () => {
  const input = inputField.value.split("");
  const spans = textDisplay.querySelectorAll("span");

  if (!startTime) startTimer();

  totalTyped = input.length;
  correctTyped = 0;

  spans.forEach((span, index) => {
    const char = input[index];

    if (char == null) {
      span.classList.remove("correct", "incorrect");
    } else if (char === span.innerText) {
      span.classList.add("correct");
      span.classList.remove("incorrect");
      correctTyped++;
    } else {
      span.classList.add("incorrect");
      span.classList.remove("correct");
    }
  });

  // Update stats
  wpmDisplay.innerText = calculateWPM();
  accuracyDisplay.innerText = calculateAccuracy() + "%";

  // End condition
  if (input.length === spans.length) {
    clearInterval(timerInterval);
    alert("Test Completed!");
  }
});

// Restart
restartBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  inputField.value = "";
  startTime = null;
  timeElapsed = 0;
  totalTyped = 0;
  correctTyped = 0;

  timerDisplay.innerText = 0;
  wpmDisplay.innerText = 0;
  accuracyDisplay.innerText = "100%";

  loadSentence();
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Save preference
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// Load saved theme
window.onload = () => {
  loadSentence();

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
};
