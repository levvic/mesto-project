import "./index.css";
import Api from "./components/Api.js"
import Section from "./components/Section.js"
import Card from "./components/Card.js"
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
  profilePictureSelector,
  formAddCardSelector,
  formEditProfileSelector,
  formEditAvatarSelector,
  likeBtnSelector,
  deleteBtnSelector,
  cardImgSelector,
  likeBtnActiveClass,
  newCardNameSelector
} from "./utils/constants.js";
import UserInfo from "./components/UserInfo";

const validationConfig = {
  inputSelector: ".form__input",
  errorClass: "error-message_visible",
  inputInvalidClass: "form__input_invalid",
  buttonSelector: ".form__save-btn",
  buttonDisabledClass: "form__save-btn_disabled",
};

const cardFormValidator = new FormValidator(validationConfig, formAddCardSelector);
cardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(validationConfig, formEditProfileSelector);
profileFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validationConfig, formEditAvatarSelector);
avatarFormValidator.enableValidation();

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

const sectionObj = new Section({
  items: {},
  renderer: (cardData, userData) => {

    // get prepared card
    const card = renderCard(cardData, userData._id, cardTemplate);

    // get element of card
    const cardElement = card.createCardElement();

    // add element to DOM
    sectionObj.addItem(cardElement);
  }
}, cardsListSelector);

const promises = [api.getUserInfo(), api.getCards()];

Promise.all(promises)
  .then(([userData, cards]) => {

    // render profile info
    user.setUserInfo(userData._id, userData.name, userData.about, userData.avatar);

    const sectionWithCards = new Section({
      items: cards,
      renderer: (cardData) => {

        // get prepared card
        const card = renderCard(cardData, userData._id, cardTemplate);

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



const renderCard = function (cardData, userId, templateSelector) {

  const card = new Card({
      id: cardData._id,
      name: cardData.name,
      link: cardData.link,
      likeNmbr: cardData.likes.length,
      likedByMe: cardData.likes.some(like => like._id === userId),
      createdByMe: cardData.owner._id === userId,
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

        if (card.isCardLikedByMe()) {
          api.deleteLike(cardId)
            .then((data) => {
              card.updateLikeCounter(data.likes.some(like => like._id === userId), data.likes.length);
            })
            .catch((err) => {
              alert("Ошибка");
              console.log(err);
            });
        } else {
          api.putLike(cardId)
            .then((data) => {
              card.updateLikeCounter(data.likes.some(like => like._id === userId), data.likes.length);
            })
            .catch((err) => {
              alert("Ошибка");
              console.log(err);
            });
        }

      }
    },
    templateSelector,
    likeBtnSelector,
    deleteBtnSelector,
    cardImgSelector,
    likeBtnActiveClass,
    newCardNameSelector
  );

  return card;

}

//avatar popup
const popupEditAvatar = new PopupWithForm("#popup_change-avatar", (value) => {
  avatarSubmitButton.textContent = "Сохранение...";
  api.patchAvatar(value.link)
    .then((dataAboutUser) => {
      user.setUserInfo(dataAboutUser._id, dataAboutUser.name, dataAboutUser.about, dataAboutUser.avatar);
      popupEditAvatar.closePopup();
    })
    .catch(error => console.log(error))
    .finally(() => {
      avatarSubmitButton.textContent = "Сохранить";
    });
});
popupEditAvatar.setEventListeners();
document.querySelector(profilePictureSelector).addEventListener("click", () => popupEditAvatar.openPopup());

//add card popup
const popupAddCard = new PopupWithForm("#popup_add-card", (value) => {

  newCardSubmitButton.textContent = "Создание...";
  console.log(value);
  api.postCard(value.name, value.link)
    .then((newCardObj) => {

      // get prepeared card
      const card = renderCard(newCardObj, user._id, cardTemplate);

      // get element of card
      const cardElement = card.createCardElement();

      // add element to DOM
      sectionObj.addItem(cardElement);

      popupAddCard.closePopup();
    })
    .catch(error => console.log(error))
    .finally(() => {
      newCardSubmitButton.textContent = "Создать";
    });
});
popupAddCard.setEventListeners();
addCardBtn.addEventListener("click", () => popupAddCard.openPopup());

//profile info popup
const profilePopup = new PopupWithForm('#popup_edit-profile', (value) => {
  profileSubmitButton.textContent = "Сохранение...";
  api.patchProfileInfo(value.name, value.description)
    .then((dataAboutUser) => {
      user.setUserInfo(dataAboutUser._id, dataAboutUser.name, dataAboutUser.about, dataAboutUser.avatar);
      profilePopup.closePopup();
    })
    .catch(error => console.log(error))
    .finally(() => {
      profileSubmitButton.textContent = "Сохранить";
    });
});
profilePopup.setEventListeners();
editProfileBtn.addEventListener("click", () => profilePopup.openPopup());

//picture popup
const picturePopup = new PopupWithImage('#popup_pic');
picturePopup.setEventListeners();
