let popup = document.querySelector('.popup');
let showPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close');

let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__field_data_name');
let jobInput = document.querySelector('.form__field_data_occupation');

let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation')

function togglePopup() {
    popup.classList.toggle('popup_is-opened');

    if (popup.classList.contains('popup_is-opened')) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileOccupation.textContent;
    } 
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileOccupation.textContent = jobInput.value;
    togglePopup();
}

showPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);

formElement.addEventListener('submit', formSubmitHandler);