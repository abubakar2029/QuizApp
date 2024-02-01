const express = require("express");
const path = require("path");
const app = express();
/* ----uuid-generator-------- */
const { v4: uuidv1 } = require("uuid");

/* middle-ware */
app.use(express.json());

let allStudent = [];

/* STUDENT-LOGIN */
app.post("/student-login", (req, res) => {
  const { email, cnic } = req.body;
  let studentFound = false;

  for (const student of allStudent) {
    if (student.email === email && student.studentCNIC === cnic) {
      studentFound = true;
      break;
    }
  }
  let response = studentFound ? "Successfully Logged In" : "Not Found";
  res.send(response);
});
/* STUDENT-SIGNUP */
app.post("/student-signup", (req, res) => {
  allStudent.push(req.body);
  res.send("Successfully Registered");
});

/* ALL-QUESTIONS */
const questions = [
  {
    statement: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    statement: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Venus", "Jupiter"],
    correctAnswer: "Mars",
  },
  {
    statement: "What is the largest mammal in the world?",
    choices: ["Lion", "Elephant", "Blue Whale", "Giraffe"],
    correctAnswer: "Blue Whale",
  },
  {
    statement: "Which gas do plants absorb from the atmosphere?",
    choices: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Methane"],
    correctAnswer: "Carbon Dioxide",
  },
  {
    statement: "Who wrote the play 'Romeo and Juliet'?",
    choices: [
      "Charles Dickens",
      "William Shakespeare",
      "Jane Austen",
      "F. Scott Fitzgerald",
    ],
    correctAnswer: "William Shakespeare",
  },
];

/* QUIZ-PAGE-REQUEST */
app.post("/get-quiz", (req, res) => {
  res.send(questions);
});

/* QUIZ-SUBMITTED */
const allSubmissions = [];
app.post("/quiz-submit", (req, res) => {
  /* {score: 0, date: '2023-09-17T16:35:57.821Z', response: ''} */
  allSubmissions.push(req.body);
  let response = {
    allSubmissions: allSubmissions,
    currentStatus: "Quiz Submitted",
  };
  res.send(response);
});

app.use(express.static("./build"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build","index.html"));
});
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
