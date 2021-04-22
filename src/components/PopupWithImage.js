import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._link = this._popup.querySelector('.popup__image');
        this._image = this._popup.querySelector('.popup__caption');
    }

    open(data) {
        this._link.src = data.link;
        this._image.alt = data.name;
        this._image.textContent = data.name;
        super.open();
    }
}