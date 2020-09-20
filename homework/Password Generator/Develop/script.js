// Assignment Code
var generateBtn = document.querySelector("#generate");

// Characters and Numbers / variables
var upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lowerCase = "abcdefghijklmnopqrstuvwxyz";
var symbols = "!#$%&'()*+,-./:;?@][^_`{|}~'<=>";
var numbers = "0123456789";
//
var passlength = 0;
var userPassword = "";
var passwordGen = "";

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Setting up password Length from 8-150 character limit
function generatePassword() {
  var passlength = prompt(
    "Please Enter a Number From 8 - 150 to adjust password length."
  );

  while (passlength < 8 || passlength > 150) {
    var passlength = prompt(
      "Enter the correct password length, But must be between 8 - 150 characters"
    );
  }

  // Confirming all characters and numbers to add
  var selectLowerCase = confirm("Add lower-case letters to password?");
  var selectUpperCase = confirm("Add upper-case letters to password?");
  var selectNumber = confirm("Add numbers to password?");
  var selectSymbols = confirm("Add symbols to password?");

  // Adding everything to make password (the Math)
  generatePassword();
  document.getElementById("password").innerHTML = userPassword;

  function generatePassword() {
    if (selectLowerCase) {
      passwordGen += lowerCase;
    }
    if (selectUpperCase) {
      passwordGen += upperCase;
    }
    if (selectNumber) {
      passwordGen += numbers;
    }
    if (selectSymbols) {
      passwordGen += symbols;
    }
    for (var i = 0; i < passlength; i++) {
      userPassword += passwordGen.charAt(
        Math.floor(Math.random() * passwordGen.length)
      );
    }
  }
  return userPassword;
}
