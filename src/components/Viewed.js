import React from "react";
import "./index.css";
import LeftSidebar from "./LeftSidebar";
import VideoBoard from "./VideoBoard";
import VideoList from "./VideoList";

function Viewed(props) {
  // Setting contrast for left side bar
  const [leftSidebarcContrast, setLeftSidebarcContrast] = React.useState(
    "left-side-light"
  );

  // Setting View Style (Board / List ) Toggle Switch in the left side bar
  const [viewStyle, setViewStyle] = React.useState("viewStyle-board");

  function handleViewStyle() {
    if (viewStyle === "viewStyle-board") {
      setViewStyle("viewStyle-list");
    } else {
      setViewStyle("viewStyle-board");
    }
  }

  // Function to handle Contrast
  function handleContrast() {
    props.contrast();
    if (leftSidebarcContrast === "left-side-light") {
      setLeftSidebarcContrast("left-side-dark");
    } else {
      setLeftSidebarcContrast("left-side-light");
    }
  }

  // updating firebase after every operation
  function handleUpdateDB() {
    props.updateDB();
  }

  return (
    <div id="body">
      <LeftSidebar
        viewStyle={handleViewStyle}
        contrast={handleContrast}
        leftSidebarcContrast={leftSidebarcContrast}
      />

      <div id={props.videosContainerContrast}>
        <div id="videos-style">
          {viewStyle === "viewStyle-board" ? (
            props.videos.map((video) => {
              if (video.isViewed && !video.isArchived) {
                return (
                  <VideoBoard
                    videoDetails={video}
                    updateDeletion={handleUpdateDB}
                    updateArchived={handleUpdateDB}
                    updateUnarchived={handleUpdateDB}
                    updateViewed={handleUpdateDB}
                    updateUnviewed={handleUpdateDB}
                    updateRating={handleUpdateDB}
                  />
                );
              }
            })
          ) : (
            <table id="videos-list">
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Rating</th>
                <th>Options</th>
              </tr>
              {props.videos.map((video) => {
                if (video.isViewed && !video.isArchived) {
                  return (
                    <VideoList
                      videoDetails={video}
                      updateDeletion={handleUpdateDB}
                      updateArchived={handleUpdateDB}
                      updateUnarchived={handleUpdateDB}
                      updateViewed={handleUpdateDB}
                      updateUnviewed={handleUpdateDB}
                      updateRating={handleUpdateDB}
                    />
                  );
                }
              })}
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Viewed;
