import "./index.css";
import enableValidation from "./components/validate.js";
import { closePopup, openAvatarPopup } from "./components/modal.js";
import { getInitialData } from "./components/utils.js";

const allModals = document.querySelectorAll(".popup");
const profilePictureElement = document.querySelector(".profile__picture");

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  errorClass: "error-message_visible",
  inputInvalidClass: "form__input_invalid",
  buttonSelector: ".form__save-btn",
  buttonDisabledClass: "form__save-btn_disabled",
};

enableValidation(validationConfig);

// get initial info from server
getInitialData();

allModals.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close-btn")
    ) {
      closePopup(popup);
    }
  });
});

profilePictureElement.addEventListener("click", openAvatarPopup);
