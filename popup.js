import { getActiveTabURL } from "./utils.js";

// adding a new bookmark row to the popup
const addNewBookmark = (bookmark) => {
    const parent = document.querySelector("#bookmarks");
    
    const titleEl = document.createElement("div");
    titleEl.innerText = bookmark.desc;
    titleEl.className = "bookmark-title";

    const bookmarkEl = document.createElement("div");
    bookmarkEl.id = "bookmark-" + bookmark.time;
    bookmarkEl.className = "bookmark";
    bookmarkEl.setAttribute("timestamp", bookmark.time);

    bookmarkEl.appendChild(titleEl);
    parent.appendChild(bookmarkEl);

};

const viewBookmarks = (bookmarks = []) => {
    parent.innerHTML = "";
    if(bookmarks.length === 0) {
        document.querySelector("#bookmarks").innerText = '<i class="row">No bookmarks for this video :(</i>';
    } else {
        bookmarks.forEach(bookmark => {
            addNewBookmark(bookmark);
        });
    }
};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {};

document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getActiveTabURL();
    const queryParams = activeTab.url.split("?")[1];
    const urlParams = new URLSearchParams(queryParams);

    const currentVideo = urlParams.get("v");

    if(currentVideo && activeTab.url.includes("youtube.com/watch")) {
        chrome.storage.sync.get([currentVideo], (result) => {
            const currentVideoBookmarks = result[currentVideo] ? JSON.parse(result[currentVideo]) : [];
            viewBookmarks(currentVideoBookmarks);
        });
    } else {
        document.querySelector(".container .title").innerText = "No video playing currently :("
    }
});
