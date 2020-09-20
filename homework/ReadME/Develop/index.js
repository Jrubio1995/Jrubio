// module containing the function that dynamically generates the markdown
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateMarkdown = require("./utils/generateMarkdown");
const writeFileAsync = util.promisify(writeToFile);

// array of questions for user
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of this project?",
  },
  {
    type: "input",
    name: "description",
    message: "Enter a small description of this project.",
  },
  {
    type: "input",
    name: "installation",
    message: "Enter the steps to install this project.",
  },
  {
    type: "input",
    name: "usage",
    message: "Enter instructions and/or examples for this project usage.",
  },
  {
    type: "input",
    name: "contributing",
    message:
      "Would you like others to contribute to this project? If so please enter Step to do so.",
  },
  {
    type: "list",
    name: "license",
    message: "Pick a license for this app.",
    choices: ["MIT", "ODbL", "ISC", "Unlicense", "Zlib"],
  },
  {
    type: "input",
    name: "username",
    message: "What is your GitHub Username?",
  },
  {
    type: "input",
    name: "email",
    message: "Please enter your email?",
  },
];

// function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("README.md Generated!");
  });
}

// function to initialize program
// inquirer npm
async function init() {
  try {
    const data = await inquirer.prompt(questions);
    console.log("User Responses: ", data);

    // generating README.md using the user's answers and the user data from the github api
    const readMe = generateMarkdown(data);
    console.log(readMe);

    // writing the generated readme.md to the file
    await writeFileAsync("README.md", readMe);
  } catch (err) {
    console.log(err);
  }
}

// function call to initialize program
init();
