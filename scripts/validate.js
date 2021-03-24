const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
};

const toggleButtonState = (buttonElement, inputList, {inactiveButtonClass}) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(inactiveButtonClass);
    }
};

const showInputError = (inputElement, formElement, {inputErrorClass, errorClass}) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (inputElement, formElement, {inputErrorClass, errorClass}) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const checkInput = (inputElement, formElement, rest) => {
    if (inputElement.validity.valid) {
        hideInputError (inputElement, formElement, rest);
    } else {
        showInputError(inputElement, formElement, rest);
    }
};

const setInputListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    inputList.forEach(
        inputElement => {
            inputElement.addEventListener('input', () => {
                checkInput(inputElement, formElement, rest);
                toggleButtonState(buttonElement, inputList, rest);
            });
        toggleButtonState (buttonElement, inputList, rest);
        }
    ); 
};

const enableValidation = ({formSelector, ...rest}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach(
        formElement => {
            formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            setInputListeners(formElement, rest);
        }
    );
};

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__field',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_invalid',
    inputErrorClass: 'form__field_type_error',
    errorClass: 'form__error_visible'
  }); 






















