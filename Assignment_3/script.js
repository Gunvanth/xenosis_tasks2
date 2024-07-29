// Array containing quiz questions, choices, and correct answers
const quizData = [
  {
    question: "What does HTML stand for?",
    choices: ["HyperText Markup Language", "HyperText Multiple Language", "HighText Markup Language", "Hyperlink Text Markup Language"],
    answer: "HyperText Markup Language"
  },
  {
    question: "Which HTML element is used to specify a header for a document or section?",
    choices: ["<header>", "<head>", "<h1>", "<title>"],
    answer: "<header>"
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    choices: ["<break>", "<lb>", "<br>", "<hr>"],
    answer: "<br>"
  },
  {
    question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
    choices: ["alt", "src", "title", "caption"],
    answer: "alt"
  },
  {
    question: "Which HTML element is used to define a table?",
    choices: ["<table>", "<tab>", "<tr>", "<td>"],
    answer: "<table>"
  },
  {
    question: "How can you make a list that lists items with bullet points in HTML?",
    choices: ["<list>", "<ul>", "<ol>", "<dl>"],
    answer: "<ul>"
  },
  {
    question: "Which HTML element is used to create a form for user input?",
    choices: ["<input>", "<form>", "<fieldset>", "<textarea>"],
    answer: "<form>"
  },
  {
    question: "What is the correct HTML element for playing video files?",
    choices: ["<media>", "<video>", "<movie>", "<film>"],
    answer: "<video>"
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    choices: ["<style>", "<css>", "<script>", "<stylesheet>"],
    answer: "<style>"
  },
  {
    question: "Which HTML element is used to display a hyperlink?",
    choices: ["<link>", "<a>", "<href>", "<url>"],
    answer: "<a>"
  }
];

let currentQuestionIndex = 0; // Index of the current question being displayed
let score = 0; // User's score

// DOM elements
const startBtn = document.getElementById('start-btn'); // Button to start the quiz
const welcomeScreen = document.getElementById('welcome-screen'); // Welcome screen element
const quizEl = document.getElementById('quiz'); // Quiz container element
const questionEl = document.getElementById('question'); // Element to display the question
const choicesEl = document.getElementById('choices'); // Element to display choices
const nextBtn = document.getElementById('next-btn'); // Button to proceed to the next question
const scoreContainer = document.getElementById('score-container'); // Element to display the final score
const scoreEl = document.getElementById('score'); // Element to display the score value

// Start quiz when the start button is clicked
startBtn.addEventListener('click', () => {
  welcomeScreen.classList.add('hidden'); // Hide the welcome screen
  quizEl.classList.remove('hidden'); // Show the quiz container
  loadQuestion(); // Load the first question
});

// Load the current question and choices
function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex]; // Get the current question data
  questionEl.textContent = currentQuestion.question; // Display the question text
  choicesEl.innerHTML = ''; // Clear previous choices

  // Create and display list items for each choice
  currentQuestion.choices.forEach(choice => {
    const li = document.createElement('li'); // Create a new list item
    li.textContent = choice; // Set the text of the list item
    li.addEventListener('click', () => {
      // Disable further clicking on choices
      Array.from(choicesEl.children).forEach(c => c.style.pointerEvents = 'none');
      // Check if the clicked choice is correct
      if (choice === currentQuestion.answer) {
        li.classList.add('correct'); // Highlight correct choice
        score++; // Increment score
      } else {
        li.classList.add('incorrect'); // Highlight incorrect choice
        // Highlight the correct choice
        Array.from(choicesEl.children).forEach(c => {
          if (c.textContent === currentQuestion.answer) {
            c.classList.add('correct');
          }
        });
      }
      nextBtn.classList.remove('hidden'); // Show the "Next" button
    });
    choicesEl.appendChild(li); // Add the list item to the choices container
  });

  nextBtn.classList.add('hidden'); // Hide the "Next" button initially
}

// Handle click on the "Next" button
nextBtn.addEventListener('click', () => {
  currentQuestionIndex++; // Move to the next question
  if (currentQuestionIndex < quizData.length) {
    loadQuestion(); // Load the next question
  } else {
    showScore(); // Show the final score if there are no more questions
  }
});

// Display the final score
function showScore() {
  quizEl.classList.add('hidden'); // Hide the quiz container
  scoreContainer.classList.remove('hidden'); // Show the score container
  scoreEl.textContent = `${score} out of ${quizData.length}`; // Display the score
}
