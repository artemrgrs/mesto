export default class UserInfo {
    constructor({nameSelector, occupationSelector, avatarSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._occupationElement = document.querySelector(occupationSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        this._user = {
            name: this._nameElement.textContent,
            occupation: this._occupationElement.textContent
        };
        return this._user;
    }

    setUserInfo(formData) {
        this._nameElement.textContent =  formData.name;
        this._occupationElement.textContent = formData.about;
    }

    setUserAvatar(data) {
        this._avatarElement.src = data.avatar;
    }
}