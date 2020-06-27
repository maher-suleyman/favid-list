console.log("content running!!");

// An array that contains all videos IDs on youtube
let videosYTids = [];
// A counter to determine what id will be give to the new video
let counter = 0;

// Receiving data from "background.js" to "content.js"
chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(videosListResponse, sender, sendResponse) {
  videosListResponse.map((video) => {
    counter = video.id;
    const idChecker = (element) => element === video.id_on_youtube;
    if (videosYTids.some(idChecker) === false) {
      videosYTids.push(video.id_on_youtube);
    }
  });
}

// Initializing current URL
let url = window.location.search;

// Checking if the URL is changed in the tab or if the button has to be changed
function refreshPage() {
  // Refreshing the URL
  if (url != window.location.search) {
    url = window.location.search;
    // Refreshing button status
    refreshButton();
  }
  // Setting a timer to launch the function every 1 second continuously
  setTimeout(refreshPage, 1000);
}
refreshPage();

// Getting a video id on YouTube
function getVideoId() {
  let id_on_youtube = url.split("v=")[1];
  const ampersandPosition = id_on_youtube.indexOf("&");
  if (ampersandPosition != -1) {
    id_on_youtube = id_on_youtube.substring(0, ampersandPosition);
  }
  return id_on_youtube;
}

// Getting a video title on YouTube
function getVideoTitle() {
  return document.querySelector(".ytp-title-link").innerText;
}

function getDateAndTime() {
  // Getting current date by (DD/MM/YYYY)
  const date =
    new Date().getDate() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getFullYear();

  // Getting current time by (HH:MM:SS)
  function getTime() {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    if (hours >= 0 && hours <= 9) {
      hours = "0" + hours;
    }
    if (minutes >= 0 && minutes <= 9) {
      minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
      seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
  }

  return date + " - " + getTime();
}

// Getting thumbnail path
function getThumbnailPath() {
  /*
    Low quality: https://img.youtube.com/vi/[video-id]/sddefault.jpg
    medium quality: https://img.youtube.com/vi/[video-id]/mqdefault.jpg
    High quality: http://img.youtube.com/vi/[video-id]/hqdefault.jpg
    maximum resolution: http://img.youtube.com/vi/[video-id]/maxresdefault.jpg
    */
  return "https://img.youtube.com/vi/" + getVideoId() + "/maxresdefault.jpg";
}

function getVideoPath() {
  return "https://www.youtube.com/watch?v=" + getVideoId();
}

/*
<iframe width="100%" height="auto" src="https://www.youtube.com/embed/lCjObAFBFco" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
*/
/*
Creating a button that appears on the video frame 
and when it's clicked it will:
Either--> send all needed info of a video to "background.js" to save it in firebase DB
Or--> Delete a video from firebase DB
*/
function addingButton() {
  let videosContainer = document.getElementById("player-container");
  let parentDiv = videosContainer.parentNode;

  let div = document.createElement("div");
  let span = document.createElement("span");
  let ratingDiv = document.createElement("div");

  span.innerHTML = "+";
  span.setAttribute("id", "plus-sign");
  div.setAttribute("id", "favid-button-add");

  //////////////////////////////////////////
  div.addEventListener("click", () => {
    div.parentNode.removeChild(div);
    ratingDiv.innerHTML = `
        <form id="hideByMasu">
            <fieldset class="starability-basic">

                <input type="radio" id="no-rate" class="input-no-rate" name="rating" value="0" checked aria-label="No rating." />

                <input type="radio" id="rate1" name="rating" value="1" />
                <label for="rate1" title="Not Bad!">5 stars</label>

                <input type="radio" id="rate2" name="rating" value="2" />
                <label for="rate2" title="good">4 stars</label>

                <input type="radio" id="rate3" name="rating" value="3" />
                <label for="rate3" title="Average">3 stars</label>

                <input type="radio" id="rate4" name="rating" value="4" />
                <label for="rate4" title="Very good">2 stars</label>

                <input type="radio" id="rate5" name="rating" value="5" />
                <label for="rate5" title="Amazing">1 star</label>

                <button id="rating-sumbit-btn" type="button">Submit</button>
            </fieldset>
            </form>
        `;
    ratingDiv.setAttribute("id", "rating-form");

    // Passing data from "content.js" to "background.js"
    setTimeout(() => {
      let submitButton = document.getElementById("rating-sumbit-btn");
      submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        const ratingChoices = document.querySelectorAll('input[name="rating"]');
        let ratingValue = null;

        for (const rating of ratingChoices) {
          if (rating.checked) {
            ratingValue = parseInt(rating.value, 10);
            break;
          }
        }

        // Initializing an object that will obtain all the video info
        const video_details = {
          id: counter + 1,
          id_on_youtube: getVideoId(),
          title: getVideoTitle(),
          date: getDateAndTime(),
          thumbnail_path: getThumbnailPath(),
          video_path: getVideoPath(),
          isViewed: false,
          rating: ratingValue,
        };
        // a sub function and a condition to check if the id is sent before
        const idChecker = (element) => element === video_details.id_on_youtube;
        if (videosYTids.some(idChecker) === false) {
          // id_array.push(video_details.id_on_youtube);
          chrome.runtime.sendMessage("checkDB");
          counter += 1;
          chrome.runtime.sendMessage(
            { command: "add", collection: "YouTube", data: video_details },
            (msg) => {
              console.log("response", msg);
            }
          );
        }
        ratingDiv.parentNode.removeChild(ratingDiv);
        setTimeout(deletingButton, 750);
      });
    }, 1000);
    parentDiv.insertBefore(ratingDiv, videosContainer);

    // hiding and deleting the form when clicking outside of it -inside the DOM-
    document.addEventListener("mouseup", function (e) {
      var container = document.getElementById("hideByMasu");
      if (!container.contains(e.target)) {
        container.style.display = "none";
        ratingDiv.parentNode.removeChild(ratingDiv);
        const addingButtonChecker = document.getElementById("favid-button-add");
        const deletingButtonChecker = document.getElementById(
          "favid-button-delete"
        );
        if (!addingButtonChecker && !deletingButtonChecker) {
          setTimeout(addingButton, 100);
        }
      }
    });
  });

  div.appendChild(span);
  parentDiv.insertBefore(div, videosContainer);
}

function deletingButton() {
  let videosContainer = document.getElementById("player-container");
  let parentDiv = videosContainer.parentNode;

  let div = document.createElement("div");
  let span = document.createElement("span");

  span.innerHTML = "-";
  span.setAttribute("id", "minus-sign");
  div.setAttribute("id", "favid-button-delete");
  // Passing data from "content.js" to "background.js"
  div.addEventListener("click", () => {
    videosYTids = [];
    chrome.runtime.sendMessage("checkDB");
    chrome.runtime.sendMessage(
      { command: "delete", collection: "YouTube", data: getVideoId() },
      (msg) => {
        console.log("response", msg);
      }
    );
    div.parentNode.removeChild(div);
    setTimeout(addingButton, 750);
  });
  div.appendChild(span);
  parentDiv.insertBefore(div, videosContainer);
}

function createAddButton() {
  // A condition to check which button will be created
  let isAddButton = false;
  const idChecker = (element) => element === getVideoId();
  if (videosYTids.some(idChecker) === false) {
    isAddButton = true;
  }
  // Creating the button
  if (isAddButton) {
    addingButton();
  } else {
    deletingButton();
  }
}

function refreshButton() {
  // Checking of the button existing
  const addingButton = document.getElementById("favid-button-add");
  const deletingButton = document.getElementById("favid-button-delete");
  // Deleting any previous buttons
  if (addingButton != null) {
    addingButton.parentNode.removeChild(addingButton);
  }
  if (deletingButton != null) {
    deletingButton.parentNode.removeChild(deletingButton);
  }
  // Creating a new button with the correct value
  createAddButton();
}

// Method to delay creating a button to avoid appearing issues
setTimeout(createAddButton, 1000);

// Adding css links for star form rating
let head = document.getElementsByTagName("HEAD")[0];
let ratingLink = document.createElement("link");
ratingLink.rel = "stylesheet";
ratingLink.type = "text/css";
ratingLink.href =
  "https://cdnjs.cloudflare.com/ajax/libs/starability/2.4.2/starability-css/starability-all.css";
head.appendChild(ratingLink);
/*
Available styles for rating:
============================
starability-basic
starability-slot
starability-grow
starability-growRotate
starablity-fade
starability-checkmark
============================
Used style: "basic"
*/
