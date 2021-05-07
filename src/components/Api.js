export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _handleResponse(res) {
        if(res.ok) {
            return res.json();
            }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getProfileInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    getAllNeededData() {
        return Promise.all([this.getProfileInfo(), this.getInitialCards()]);
      }

    setProfileInfo(user) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              name: user.name,
              about: user.about
            })
        })
        .then(this._handleResponse);
    }

    setLike(data) {
        return fetch(`${this._url}/cards/likes/${data._id}`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._handleResponse);
    }
    
    removeLike(data) {
        return fetch(`${this._url}/cards/likes/${data._id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            }),
        })
        .then(this._handleResponse);
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    setProfileAvatar(user) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: user.link
            })
        })
        .then(this._handleResponse);
    }
}

