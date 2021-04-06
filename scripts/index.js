import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

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

const profilePopup = document.querySelector('.profile-popup');
const showPopupButton = document.querySelector('.profile__edit-button');

const formElement = profilePopup.querySelector('.form');
const nameInput = profilePopup.querySelector('.form__field_data_name');
const jobInput = profilePopup.querySelector('.form__field_data_occupation');
const inputTitle = document.querySelector('.form__field_data_title');
const inputLink = document.querySelector('.form__field_data_link');

const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const showPopupPicButton = document.querySelector('.profile__add-button');

const popupCard = document.querySelector('.card-popup');
const formCard = popupCard.querySelector('.form');


const elementsContainer = document.querySelector('.elements');


const imagePopup = document.querySelector('.image-popup');
const popupImage = imagePopup.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__caption');

const savePicButton = document.querySelector('.form__save-button_place_card-popup');

const popups = document.querySelectorAll('.popup')

const profileFormElement = document.forms.profile;
const profileFormvalidator = new FormValidator({
        formSelector: '.form',
        inputSelector: '.form__field',
        submitButtonSelector: '.form__save-button',
        inactiveButtonClass: 'form__save-button_invalid',
        inputErrorClass: 'form__field_type_error',
        errorClass: 'form__error_visible'
      }, profileFormElement);

profileFormvalidator.enableValidation();

const cardFormElement = document.forms.card;
const cardFormvalidator = new FormValidator({
        formSelector: '.form',
        inputSelector: '.form__field',
        submitButtonSelector: '.form__save-button',
        inactiveButtonClass: 'form__save-button_invalid',
        inputErrorClass: 'form__field_type_error',
        errorClass: 'form__error_visible'
      }, cardFormElement);
      
cardFormvalidator.enableValidation();

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
        }
    });
}) 

function openProfilePopup() {
  openPopup(profilePopup);
  formElement.reset();
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
}

function closeProfilePopup() {
  closePopup(profilePopup);
}

function openPopupPic() {
  openPopup(popupCard);
  formCard.reset();  
  savePicButton.setAttribute('disabled', true);
  savePicButton.classList.add('form__save-button_invalid');
}

function closePopupPic() {
  closePopup(popupCard);
}

function openImagePopup() {
  openPopup(imagePopup);
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileOccupation.textContent = jobInput.value;
    closeProfilePopup();
}

function formCardSubmitHandler(evt) {
      evt.preventDefault(); 
      const inputTitleValue = inputTitle.value;
      const inputLinkValue = inputLink.value;

      const card = new Card({ name: inputTitleValue, link: inputLinkValue }, '.template');
      const cardElement = card.generateCard();
      elementsContainer.prepend(cardElement);
      addTaskListeners(cardElement);
      closePopupPic();      
}

initialCards.forEach((item) => {
  const card = new Card(item, '.template');
  const cardElement = card.generateCard();
  elementsContainer.prepend(cardElement);
  addTaskListeners(cardElement);
  }); 

function addTaskListeners(element) {
  const imagePopupButton = element.querySelector('.element__image');
  const imagePopupText = element.querySelector('.element__heading');

  function addImagePopup (evt){
    popupImage.src = evt.target.src;
    popupImage.alt = imagePopupText.textContent;
    imageCaption.textContent = imagePopupText.textContent;
    openImagePopup();
  }
  
  imagePopupButton.addEventListener('click', addImagePopup);
}

showPopupButton.addEventListener('click', openProfilePopup);
formElement.addEventListener('submit', formSubmitHandler);
showPopupPicButton.addEventListener('click', openPopupPic);
formCard.addEventListener('submit', formCardSubmitHandler);