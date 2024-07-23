const word_el = document.getElementById("word");
const popup = document.getElementById("popup-container");
const messageElement = document.getElementById("success-message");
const wrongElements = document.getElementById("wrong-letters");
const items = document.querySelectorAll(".item");
const message_el = document.getElementById("message");
const playAgainBtn = document.getElementById("play-again");

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

function getRandomWord() {
  const words = [
    "javascript",
    "java",
    "python",
    "css",
    "kotlin",
    "go",
    "html",
    "swift",
    "php",
  ];
  return words[Math.floor(Math.random() * words.length)];
}

playAgainBtn.addEventListener('click', function() {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();

    displayWord();
    updateWrongLetters();

    popup.style.display = 'none';

})

function displayWord() {
  word_el.innerHTML = `
        ${selectedWord
          .split("")
          .map(
            (letter) => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter : ""}
            </div>
        `
          )
          .join("")}
    `;

  const w = word_el.innerText.replace(/\n/g, "");
  if (w === selectedWord) {
    popup.style.display = "flex";
    messageElement.innerText = "tebrikler kazandiniz";
  }
}

function updateWrongLetters() {
  wrongElements.innerHTML = `
    ${wrongLetters.length > 0 ? "<h3>Hatalı Harfler</h3> " : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

  items.forEach((item, index) => {
    const errorCount = wrongLetters.length;

    if (index < errorCount) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

  if (wrongLetters.length === items.length) {
    popup.style.display = "flex";
    messageElement.innerText = "Maalesef Kaybettiniz";
  }
}

function displayMessage() {
  message_el.classList.add("show");

  setTimeout(function () {
    message_el.classList.remove("show");
  }, 2000);
}

window.addEventListener("keydown", function (e) {
    const letter = e.key.toLowerCase();
    if(/^[a-z]$/.test(letter)){

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
              correctLetters.push(letter);
              displayWord();
            } else {
              displayMessage();
            }
          } else {
            if (!wrongLetters.includes(letter)) {
              wrongLetters.push(letter);
              updateWrongLetters();
            } else {
              displayMessage();
            }
          }
    
    }
});

displayWord();
