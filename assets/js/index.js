const nameRegex = /^[A-Z][A-Za-z\s]{2,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

function login() {
  const email = document.getElementById("signInEmail").value;
  const password = document.getElementById("signInPassword").value;

  // Clear errors
  document.getElementById("emailError").innerHTML = "";
  document.getElementById("passwordError").innerHTML = "";

  let valid = true;

  if (!emailRegex.test(email)) {
    document.getElementById("emailError").innerHTML =
      "<span style='color:red'>Invalid email format.</span>";
    valid = false;
  }

  if (!passwordRegex.test(password)) {
    document.getElementById("passwordError").innerHTML =
      "<span style='color:red'>Password must be 6+ chars, include letters & numbers.</span>";
    valid = false;
  }

  if (!valid) return;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!currentUser) {
    document.getElementById("emailError").innerHTML =
      "<span style='color:red'>Invalid email or password. Try again or sign up.</span>";
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  window.location.href = "main.html";
}

function signUp() {
  const name = document.getElementById("signUpName").value;
  const email = document.getElementById("signUpEmail").value;
  const password = document.getElementById("signUpPassword").value;

  // Clear errors
  document.getElementById("nameError").innerHTML = "";
  document.getElementById("signUpEmailError").innerHTML = "";
  document.getElementById("signUpPasswordError").innerHTML = "";

  let valid = true;

  if (!nameRegex.test(name)) {
    document.getElementById("nameError").innerHTML =
      "<span style='color:red'>Invalid name. Start with a capital letter (min 3 chars).</span>";
    valid = false;
  }

  if (!emailRegex.test(email)) {
    document.getElementById("signUpEmailError").innerHTML =
      "<span style='color:red'>Invalid email format.</span>";
    valid = false;
  }

  if (!passwordRegex.test(password)) {
    document.getElementById("signUpPasswordError").innerHTML =
      "<span style='color:red'>Password must be 6+ chars, include letters & numbers.</span>";
    valid = false;
  }

  if (!valid) return;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some((u) => u.email === email)) {
    document.getElementById("signUpEmailError").innerHTML =
      "<span style='color:red'>User already exists. Please sign in.</span>";
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "signin.html";
}

function displayUser() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "signin.html";
    return;
  }
  document.getElementById(
    "username"
  ).textContent = `Welcome, ${currentUser.name}`;
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "signin.html";
}
