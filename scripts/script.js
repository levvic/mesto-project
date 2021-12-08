document.addEventListener('DOMContentLoaded', function(event) {

  const popupEditProfile = document.querySelector('#popup_edit-profile');
  const popupAddCard = document.querySelector('#popup_add-card');
  const popupOpenPic = document.querySelector('#popup_pic');
  const editProfileBtn = document.querySelector('.profile__edit-btn');
  const closeProfileFormBtn = document.querySelector('#close_edit-profile');
  const closeCardFormBtn = document.querySelector('#close_add-card');
  const closePictureBtn = document.querySelector('#close_show-pic');
  const cardsSection = document.querySelector('.location-cards');
  const addCardBtn = document.querySelector('.profile__add-card-btn');
  const popupImg = document.querySelector('.pic-container__image');
  const imgTitle = document.querySelector('.pic-container__caption');

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

    const openPicContainer = (evt) => {
      popupImg.src = evt.target.src;
      popupImg.alt = evt.target.alt;
      imgTitle.textContent = evt.target.alt;
      popupOpenPic.classList.add('popup_opened');
    }

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

    const card = document.querySelector('.location-card');
    const likeBtn = card.querySelector('.location-card__like-btn');
    likeBtn.addEventListener('click', toggleLikeBtn);
    const deleteBtn = card.querySelector('.location-card__delete-btn');
    deleteBtn.addEventListener('click', deleteCard);

    const cardImg = card.querySelector('.location-card__image');
    cardImg.addEventListener('click', openPicContainer);
  }


  const addInitialCards = () => initialCards.forEach(card => addCard(card.name, card.link));
  addInitialCards();

  const openProfilePopup = () => {
    popupEditProfile.querySelector('input[name="name"]').value = document.querySelector('.profile__name').textContent;
    popupEditProfile.querySelector('input[name="description"]').value = document.querySelector('.profile__description').textContent;
    popupEditProfile.classList.add('popup_opened');
  }

  const openCardPopup = () => popupAddCard.classList.add('popup_opened');

  const closePopup = () => {
    document.querySelector('.popup_opened').classList.add('fade-out');
    setTimeout(function(){
      document.querySelector('.popup_opened').classList.remove('popup_opened', 'fade-out');
    }, 1000);
  }

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
  closePictureBtn.addEventListener('click', closePopup);
  addCardBtn.addEventListener('click', openCardPopup);
  popupEditProfile.addEventListener('submit', formSubmitHandler);
  popupAddCard.addEventListener('submit', formSubmitHandler);

});


