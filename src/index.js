import "./index.css";
import Api from "./components/Api.js"
import Section from "./components/Section.js"
import FormValidator from "./components/FormValidator.js";
import PopupWithForm from "./components/PopupWithForm.js"
import PopupWithImage from "./components/PopupWithImage.js";
import {
  cardsListSelector,
  cardTemplate,
  addCardBtn,
  editProfileBtn,
  profileNameSelector,
  profileDescriptionSelector,
  profileSubmitButton,
  avatarSubmitButton,
  newCardSubmitButton,
  profilePictureSelector
} from "./utils/constants.js";
import UserInfo from "./components/UserInfo";

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  errorClass: "error-message_visible",
  inputInvalidClass: "form__input_invalid",
  buttonSelector: ".form__save-btn",
  buttonDisabledClass: "form__save-btn_disabled",
};

const validator = new FormValidator(validationConfig);
validator.enableValidation();

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort7",
  headers: {
    authorization: "bc5524e6-2f6e-4891-adc9-e477685018b2",
    "Content-Type": "application/json",
  }
});

const user = new UserInfo({
  userNameSelector: profileNameSelector,
  userDescriptionSelector: profileDescriptionSelector,
  avatarSelector: profilePictureSelector
});

const sectionWithCards = new Section({
  items: {},
  renderer: (cardData, userData) => {

    // get prepeared card
    const card = renderCard(cardData, userData, cardTemplate);

    // get element of card
    const cardElement = card.createCardElement();

    // add element to DOM
    sectionWithCards.addItem(cardElement);
  }
}, cardsListSelector);

const promises = [api.getUserInfo(), api.getCards()];

Promise.all(promises)
  .then(([userData, cards]) => {

    // render profile info
    user.setUserInfo(userData.name, userData.about, userData.avatar);

    const sectionWithCards = new Section({
      items: { cards },
      renderer: (cardData) => {

        // get prepeared card
        const card = renderCard(cardData, userData, cardTemplate);

        // get element of card
        const cardElement = card.createCardElement();

        // add element to DOM
        sectionWithCards.addItem(cardElement);
      }
    }, cardsListSelector);

    // render cards
    sectionWithCards.renderItems();

  })
  .catch((error) => {
    console.log(error)
  });



const renderCard = function (cardData, userData, templateSelector) {

  const card = new Card({
    id: cardData.id,
    name: cardData.name,
    link: cardData.link,
    likeNmbr: cardData.likes.length,
    likedByMe: cardData.likes.some(like => like._id === userData._id),
    createdByMe: cardData.owner._id === userData._id,
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
  avatarSubmitButton.textContent = "Сохранение...";
  api.patchAvatar(value.link)
    .then(() => {
      popupEditAvatar.closePopup();
      validator.disableButton(avatarSubmitButton);
    })
    .catch(error => console.log(error))
    .finally(() => {
      avatarSubmitButton.textContent = "Сохранить";
    });
});
popupEditAvatar.setEventListeners();
document.querySelector(profilePictureSelector).addEventListener("click", () => popupEditAvatar.openPopup());
validator.disableButton(avatarSubmitButton);

//add card popup
const popupAddCard = new PopupWithForm("#popup_add-card", (value) => {

  newCardSubmitButton.textContent = "Создание...";
  console.log(value);
  api.postCard(value.name, value.link)
    .then(() => {
      popupAddCard.closePopup();
      validator.disableButton(newCardSubmitButton);
    })
    .catch(error => console.log(error))
    .finally(() => {
      newCardSubmitButton.textContent = "Создать";
    });
});
popupAddCard.setEventListeners();
addCardBtn.addEventListener("click", () => popupAddCard.openPopup());
validator.disableButton(newCardSubmitButton);

//profile info popup
const profilePopup = new PopupWithForm('#popup_edit-profile', (value) => {
  profileSubmitButton.textContent = "Сохранение...";
  api.patchProfileInfo(value.name, value.description)
    .then(() => {
      profilePopup.closePopup();
      validator.disableButton(profileSubmitButton);
    })
    .catch(error => console.log(error))
    .finally(() => {
      profileSubmitButton.textContent = "Сохранить";
    });
});
profilePopup.setEventListeners();
editProfileBtn.addEventListener("click", () => profilePopup.openPopup());
validator.disableButton(profileSubmitButton);

//picture popup
const picturePopup = new PopupWithImage('#popup_pic');
picturePopup.setEventListeners();
