import React, { useEffect } from "react";
import "./App.css";
import db from "./firebaseConfig";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import AllVideos from "./components/AllVideos";
import UnViewed from "./components/UnViewed";
import Viewed from "./components/Viewed";
import Archive from "./components/Archive";
import Footer from "./components/Footer";
import Rating from "./components/Rating";
import Search from "./components/Search";

function App() {
  const [videos, setVideos] = React.useState([]);
  const [headerContrast, setHeaderContrast] = React.useState("header-light");
  const [videosContainerContrast, setVideosContainerContrast] = React.useState(
    "videosContainer-light"
  );
  const [searchString, setSearchString] = React.useState(null);

  const fetchData = async () => {
    const res = await db.collection("YouTube").get();
    const data = res.docs.map((video) =>
      Object.assign(video.data(), { id_on_firebase: video.id })
    );
    setVideos(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Updating firebase after every operation
  function handleUpdateDB() {
    setTimeout(fetchData, 1000);
  }

  function handleContrast() {
    if (headerContrast === "header-light") {
      setHeaderContrast("header-dark");
      setVideosContainerContrast("videosContainer-dark");
    } else {
      setHeaderContrast("header-light");
      setVideosContainerContrast("videosContainer-light");
    }
  }

  function handleSearch(string) {
    setSearchString(string);
  }

  return (
    <Router id="page-body">
      <Header headerContrast={headerContrast} setSearchString={handleSearch} />

      <Switch>
        <Route exact path="/">
          <AllVideos
            videos={videos}
            videosContainerContrast={videosContainerContrast}
            contrast={handleContrast}
            updateDB={handleUpdateDB}
          />
        </Route>
        <Route path="/allVideos">
          <AllVideos
            videos={videos}
            videosContainerContrast={videosContainerContrast}
            contrast={handleContrast}
            updateDB={handleUpdateDB}
          />
        </Route>
        <Route path="/unviewed">
          <UnViewed
            videos={videos}
            videosContainerContrast={videosContainerContrast}
            contrast={handleContrast}
            updateDB={handleUpdateDB}
          />
        </Route>
        <Route path="/viewed">
          <Viewed
            videos={videos}
            videosContainerContrast={videosContainerContrast}
            contrast={handleContrast}
            updateDB={handleUpdateDB}
          />
        </Route>
        <Route path="/archive">
          <Archive
            videos={videos}
            videosContainerContrast={videosContainerContrast}
            contrast={handleContrast}
            updateDB={handleUpdateDB}
          />
        </Route>
        <Route path="/rating/oneStar">
          <Rating
            videos={videos}
            ratingVal={1}
            videosContainerContrast={videosContainerContrast}
            contrast={handleContrast}
            updateDB={handleUpdateDB}
          />
        </Route>
        <Route path="/rating/twoStars">
          <Rating
            videos={videos}
            ratingVal={2}
            videosContainerContrast={videosContainerContrast}
            contrast={handleContrast}
            updateDB={handleUpdateDB}
          />
        </Route>
        <Route path="/rating/threeStars">
          <Rating
            videos={videos}
            ratingVal={3}
            videosContainerContrast={videosContainerContrast}
            contrast={handleContrast}
            updateDB={handleUpdateDB}
          />
        </Route>
        <Route path="/rating/fourStars">
          <Rating
            videos={videos}
            ratingVal={4}
            videosContainerContrast={videosContainerContrast}
            contrast={handleContrast}
            updateDB={handleUpdateDB}
          />
        </Route>
        <Route path="/rating/fiveStars">
          <Rating
            videos={videos}
            ratingVal={5}
            videosContainerContrast={videosContainerContrast}
            contrast={handleContrast}
            updateDB={handleUpdateDB}
          />
        </Route>
        <Route path="/search">
          <Search
            videos={videos}
            videosContainerContrast={videosContainerContrast}
            contrast={handleContrast}
            updateDB={handleUpdateDB}
            searchString={searchString}
          />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
