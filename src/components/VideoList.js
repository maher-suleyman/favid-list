import React from "react";
import "./index.css";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Button } from "react-bootstrap";
import db from "../firebaseConfig";

function VideoList(props) {
  const id = props.videoDetails.id;
  const id_on_firebase = props.videoDetails.id_on_firebase;
  const id_on_youtube = props.videoDetails.id_on_youtube;
  const title = props.videoDetails.title;
  const date = props.videoDetails.date;
  const thumbnail = props.videoDetails.thumbnail_path;

  const [isArchived, setIsArchived] = React.useState(
    props.videoDetails.isArchived
  );
  const [isViewed, setIsViewed] = React.useState(props.videoDetails.isViewed);
  const [rating, setRating] = React.useState(props.videoDetails.rating);
  const [iframeStatus, setIframeStatus] = React.useState("visibility-hidden");

  function deleteVideo() {
    db.collection("YouTube").doc(id_on_firebase).delete();
    props.updateDeletion();
  }

  function archive() {
    db.collection("YouTube").doc(id_on_firebase).update({
      isArchived: true,
    });
    setIsArchived(!isArchived);
    props.updateArchived();
  }

  function unArchive() {
    db.collection("YouTube").doc(id_on_firebase).update({
      isArchived: false,
    });
    setIsArchived(!isArchived);
    props.updateUnarchived();
  }

  function setAsViewed() {
    db.collection("YouTube").doc(id_on_firebase).update({
      isViewed: true,
    });
    setIsViewed(!isViewed);
    props.updateViewed();
  }

  function setAsUnviewed() {
    db.collection("YouTube").doc(id_on_firebase).update({
      isViewed: false,
    });
    setIsViewed(!isViewed);
    props.updateUnviewed();
  }

  function updateRating(newRating) {
    db.collection("YouTube").doc(id_on_firebase).update({
      rating: newRating,
    });
    setRating(newRating);
    props.updateRating();
  }

  const thumbnailStyle = {
    width: "125px",
    paddingRight: "10px",
  };

  const titleStyle = {
    display: "flex",
    flexDirection: "row",
    cursor: "pointer",
  };

  const iframeSRC = `https://www.youtube.com/embed/${id_on_youtube}`;

  function handleIframeStatus() {
    if (iframeStatus === "visibility-hidden") {
      setIframeStatus("visibility-visible");
    } else {
      setIframeStatus("visibility-hidden");
    }
  }

  return (
    <tr>
      <td onClick={handleIframeStatus}>
        <div style={titleStyle}>
          <img src={thumbnail} style={thumbnailStyle} alt="video-thumbnail" />
          <p style={{ fontWeight: "700" }}>{title}</p>
        </div>
        <div id={iframeStatus}>
          <iframe
            width="100%"
            height="240px"
            src={iframeSRC}
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </td>
      <td style={{ fontWeight: "700", color: "#1c78c2" }}>{date}</td>
      <td>
        <Box
          style={{ marginTop: "30px" }}
          component="fieldset"
          mb={3}
          borderColor="transparent"
        >
          <Typography component="legend"></Typography>
          <Rating
            name={`simple-controlled${id}`}
            value={rating}
            onChange={(event, newRating) => {
              updateRating(newRating);
            }}
          />
        </Box>
      </td>
      <td>
        {/* Creating a button to delete the video */}
        <Button id="btn" onClick={deleteVideo} variant="danger" size="sm">
          Delete
        </Button>

        {/* Creating a button to set the video as archived */}
        {!isArchived && (
          <Button id="btn" onClick={archive} variant="secondary" size="sm">
            Archive
          </Button>
        )}

        {/* Creating a button to set the video as archived */}
        {isArchived && (
          <Button id="btn" onClick={unArchive} variant="primary" size="sm">
            Unarchive
          </Button>
        )}

        {/* Creating a button to set the video as viewed */}
        {!isViewed && (
          <Button id="btn" onClick={setAsViewed} variant="success" size="sm">
            Set as Viewd
          </Button>
        )}

        {/* Creating a button to set the video as unviewed */}
        {isViewed && (
          <Button id="btn" onClick={setAsUnviewed} variant="warning" size="sm">
            Set as Unviewd
          </Button>
        )}
      </td>
    </tr>
  );
}

export default VideoList;
