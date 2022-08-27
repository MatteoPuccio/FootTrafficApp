import { accessToken } from "./login";

export async function doRemoveBookmark(bookmark) {
    console.log(accessToken.token + " " + bookmark);
    fetch('http://10.0.2.2:8080/deleteBookmark', {
        method: 'POST',
        headers: {
            Accept: 'text/plain',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: accessToken.token,
            bookmark: bookmark
        })
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
        });
}

export async function fetchBookmarks(setBookmarks) {
    fetch('http://10.0.2.2:8080/getUserBookmarks', {
        method: 'POST',
        headers: {
            Accept: 'text/plain',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: accessToken.token
        })
    })
        .then((response) => response.json())
        .then((json) => {
            setBookmarks(json.bookmarks);
            bookmarks = json.bookmarks;
        });
}

export async function addBookmark(bookmark, setBookmarks) {
    console.log(JSON.stringify(bookmark));
    fetch('http://10.0.2.2:8080/addBookmark', {
        method: 'POST',
        headers: {
            Accept: 'text/plain',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: accessToken.token,
            bookmark: JSON.stringify(bookmark)
        })
    }).then(fetchBookmarks(setBookmarks))
}

export async function getBookmarkBusyness(bookmark, setBusyness) {
    fetch('http://10.0.2.2:8080/getBusynessFromBookmark', {
        method: 'POST',
        headers: {
            Accept: 'text/plain',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: accessToken.token,
            bookmark: bookmark.id,
        })
    })
        .then((response) => response.json())
        .then((json) => {
            //console.log(JSON.stringify(json));
            if (json.hasOwnProperty('noData')) {
                setBusyness([]);
            } else {
                setBusyness(json.busyness);
            }
        })
}