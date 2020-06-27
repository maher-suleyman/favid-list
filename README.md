# favid-list (app & chrome extension) version 1.0
This project is an app to make a list of favorite videos on YouTube using React JS, Google Chrome extension, and Firebase.

# Requirments:
<b>1-</b> Firebase project app, where the data will be saved.<br/>
<b>2-</b> List of dependencies that I will list below.<hr/>

# Preview:
![alt text](preview.gif)<hr/>

# Used Dependencies:
npm install --save firebase<br/>
npm install react-bootstrap bootstrap<br/>
npm install @material-ui/lab<br/>
npm install @material-ui/core<br/>
npm install router<br/>
npm install --save mdbreact<br/>
npm install<hr/>

# How to use:
<b>1-</b> Clone this repository and after cloning you will see the app folder.<br/>
<b>2-</b> Create a new project in Firebase then copy your app configuration to the following files (required):<br/>
    &emsp;&emsp; 1- "firebaseConfig.js" in "src" folder ( from line 6 to 13 ).<br/>
    &emsp;&emsp; 2- "background.js" in "public/scripts" folder ( from line 5 to 7 ).<br/>
<b>3-</b> Build the app after copying Firebase configuration by openeing the app folder in terminal and running the command (npm run build) and after that you will see a new folder called "build".<br/>
<b>4-</b> Load the unpacked extension in Chrome from the folder "build" in the app folder.<br/>
<b>5-</b> Go to <b>YouTube</b> to start adding videos to firebase by clicking on the blue plus button that will be shown on the top of the video frame and then give it a rating and finally click on the submit button.<br/>
<b>6-</b> Open the app folder and by terminal run (npm start) and be sure it will open it at (http://localhost:3000/).<br/>
<b>7-</b> enjoy <b>:)</b><br/>

# Notes:
<b>1-</b> You can host the app in any platform you want instead of hosting locally by using (npm start), and in this case you have to edit the app and replace every (http://localhost:3000/) with the new URL, after that you have to build the app again by the command (npm run build) and finally refresh the extension in chrome settings in (chrome://extensions/).<br/>
<b>2-</b> I'm new to React and this is the first React JS app for me.<br/>
<b>3-</b> If you faced any problem with launching the app locally just delete "node_modules" folder and then run the command (npm install).


