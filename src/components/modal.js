import { patchProfileInfo, patchAvatar } from "./Api.js";
import {
  popupEditProfile,
  popupOpenPic,
  popupAvatar,
  editProfileBtn,
  popupImg,
  imgTitle,
  profileName,
  profileDescription,
  formEditProfile,
  formEditAvatar,
  profileNameInput,
  profileDescriptionInput,
  avatarLinkInput,
  profilePictureElement,
  profileSubmitButton,
  avatarSubmitButton,
} from "../utils/constants.js";

const openPicContainer = (evt) => {
  popupImg.src = evt.target.src;
  popupImg.alt = evt.target.alt;
  imgTitle.textContent = evt.target.alt;

  openPopup(popupOpenPic);
};

const openProfilePopup = () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  openPopup(popupEditProfile);
};

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEsc);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEsc);
};

const submitProfileInfo = (evt) => {
  evt.preventDefault();
  profileSubmitButton.textContent = "Сохранение...";
  patchProfileInfo(profileNameInput.value, profileDescriptionInput.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      alert("Ошибка");
      console.log(err);
    })
    .finally(() => {
      profileSubmitButton.textContent = "Сохранить";
    });
};

const submitAvatar = (evt) => {
  evt.preventDefault();
  avatarSubmitButton.textContent = "Сохранение...";
  patchAvatar(avatarLinkInput.value)
    .then(() => {
      profilePictureElement.style = `background-image: url(${avatarLinkInput.value})`;
      closePopup(popupAvatar);
    })
    .catch((err) => {
      alert("Ошибка");
      console.log(err);
    })
    .finally(() => {
      avatarSubmitButton.textContent = "Сохранить";
    });
};

function closeOnEsc(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");

    if (activePopup) closePopup(activePopup);
  }
}

editProfileBtn.addEventListener("click", openProfilePopup);
formEditProfile.addEventListener("submit", submitProfileInfo);
formEditAvatar.addEventListener("submit", submitAvatar);

const openAvatarPopup = () => {
  openPopup(popupAvatar);
};

export { openPicContainer, closePopup, openPopup, openAvatarPopup };
