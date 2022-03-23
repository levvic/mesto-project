import Api from "./Api.js";
import Card from "./Card.js";

import {
  cardsList,
  profileNameElement,
  profileDescriptionElement,
  profilePictureElement,
  cardNameInput,
  cardLinkInput,
} from "../utils/constants.js";


export const getInitialData = () => {

  const api = new Api();

  Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userData, cards]) => {
      //render avatar
      renderProfileInfo(userData);

      // add cards from server
      const userId = userData._id;
      cards.forEach((card) =>
        cardsList.prepend(
          new Card({
            putLike: () => api.putLike(card._id),
            deleteLike: () => api.deleteLike(card._id),
            postCard: () => api.postCard(cardNameInput.value, cardLinkInput.value),
            deleteCard: () => api.deleteCard(card._id)
          }).createCard(
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
