export const cardsListSelector = ".location-cards";
export const profileNameSelector = ".profile__name";
export const profileDescriptionSelector = ".profile__description";
export const profilePictureSelector = ".profile__picture";

export const allModals = document.querySelectorAll(".popup");

export const popupEditProfile = document.querySelector("#popup_edit-profile");
export const popupOpenPic = document.querySelector("#popup_pic");
export const popupAvatar = document.querySelector("#popup_change-avatar");
export const editProfileBtn = document.querySelector(".profile__edit-btn");
export const popupImg = document.querySelector(".pic-container__image");
export const imgTitle = document.querySelector(".pic-container__caption");
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__description");
export const formEditProfile = document.querySelector(".form-name");
export const formEditAvatar = document.querySelector(".form-avatar");
export const profileNameInput = popupEditProfile.querySelector('input[name="name"]');
export const profileDescriptionInput = popupEditProfile.querySelector('input[name="description"]');
export const avatarLinkInput = popupAvatar.querySelector('input[name="link"]');
export const profileSubmitButton = popupEditProfile.querySelector(".form__save-btn");
export const avatarSubmitButton = popupAvatar.querySelector(".form__save-btn");

export const cardTemplate = "#card-template";
export const popupAddCard = document.querySelector("#popup_add-card");
export const addCardBtn = document.querySelector(".profile__add-card-btn");
export const cardNameInput = popupAddCard.querySelector('input[name="name"]');
export const cardLinkInput = popupAddCard.querySelector('input[name="link"]');
export const newCardSubmitButton = popupAddCard.querySelector(".form__save-btn");
export const formAddCard = document.querySelector(".form-card");
export const buttonDisabledClass = "form__save-btn_disabled";
export const likeBtnActiveClass = "location-card__like-btn_active";
export const newCardSelector = ".location-card";
export const cardImgSelector = ".location-card__image";
export const newCardNameSelector = ".location-card__name";
export const likeBtnSelector = ".location-card__like-btn";
export const deleteBtnSelector = ".location-card__delete-btn";
export const numberOfLikesSelector = ".location-card__like-number";
