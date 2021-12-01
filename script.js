document.addEventListener('DOMContentLoaded', function(event) {

  const popupEditProfile = document.querySelector('#popup_edit-profile');
  const popupAddCard = document.querySelector('#popup_add-card');
  const editProfileBtn = document.querySelector('.profile__edit-btn');
  const closeProfileFormBtn = document.querySelector('#close_edit-profile');
  const closeCardFormBtn = document.querySelector('#close_add-card');
  const cardsSection = document.querySelector('.location-cards');
  const addCardBtn = document.querySelector('.profile__add-card-btn');
  let likeBtnList;
  let deleteBtnList;

  // photos
  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
    ];



  const toggleLikeBtn = (evt) => evt.srcElement.classList.toggle("location-card__like-btn_active");

  const deleteCard = (evt) => evt.srcElement.parentNode.remove();

  const addCard = (cardName, cardLink) => {
    cardsSection.insertAdjacentHTML('afterbegin',
      `<li class="location-card">
        <button type="button" class="location-card__delete-btn" aria-label="Удалить"></button>
        <img src="${cardLink}" alt="${cardName}" class="location-card__image">
        <div class="location-card__description">
          <h2 class="location-card__name">
            ${cardName}
          </h2>
          <button type="button" class="location-card__like-btn" aria-label="Мне нравится"></button>
        </div>
      </li>`);

    likeBtnList = document.querySelectorAll('.location-card__like-btn');
    deleteBtnList = document.querySelectorAll('.location-card__delete-btn');
    likeBtnList.forEach(likeBtn => likeBtn.addEventListener('click', toggleLikeBtn));
    deleteBtnList.forEach(deleteBtn => deleteBtn.addEventListener('click', deleteCard));
  }


  const addInitialCards = () => initialCards.forEach(card => addCard(card.name, card.link));
  addInitialCards();

  const openProfilePopup = () => {
    popupEditProfile.querySelector('input[name="name"]').value = document.querySelector('.profile__name').textContent;
    popupEditProfile.querySelector('input[name="description"]').value = document.querySelector('.profile__description').textContent;
    popupEditProfile.classList.add('popup_opened');
  }

  const openCardPopup = () => popupAddCard.classList.add('popup_opened');

  const closePopup = () => document.querySelector('.popup_opened').classList.remove('popup_opened');

  const updateProfileInfoOnPage = () => {
    document.querySelector('.profile__name').textContent = popupEditProfile.querySelector('input[name="name"]').value;
    document.querySelector('.profile__description').textContent = popupEditProfile.querySelector('input[name="description"]').value;
  }

  const formSubmitHandler = (evt) => {
    evt.preventDefault();

    if(evt.srcElement.className === 'form-name')
      updateProfileInfoOnPage();
    else if(evt.srcElement.className === 'form-card')
      addCard(popupAddCard.querySelector('input[name="name"]').value, popupAddCard.querySelector('input[name="link"]').value);

    closePopup();
  }


  editProfileBtn.addEventListener('click', openProfilePopup);
  closeProfileFormBtn.addEventListener('click', closePopup);
  closeCardFormBtn.addEventListener('click', closePopup);
  addCardBtn.addEventListener('click', openCardPopup);
  popupEditProfile.addEventListener('submit', formSubmitHandler);
  popupAddCard.addEventListener('submit', formSubmitHandler);

});


