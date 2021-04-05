export class FormValidator {
    constructor(formSelectors, formElement) {
        this._formElement = formElement; 
        this._inputList = Array.from(
            formElement.querySelectorAll(formSelectors.inputSelector)  
        );
        this._submitButton = formElement.querySelector(
            formSelectors.submitButtonSelector
        );
        this._inactiveButtonClass = formSelectors.inactiveButtonClass;
        this._inputErrorClass = formSelectors.inputErrorClass;
        this._errorClass = formSelectors.errorClass;
    }        
    
    _hasInvalidInput = () => {
        return this._inputList.some(inputElement => !inputElement.validity.valid);
    };

    _toggleButtonState = () => {
        if (this._hasInvalidInput(this._inputList)) {
            this._submitButton.setAttribute('disabled', true);
            this._submitButton.classList.add(this._inactiveButtonClass);
        } else {
            this._submitButton.removeAttribute('disabled');
            this._submitButton.classList.remove(this._inactiveButtonClass);
        }
    };

    _showInputError = (inputElement) => {
        this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        this._errorElement.textContent = inputElement.validationMessage;
        this._errorElement.classList.add(this._errorClass);
    };

    _hideInputError = (inputElement) => {
        this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass);
        this._errorElement.textContent = '';
    };

    _checkInput = (inputElement) => {
        if (inputElement.validity.valid) {
            this._hideInputError (inputElement);
        } else {
            this._showInputError(inputElement);
        }
    };

    _setInputListeners = () => {
        this._inputList.forEach(
        inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInput(inputElement);
                this._toggleButtonState();
            });
            this._toggleButtonState ();
        }
    );}

    enableValidation = () => {
        this._formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
        this._setInputListeners();
    }
}


