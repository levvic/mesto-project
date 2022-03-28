import "./index.css";
import Api from "./components/Api.js"
import FormValidator from "./components/FormValidator.js";
import PopupWithForm from "./components/PopupWithForm.js"
import PopupWithImage from "./components/PopupWithImage.js";
import {
  getInitialData
} from "./components/utils.js";
import {
  allModals,
  profilePictureElement,
  addCardBtn,
  editProfileBtn
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

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort7",
  headers: {
    authorization: "bc5524e6-2f6e-4891-adc9-e477685018b2",
    "Content-Type": "application/json",
  }
});

//const changeAvatar = api.patchAvatar();

const popupEditAvatar = new PopupWithForm("#popup_change-avatar", (value) => {
  api.patchAvatar(value.link)
    .then()
    .catch(error => console.log(error))
})

popupEditAvatar.setEventListeners();

profilePictureElement.addEventListener("click", () => popupEditAvatar.openPopup());


const popupAddCard = new PopupWithForm("#popup_add-card", (value) => {
  api.postCard(value.name, value.link)
    .then()
    .catch(error => console.log(error))
})
popupAddCard.setEventListeners();
addCardBtn.addEventListener("click", () => popupAddCard.openPopup());

const profilePopup = new PopupWithForm('#popup_edit-profile', (value) => {
  api.patchProfileInfo(value.name, value.description)
    .then()
    .catch(error => console.log(error))
})
profilePopup.setEventListeners();
editProfileBtn.addEventListener("click", () => profilePopup.openPopup());



//newCardSelector.addEventListener("click", () => new Popup("#popup_pic").openPopup());
