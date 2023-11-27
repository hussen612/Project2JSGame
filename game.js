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
    question: "Welke continent heeft het meeste biodiversiteit verlies in 2022?",
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
    question: "Met hoeveel biljoen ton verliest Ijsland ijs? Sinds 2002.",
    choice1: "210 Biljoen",
    choice2: "150 Biljoen",
    choice3: "124 Biljoen",
    choice4: "270 Biljoen",
    answer: 4
  },
  {
    question: "Hoe veel mensen leven in een regio waar klimaatverandering een grote bedreiging is?",
    choice1: "3.6 Biljoen",
    choice2: "2.4 Biljoen",
    choice3: "1.2 Biljoen",
    choice4: "4.8 Biljoen",
    answer: 1
  },
  {
    question: "Tussen 2030 en 2050, hoeveel menselijke doden zijn er ongeveer verwacht door klimaatverandering?",
    choice1: "902.000",
    choice2: "1.2 Miljoen",
    choice3: "250.000",
    choice4: "140.00",
    answer: 3
},
{
  question: "Hoeveel procent van hitte gerelateerde doden zijn er door mensen veroorzaakte klimaatverandering?",
  choice1: "53%",
  choice2: "19%",
  choice3: "23%",
  choice4: "37%",
  answer: 4
},
{
  question: "Met hoveeel procent is de concentratie van kooldioxide in de atmosfeer gestegen sinds 1750?",
  choice1: "24%",
  choice2: "47%",
  choice3: "40%",
  choice4: "19%",
  answer: 3
},

{
  question: "Wat heeft het grootste impact gehad op de opwarming van de aarde?",
  choice1: "Landbouwpraktijken",
  choice2: "Fossiele brandstoffen",
  choice3: "Ontbossing",
  choice4: "Industriele processen",
  answer: 2
},
{
  question: "Welk percentage van de elektriciteit in Nederland wordt momenteel opgewekt uit hernieuwbare energiebronnen?",
  choice1: "29%",
  choice2: "76%",
  choice3: "46%",
  choice4: "17%",
  answer: 3
},
{
  question: "Hoeveel ton CO2 was er in 2022 uitgestoten in Nederland?",
  choice1: "158 Megaton",
  choice2: "240 Megaton",
  choice3: "83 Megaton",
  choice4: "150 Megaton",
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