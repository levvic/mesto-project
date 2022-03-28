import Api from "./Api.js";
import Card from "./Card.js";

import {
  cardsList,
  profileNameElement,
  profileDescriptionElement,
  profilePictureElement,
  cardNameInput,
  cardLinkInput,
  popupAddCard
} from "../utils/constants.js";


export const getInitialData = () => {

  const config = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort7",
    headers: {
      authorization: "bc5524e6-2f6e-4891-adc9-e477685018b2",
      "Content-Type": "application/json",
    }
  };

  const api = new Api(config);

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
            deleteCard: () => api.deleteCard(card._id),

            // openPopup: () => popup.openPopup(popupAddCard),
            // closePopup: () => popup.closePopup(popupAddCard),
            // openPicContainer: () => popup.openPopup()

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
