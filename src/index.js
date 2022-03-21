import "./index.css";
import FormValidator from "./components/FormValidator.js";
import Modal from "./components/Modal.js";
import {
  getInitialData
} from "./components/utils.js";
import {
  allModals,
  profilePictureElement
} from "./utils/constants.js";

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  errorClass: "error-message_visible",
  inputInvalidClass: "form__input_invalid",
  buttonSelector: ".form__save-btn",
  buttonDisabledClass: "form__save-btn_disabled",
};

new FormValidator(validationConfig).enableValidation();

// get initial info from server
getInitialData();

allModals.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close-btn")
    ) {
      new Modal().closePopup(popup);
    }
  });
});

profilePictureElement.addEventListener("click", new Modal().openAvatarPopup);
