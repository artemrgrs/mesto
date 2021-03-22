const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
};

const toggleButtonState = (buttonElement, inputList) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add('form__save-button_invalid');
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove('form__save-button_invalid');
    }
};

const showInputError = (inputElement, formElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('form__field_type_error');
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add('form__error_visible');
};

const hideInputError = (inputElement, formElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('form__field_type_error');
    errorElement.classList.remove('form__error_visible');
    errorElement.textContent = '';
};

const checkInput = (inputElement, formElement) => {
    if (inputElement.validity.valid) {
        hideInputError (inputElement, formElement);
    } else {
        showInputError(inputElement, formElement);
    }
};

const setInputListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__field'));
    const buttonElement = formElement.querySelector('.form__save-button');

    inputList.forEach(
        inputElement => {
            inputElement.addEventListener('input', () => {
                checkInput(inputElement, formElement);
                toggleButtonState(buttonElement, inputList);
            });
        toggleButtonState (buttonElement, inputList);
        }
    ); 
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form')
    );
    formList.forEach(
        formElement => {
            formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            setInputListeners(formElement);
        }
    );
};

enableValidation();