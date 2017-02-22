import 'whatwg-fetch';

function parseJSON(response) {
    return response.json();
}

function getHeaders(token) {
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`
    };
}

function request(url, options) {
    const endpoint = url;
    const token = localStorage.getItem('callback-token');
    const headers = getHeaders(token);
    const advancedOptions = { ...options, headers };

    return new Promise((resolve, reject) => {
        fetch(endpoint, advancedOptions)
            .then((response) => {
                if (response.ok) {
                    parseJSON(response).then((res) => resolve(res));
                } else {
                    parseJSON(response).then((res) => reject(res));
                }
            })
            .catch((error) => reject(error));
    });
}

const http = {
    get(url) {
        return request(url);
    },

    post(url, data) {
        return request(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    put(url, data) {
        return request(url, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    delete(url) {
        return request(url, {
            method: 'DELETE'
        });
    }
};

export default http;
