let popup = document.querySelector('.popup');
let showPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close');

let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form_field-name');
let jobInput = document.querySelector('.form_field-occupation');


function togglePopup() {
    popup.classList.toggle('popup_is-opened');

    nameInput.value = document.querySelector('.profile__name').textContent;
    jobInput.value = document.querySelector('.profile__occupation').textContent;
}

showPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);


function formSubmitHandler (evt) {
    evt.preventDefault(); 

    document.querySelector('.profile__name').textContent = nameInput.value;
    document.querySelector('.profile__occupation').textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', togglePopup);