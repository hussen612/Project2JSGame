const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Welke continent heeft het meeste biodiversiteit verlies in 2022?", ",
    choice1: "Europa/Centraal Azie",
    choice2: "Afrika",
    choice3: "Zuid Amerika",
    choice4: "Noord Amerika",
    answer: 3
  },
  {
    question:
      "Met hoeveel procent is het natuurpopulatie gedaalt sinds 1970?",
    choice1: "70%",
    choice2: "69%",
    choice3: "82%",
    choice4: "54%",
    answer: 2 
  },
  {
    question: "Bossen maken onze klimaat stabiel. Met hoeveel graden celsius zou de globale tempratuur omhoog gaan zonder bossen?",
    choice1: "1",
    choice2: "0,5",
    choice3: "0,3",
    choice4: "1,4",
    answer: 2
  },
  {
    question: "Met hoeveel biljoen ton verliest Antarctica ijs? Sinds 2002.",
    choice1: "158 Biljoen",
    choice2: "240 Biljoen",
    choice3: "69 Biljoen",
    choice4: "150 Biljoen",
    answer: 4
  },
  {
    question: "En met hoeveel biljoen ton verliest Ijsland ijs? Sinds 2002.",
    choice1: "210 Biljoen",
    choice2: "150 Biljoen",
    choice3: "124 Biljoen",
    choice4: "270 Biljoen",
    answer: 4
  },
  {
    question: " What happend to the cube at the end of Season 5",
    choice1: "It teleported",
    choice2: "Removed",
    choice3: "It flew away",
    choice4: "Destroyed",
    answer: 1
  },
  {
    question: "What is the first vehicle to be added to the game ?",
    choice1: "Car",
    choice2: "Plane",
    choice3: "Shopping cart",
    choice4: "Golf car",
    answer: 3
},
{
  question: "What rarity is the Raptor skin ?",
  choice1: "Common",
  choice2: "Green",
  choice3: "Purple",
  choice4: "Legendary",
  answer: 4
},
{
  question: "How much damage is caused from a blue AR head shot ?",
  choice1: "44",
  choice2: "55",
  choice3: "66",
  choice4: "67",
  answer: 3
},

{
  question: "What is the rarest Skin in the game ? ",
  choice1: "Ikonik",
  choice2: "Renegade Raider",
  choice3: "Black Knight",
  choice4: "Galaxy Skin",
  answer: 2
},
{
  question: "What company made Fortnite ?",
  choice1: "Ubisoft",
  choice2: "Rockstar Games",
  choice3: "Epic Games",
  choice4: "Nintendo",
  answer: 3
},
{
  question: "Which was the last skin in season 4 battle pass ?",
  choice1: "Omega ",
  choice2: " Black Knight",
  choice3: "Carbide",
  choice4: "Valor ",
  answer: 1 
},

];

//CONSTANTS
const CORRECT_BONUS = 100;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("./end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();