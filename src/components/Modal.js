// import {
//   patchProfileInfo,
//   patchAvatar
// } from "./Api.js";
import Api from "./Api.js";
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
  avatarSubmitButton
} from "../utils/constants.js";

class Modal {
  constructor() {
    this._api = new Api();
  }

  openPicContainer(evt) {
    popupImg.src = evt.target.src;
    popupImg.alt = evt.target.alt;
    imgTitle.textContent = evt.target.alt;

    openPopup(popupOpenPic);
  };

  openProfilePopup() {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;

    openPopup(popupEditProfile);
  };

  openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closeOnEsc);
  };

  closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeOnEsc);
  };

  submitProfileInfo(evt) {
    evt.preventDefault();
    profileSubmitButton.textContent = "Сохранение...";
    this._api.patchProfileInfo(profileNameInput.value, profileDescriptionInput.value)
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

  submitAvatar(evt) {
    evt.preventDefault();
    avatarSubmitButton.textContent = "Сохранение...";
    this._api.patchAvatar(avatarLinkInput.value)
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

  closeOnEsc(evt) {
    if (evt.key === "Escape") {
      const activePopup = document.querySelector(".popup_opened");

      if (activePopup) closePopup(activePopup);
    }
  }

  //editProfileBtn.addEventListener("click", openProfilePopup);
  //formEditProfile.addEventListener("submit", submitProfileInfo);
  //formEditAvatar.addEventListener("submit", submitAvatar);

  openAvatarPopup() {
    openPopup(popupAvatar);
  };
}
