# Quiz Application

This is a simple quiz application built using HTML, CSS, and JavaScript. It displays a series of questions and multiple-choice answers, and shows the score at the end of the quiz.

## Features

- **Welcome Screen:** The initial screen with a start button to begin the quiz.
- **Quiz Questions:** Displayed one at a time with multiple-choice answers.
- **Answer Feedback:** Correct and incorrect answers are highlighted.
- **Score Display:** The final score is shown at the end of the quiz.

## Getting Started

### Prerequisites

You need a web browser to run this application.

### Installation

1. Clone the repository or download the zip file.
2. Open the `index.html` file in your web browser.

### Usage

1. Click the **Start Quiz** button on the welcome screen.
2. Answer each question by clicking on the choices.
3. Click the **Next** button to proceed to the next question.
4. At the end of the quiz, your score will be displayed.

## File Structure

- `index.html`: The main HTML file containing the structure of the application.
- `styles.css`: The CSS file for styling the application.
- `script.js`: The JavaScript file containing the logic for the quiz functionality.

## Customization

You can add more questions to the quiz by modifying the `quizData` array in the `script.js` file.

Example:
```javascript
const quizData = [
  {
    question: "New Question?",
    choices: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answer: "Correct Answer"
  },
  // ... more questions
];
