import { deleteItemEncrypted, storeItemEncrypted } from "../utils/common";

export var accessToken;

export const doLogin = async () => {
    fetch('http://10.0.2.2:8080/doLogin', {
        method: 'POST',
        headers: {
            Accept: 'text/plain',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': 'gladian.matteo@gmail.com',
            'password': 'matteo'
        })
    })
        .then((response) => response.json())
        .then((json) => {
            if (json.userNotFound) {
                //TODO
                console.log("User not found");
            }
            else if (json.wrongPassword) {
                //TODO
                console.log("Wrong Password!");
            } else {
                console.log("Successful login!");
                accessToken = {
                    token: json.user.accessToken,
                    userId: json.user.userId,
                };
                storeItemEncrypted('@access_token', accessToken);
                return accessToken;
            }
        });

}

export async function doLoginToken(token, setTokenFunction) {

    fetch('http://10.0.2.2:8080/tokenLogin', {
        method: 'POST',
        headers: {
            Accept: 'text/plain',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: token.token,
            userId: token.userId
        })
    })
        .then((response) => response.json())
        .then((json) => {
            if (json.userNotFound) {
                deleteItemEncrypted('@access_token');
                console.log("User not found");
            }
            else if (json.tokenExpired || json.tokenIdMismatch || json.tokenNotFound) {
                deleteItemEncrypted('@access_token');
                console.log("Invalid Token!");
            } else {
                console.log("Successful login!");
                accessToken = token;
                setTokenFunction(token);
            }
        });

}

export const forgotPassword = () => {

}