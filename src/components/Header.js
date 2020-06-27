import React from 'react';
import './index.css';
import {
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
} from 'react-bootstrap';
import star from '../images/star.png';

function Header(props) {
  const [searchString, setSearchString] = React.useState('');

  function handleSearch() {
    props.setSearchString(searchString);

    if (document.location.href !== 'http://localhost:3000/search') {
      document.location.href = 'http://localhost:3000/search';
    }
  }

  return (
    <div id={props.headerContrast}>
      <Navbar bg="" expand="lg">
        <Navbar.Brand style={{ fontSize: '1.5em' }} href="#home">
          Favid-List
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="http://localhost:3000/allVideos">
              All Videos
            </Nav.Link>
            <Nav.Link href="http://localhost:3000/unviewed">Unviewed</Nav.Link>
            <Nav.Link href="http://localhost:3000/viewed">Viewed</Nav.Link>
            <NavDropdown title="Rating" id="basic-nav-dropdown">
              <NavDropdown.Item href="http://localhost:3000/rating/oneStar">
                <img id="rating-star" alt="star-icon" src={star} />
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="http://localhost:3000/rating/twoStars">
                {[1, 2].map((i) => {
                  return <img id="rating-star" alt="star-icon" src={star} />;
                })}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="http://localhost:3000/rating/threeStars">
                {[1, 2, 3].map((i) => {
                  return <img id="rating-star" alt="star-icon" src={star} />;
                })}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="http://localhost:3000/rating/fourStars">
                {[1, 2, 3, 4].map((i) => {
                  return <img id="rating-star" alt="star-icon" src={star} />;
                })}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="http://localhost:3000/rating/fiveStars">
                {[1, 2, 3, 4, 5].map((i) => {
                  return <img id="rating-star" alt="star-icon" src={star} />;
                })}
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="http://localhost:3000/archive">Archive</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl
              onInput={(e) => setSearchString(e.target.value)}
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
            <Button onClick={handleSearch} variant="outline-success">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <div id="film-tape"></div>
    </div>
  );
}

export default Header;
