import {
  getCards,
  getUserInfo
} from "./api.js";
import { createCard } from "./card.js";

const cardsList = document.querySelector(".location-cards");
const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(".profile__description");
const profilePictureElement = document.querySelector(".profile__picture");

export const getInitialData = () => {

  Promise.all([getUserInfo(), getCards()])
  .then(([userData, cards]) => {
    //render avatar
    renderProfileInfo(userData);

    // add cards from server
    const userId = userData._id;
    cards.forEach((card) =>
      cardsList.prepend(
        createCard(
          card.name,
          card.link,
          card._id,
          card.likes.some((like) => like._id === userId),
          card.likes.length,
          card.owner._id === userId
        )
      )
    );
  })
  .catch((err) => {
    alert("Ошибка");
    console.log(err);
  });
};

const renderProfileInfo = (user) => {
  profileNameElement.textContent = user.name;
  profileDescriptionElement.textContent = user.about;
  profilePictureElement.style = `background-image: url(${user.avatar})`;
};
