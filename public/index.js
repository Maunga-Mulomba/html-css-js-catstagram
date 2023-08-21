import { createMainContent } from "./main.js";

const initializePage = () => {
  // Create container
  const container = document.createElement("section");
  container.id = "page";
  container.className = "container";
  document.body.appendChild(container);
};

const displayVotes = () => {
  // create the score
  const container = document.createElement("section");
  container.className = "container";

  let statusMessage = document.createElement("p");
  statusMessage.textContent = "Popularity score: ";

  let score = document.createElement("span");
  score.id = "score";

  // add components to body
  statusMessage.appendChild(score);
  container.appendChild(statusMessage);
  document.body.appendChild(container);

  // restore score
  let savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    let parsedScore = parseInt(savedScore);
    score.textContent = parsedScore;
  } else {
    score.textContent = 0;
  }
};

const addButtons = () => {
  // add the buttons
  let buttonContainer = document.createElement("div");
  buttonContainer.id = "buttonContainer";

  let upvoteBtn = document.createElement("button");
  upvoteBtn.id = "upvoteBtn";
  createButton(upvoteBtn, "Upvote", 1);

  let downvoteBtn = document.createElement("button");
  downvoteBtn.id = "downvoteBtn";
  createButton(downvoteBtn, "Downvote", -1);

  // append
  buttonContainer.appendChild(upvoteBtn);
  buttonContainer.appendChild(downvoteBtn);
  document.body.appendChild(buttonContainer);
};

const createButton = (button, textcontent, amount) => {
  button.textContent = textcontent;

  button.addEventListener("click", (event) => {
    let currentScore = parseInt(score.textContent);
    let newScore = currentScore + amount;
    score.textContent = newScore.toString();

    // store the new score
    localStorage.setItem("score", newScore.toString());
  });
};

const addComments = () => {
  // add a comment
  let container = document.createElement("div");
  container.className = "container";
  container.id = "add-comment-container";

  // add comment text
  let comment = document.createElement("p");
  comment.textContent = "Comment: ";

  // add input field
  let inputField = document.createElement("input");
  inputField.id = "input";
  inputField.type = "text";
  inputField.placeholder = "Add a comment...";

  // add submit button
  let submitButton = document.createElement("button");
  submitButton.id = "submit-btn";
  submitButton.textContent = "Submit";

  // append components
  container.appendChild(comment);
  container.appendChild(inputField);
  container.appendChild(submitButton);
  document.body.appendChild(container);

  // submit comment
  showComments(inputField, submitButton);
};

const showComments = (inputField, submitButton) => {
  // create comment section
  let commentSection = document.createElement("div");
  commentSection.id = "commentSection";
  document.body.appendChild(commentSection);

  let list = document.createElement("ul");
  list.id = 'listOfComments'

  let savedComments = localStorage.getItem("listState");
  if (savedComments) {
    list.innerHTML = savedComments;
  } else {
    list.innerHTML = "";
  }

  // Append the list to the comment section outside of the event listener
  commentSection.append(list);

  submitButton.addEventListener("click", (event) => {
    let input = inputField.value;

    if (input.trim() !== "") {
      let comment = document.createElement("li");
      comment.textContent = input;
      list.appendChild(comment);
      inputField.value = "";

      // save to storage
      const listState = list.innerHTML;
      console.log(listState)
      localStorage.setItem("listState", listState);
    }
  });
};

window.onload = () => {
  // restore

  initializePage();
  createMainContent();
  displayVotes();
  addButtons();
  addComments();
};
