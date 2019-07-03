import * as firebase from "firebase";

const markup = /*html*/ `
  <h1>Login</h1>

  <div id="login_error"></div>
  <input type="text" id="l_email" placeholder="Email"/>
  <input type="text" id="l_password" placeholder="Password"/>
  <button id="submit_l">Login</button>

  <h1>Register</h1>

  <div id="register_error"></div>
  <input type="text" id="r_email" placeholder="Email"/>
  <input type="text" id="r_password" placeholder="Password"/>
  <button id="submit_r">Register</button>
  `;

function Auth() {
  root.innerHTML = markup;

  submit_l.addEventListener("click", () => {
    submit_l.disabled = true;

    const loginEmail = l_email.value;
    const loginPass = l_password.value;
    this.signIn(loginEmail, loginPass)
      .then(err => {
        submit_l.disabled = false;
        this.redirect("/chat", { email: loginEmail });
      })
      .catch(err => {
        login_error.innerHTML = err.message;
        login_error.style.opacity = 1;
        submit_l.disabled = false;
      });
  });

  submit_r.addEventListener("click", () => {
    submit_r.disabled = true;

    const regEmail = r_email.value;
    const regPass = r_password.value;
    this.signUp(regEmail, regPass)
      .then(err => {
        console.log(err);
        submit_r.disabled = false;
      })
      .catch(err => {
        register_error.innerHTML = err.message;
        register_error.style.opacity = 1;
        submit_r.disabled = false;
      });
  });
}

export default Auth;
