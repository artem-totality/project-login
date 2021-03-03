import "bootstrap/dist/css/bootstrap.css";
import "../css/style.css";

import UI from "./config/ui.config";
import { validate } from "./helpers/validate";
import { showInputError, rempoveInputError } from "./views/form";
import { login } from "./services/auth.service";
import { notify } from "./views/notifications";
import { getNews } from "./services/news.service";

const {
  navTabs,

  loginCard,
  loginForm,
  inputLoginEmail,
  inputLoginPassword,

  registrationCard,
  registrationForm,
  inputRegistrationEmail,
  inputRegistrationPassword,
  inputNickname,
  inputFirstName,
  inputLastName,
  inputPhone,
  selectGenderOrientation,
  inputCity,
  inputCountry,
  inputDateOfBirth,
} = UI;

const loginInputs = [inputLoginEmail, inputLoginPassword];
const registrationInputs = [
  registrationForm,
  inputRegistrationEmail,
  inputRegistrationPassword,
  inputNickname,
  inputFirstName,
  inputLastName,
  inputPhone,
  selectGenderOrientation,
  inputCity,
  inputCountry,
  inputDateOfBirth,
];

// Events
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmitLogin();
});

loginInputs.forEach((el) =>
  el.addEventListener("focus", () => rempoveInputError(el))
);

navTabs.addEventListener("click", (e) => {
  e.preventDefault();
  onTabClick(e);
});

// Handlers
async function onSubmitLogin() {
  const isValidForm = loginInputs.every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    await login(inputLoginEmail.value, inputLoginPassword.value);
    await getNews();
    form.reset();
    // show success notify
    notify({ msg: "Login success", className: "alert-success", timeout: 1000 });
  } catch (err) {
    // show error notify
    notify({ msg: "Login faild", className: "alert-danger" });
  }
}

function onTabClick(e) {
  let target = e.target;

  if (
    target.tagName.toUpperCase() !== "A" ||
    target.classList.contains("active")
  )
    return;

  navTabs.querySelectorAll("a").forEach((el) => el.classList.remove("active"));
  target.classList.add("active");

  const cardsInTabs = navTabs.parentElement.querySelectorAll(".card-body");
  cardsInTabs.forEach((el) => el.classList.add("d-none"));

  const activeCard = document
    .getElementById(target.dataset.ref)
    .classList.remove("d-none");
}
