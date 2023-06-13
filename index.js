// Registration form validation
const registrationForm = document.getElementById("registrationForm");
registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();
  
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const termsInput = document.getElementById("terms");
  
  const username = usernameInput.value.toLowerCase();
  const email = emailInput.value.toLowerCase();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  
  // Reset error messages
  const errorDisplay = document.getElementById("errorDisplay");
  errorDisplay.style.display = "none";
  errorDisplay.innerHTML = "";
  
  // Username validation
  if (username.trim() === "") {
    showError("Username cannot be blank.", usernameInput);
    return;
  }
  if (username.length < 4) {
    showError("Username must be at least four characters long.", usernameInput);
    return;
  }
  if (!hasUniqueCharacters(username)) {
    showError("Username must contain at least two unique characters.", usernameInput);
    return;
  }
  if (!/^[A-Za-z0-9]+$/.test(username)) {
    showError("Username cannot contain special characters or whitespace.", usernameInput);
    return;
  }
  
  // Email validation
  if (email.trim() === "") {
    showError("Email cannot be blank.", emailInput);
    return;
  }
  if (!isValidEmail(email)) {
    showError("Email must be a valid email address.", emailInput);
    return;
  }
  if (email.endsWith("example.com")) {
    showError("Email cannot be from the domain 'example.com'.", emailInput);
    return;
  }
  
  // Password validation
  if (password.length < 12) {
    showError("Password must be at least 12 characters long.", passwordInput);
    return;
  }
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    showError("Password must have at least one uppercase and one lowercase letter.", passwordInput);
    return;
  }
  if (!/\d/.test(password)) {
    showError("Password must contain at least one number.", passwordInput);
    return;
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    showError("Password must contain at least one special character.", passwordInput);
    return;
  }
  if (password.toLowerCase().includes("password")) {
    showError("Password cannot contain the word 'password'.", passwordInput);
    return;
  }
  if (password.toLowerCase().includes(username)) {
    showError("Password cannot contain the username.", passwordInput);
    return;
  }
  if (password !== confirmPassword) {
    showError("Passwords do not match.", confirmPasswordInput);
    return;
  }
  
  // Terms and conditions validation
  if (!termsInput.checked) {
    showError("Please accept the terms and conditions.", termsInput);
    return;
  }
  
  // Store user data in localStorage
  const user = {
    username,
    email,
    password
  };
  storeUserData(user);
  
  // Clear form fields and show success message
  registrationForm.reset();
  showSuccess("Registration successful!");
});

// Login form validation
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  
  const loginUsernameInput = document.getElementById("loginUsername");
  const loginPasswordInput = document.getElementById("loginPassword");
  
  const loginUsername = loginUsernameInput.value;
  const loginPassword = loginPasswordInput.value;
  
  // Reset error messages
  const errorDisplay = document.getElementById("errorDisplay");
  errorDisplay.style.display = "none";
  errorDisplay.innerHTML = "";
  
  // Username validation
  if (loginUsername.trim() === "") {
    showError("Username cannot be blank.", loginUsernameInput);
    return;
  }
  if (!usernameExists(loginUsername.toLowerCase())) {
    showError("Invalid username.", loginUsernameInput);
    return;
  }
  
  // Password validation
  if (loginPassword.trim() === "") {
    showError("Password cannot be blank.", loginPasswordInput);
    return;
  }
  if (!validatePassword(loginUsername.toLowerCase(), loginPassword)) {
    showError("Incorrect password.", loginPasswordInput);
    return;
  }
  
  // Clear form fields and show success message
  loginForm.reset();
  showSuccess("Login successful!" + (document.getElementById("keepLoggedIn").checked ? " Keep me logged in." : ""));
});

// Helper functions
function showError(errorMessage, inputElement) {
  const errorDisplay = document.getElementById("errorDisplay");
  errorDisplay.innerHTML = errorMessage;
  errorDisplay.style.display = "block";
  inputElement.focus();
}

function showSuccess(successMessage) {
  const successDisplay = document.getElementById("successDisplay");
  successDisplay.innerHTML = successMessage;
  successDisplay.style.display = "block";
}

function hasUniqueCharacters(string) {
  const characters = new Set(string);
  return characters.size >= 2;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function storeUserData(user) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

function usernameExists(username) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users.some(user => user.username === username);
}

function validatePassword(username, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.username === username);
  return user && user.password === password;
}