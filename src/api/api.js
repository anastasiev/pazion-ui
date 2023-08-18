import {TOKEN_NAME} from "../constants";

const handleResponse = async (response) => {
    if (response.status >= 400) {
        const { message } = await response.json();
        throw new Error(message);
    }
    return response.json();
}

export const get = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'x-jwt-token': localStorage.getItem(TOKEN_NAME),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return handleResponse(response);
}

export const post = async (url, body) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'x-jwt-token': localStorage.getItem(TOKEN_NAME),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    return handleResponse(response);
}