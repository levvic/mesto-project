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

const renderCard = function (data, userData, templateSelector) {

  const card = new Card({
      id: data.id,
      name: data.name,
      link: data.link,
      likeNmbr: data.likeNmbr,
      likedByMe: userData.likedByMe,
      createdByMe: userData.createdByMe,
      handleCardClick: (evt) => {
        picturePopup.openPopup(evt)
      },
      handleDeleteCard: (element, cardId) => {
        api.deleteCard(cardId)
          .then((res) => {
            if (res) {
              element.remove();
            }
          })
          .catch((error) => {
            console.log(error);
          })
      },
      handleLikeCard: (cardId) => {

        if (card.likedByMe) {
          api.deleteLike(cardId)
            .then((data) => {
              card.updateLikeCounter(data._id, data.likes.length);
            })
            .catch((err) => {
              alert("Ошибка");
              console.log(err);
            });
        } else {
          api.putLike(cardId)
            .then((data) => {
              card.updateLikeCounter(data._id, data.likes.length);
            })
            .catch((err) => {
              alert("Ошибка");
              console.log(err);
            });
        }

      }
    },
    templateSelector
  );

  return card;

}





//avatar popup
const popupEditAvatar = new PopupWithForm("#popup_change-avatar", (value) => {
  api.patchAvatar(value.link)
    .then(
      popupEditAvatar.closePopup()
    )
    .catch(error => console.log(error))
});
popupEditAvatar.setEventListeners();
profilePictureElement.addEventListener("click", () => popupEditAvatar.openPopup());

//add card popup
const popupAddCard = new PopupWithForm("#popup_add-card", (value) => {
  api.postCard(value.name, value.link)
    .then(
      popupAddCard.closePopup()
    )
    .catch(error => console.log(error))
});
popupAddCard.setEventListeners();
addCardBtn.addEventListener("click", () => popupAddCard.openPopup());

//profile info popup
const profilePopup = new PopupWithForm('#popup_edit-profile', (value) => {
  api.patchProfileInfo(value.name, value.description)
    .then(
      profilePopup.closePopup()
    )
    .catch(error => console.log(error))
});
profilePopup.setEventListeners();
editProfileBtn.addEventListener("click", () => profilePopup.openPopup());

//picture popup
const picturePopup = new PopupWithImage('#popup_pic');
picturePopup.setEventListeners();
