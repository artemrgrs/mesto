import './pages/index.css';

import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import PopupWithImage from './components/PopupWithImage.js';

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

const showPopupProfileButton = document.querySelector('.profile__edit-button');
const showPopupPicButton = document.querySelector('.profile__add-button');
const elementsContainerSelector = '.elements';
const imagePopupSelector = '.image-popup';
const profilePopup = document.querySelector('.profile-popup');
const nameInput = profilePopup.querySelector('.form__field_data_name');
const occupationInput = profilePopup.querySelector('.form__field_data_occupation');

const imagePopup = new PopupWithImage(imagePopupSelector);
const userInfo = new UserInfo({ nameSelector: '.profile__name', occupationSelector: '.profile__occupation'});

imagePopup.setEventListeners();


const profileFormElement = document.forms.profile;
const profileFormValidator = new FormValidator({
        formSelector: '.form',
        inputSelector: '.form__field',
        submitButtonSelector: '.form__save-button',
        inactiveButtonClass: 'form__save-button_invalid',
        inputErrorClass: 'form__field_type_error',
        errorClass: 'form__error_visible'
      }, profileFormElement);

profileFormValidator.enableValidation();


const cardFormElement = document.forms.card;
const cardFormValidator = new FormValidator({
        formSelector: '.form',
        inputSelector: '.form__field',
        submitButtonSelector: '.form__save-button',
        inactiveButtonClass: 'form__save-button_invalid',
        inputErrorClass: 'form__field_type_error',
        errorClass: 'form__error_visible'
      }, cardFormElement);
      
cardFormValidator.enableValidation();


const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.template', {
        handleCardClick: () => {
          imagePopup.open(item);
        }
      });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, elementsContainerSelector);

cardList.renderItems();


const cardPopupWithForm = new PopupWithForm({
  popupSelector: '.card-popup',
  handleFormSubmit: (formData) => {
    const card = new Card( formData, '.template', {
        handleCardClick: () => {
          imagePopup.open(formData);
        }
      }
      );
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
});

cardPopupWithForm.setEventListeners();


const profilePopupWithForm = new PopupWithForm({
  popupSelector: '.profile-popup',
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
  }
});

profilePopupWithForm.setEventListeners();


showPopupPicButton.addEventListener('click', () => {
  cardFormValidator.disableSubmitButton();
  cardPopupWithForm.open();
});

showPopupProfileButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  occupationInput.value = userData.occupation;
  profilePopupWithForm.open();
});
