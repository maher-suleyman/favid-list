console.log("background running!!");

// Setting firebase
firebase.initializeApp({
  apiKey: "PUT_YOUR_CONFIGURATION_HERE",
  authDomain: "PUT_YOUR_CONFIGURATION_HERE",
  projectId: "PUT_YOUR_CONFIGURATION_HERE",
});

var db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.command == "add") {
    console.log("process msg add", msg, sender, response);
    db.collection(msg.collection)
      .add(msg.data)
      .then((result) => {
        console.log("success", result);
        response({
          type: "result",
          status: "success",
          data: result,
          request: msg,
        });
      })
      .catch((result) => {
        console.log("error", result);
        response({
          type: "result",
          status: "error",
          data: result,
          request: msg,
        });
      });
  } else if (msg.command == "delete") {
    console.log("process msg delete", msg, sender, response);
    var docsWillBeDeleted = db
      .collection(msg.collection)
      .where("id_on_youtube", "==", msg.data);
    docsWillBeDeleted.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });
  }
  return true;
});

// Comparing based on the property id -to sort videos by id-
function compare_id(a, b) {
  // a should come before b in the sorted order
  if (a.id < b.id) {
    return -1;
    // a should come after b in the sorted order
  } else if (a.id > b.id) {
    return 1;
    // a and b are the same
  } else {
    return 0;
  }
}
// Fetching data from firebase
const fetchFirebase = async () => {
  const res = await db.collection("YouTube").get();
  let videosOnFirebase = res.docs.map((video) => video.data());
  // Sorting videos by id
  videosOnFirebase = videosOnFirebase.sort(compare_id);
  console.log(videosOnFirebase);
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, videosOnFirebase, function (
          response
        ) {});
      });
    }
  });
};
fetchFirebase();

// Passing data from "background.js" to "content.js"
// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//     if (changeInfo.status == 'complete') {
//        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//           chrome.tabs.sendMessage(tabs[0].id, videosOnFirebase, function(response) {});
//        });
//     }
// });

// Receiving data from "content.js" to "background.js"
chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
  if (message === "checkDB") {
    console.log("checkDB in BG");
    fetchFirebase();
  }
}

// Opening the App in a new tab
chrome.browserAction.onClicked.addListener(function (activeTab) {
  window.open("http://localhost:3000/", "_blank");
});
