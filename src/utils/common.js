
import EncryptedStorage from "react-native-encrypted-storage";

export async function storeItemEncrypted(key, item) {
    try {
        await EncryptedStorage.setItem(
            key,
            JSON.stringify(item)
        );
    } catch (error) {
        console.log(error);
    }
}

export async function deleteItemEncrypted(key) {
    try {
        await EncryptedStorage.removeItem(key);
    } catch (error) {
        console.log(error);
    }
}


export async function getItemEncrypted(key) {
    try {
        item = await EncryptedStorage.getItem(key);
        return JSON.parse(item);
    } catch (error) {
        console.log(error);
    }
}

export const closestInArray = (arr, element) => {
    return arr.reduce((prev, curr) => {
        return (Math.abs(element - curr) < Math.abs(element - prev) ? curr : prev);
    })
};

export const indexMaxInArray = (arr) => {
    return arr.indexOf(Math.max.apply(null, arr));
}

export const indexMinInArray = (arr) => {
    return arr.indexOf(Math.min.apply(null, arr));
}

export const validateEmail = (email) => {
    splitEmail = email.split('@');
    if (splitEmail.length <= 1)
        return false;
    if (!splitEmail[1].includes('\.'))
        return false;
    return true;
}

