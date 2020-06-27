import React from "react";
import "./index.css";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import github from "../images/github-icon.png";
import linkedin from "../images/linkedin-icon.png";
import favid from "../images/favid-icon.png";

function Footer(props) {
  return (
    <div id="footer">
      <div style={{ marginBottom: "-25px" }} id="film-tape"></div>
      <MDBFooter color="blue" className="font-small pt-4 mt-4">
        <MDBContainer fluid>
          <h2>
            Favid-List <span style={{ color: "black" }}>||</span> Made by{" "}
            <span style={{ color: "#232323" }}>Maher</span> &{" "}
            <span style={{ color: "#232323" }}>Yaman</span>
          </h2>{" "}
        </MDBContainer>
        <MDBContainer fluid className="text-center text-md-left">
          <MDBRow>
            <MDBCol md="6">
              <hr />
              <p>An app that will help you organize your videos.</p>
              <p>This app will give you a space of privacy.</p>
            </MDBCol>
            <MDBCol md="3">
              <h5 className="title">Maher</h5>
              <ul>
                <li className="list-unstyled">
                  <a
                    href="https://github.com/maher-suleyman"
                    style={{ color: "#444444" }}
                  >
                    GitHub{" "}
                    <img
                      className="contact-icon"
                      src={github}
                      alt="github-icon"
                    />
                  </a>
                </li>
                <li className="list-unstyled">
                  <a
                    href="https://www.linkedin.com/in/maher-suleyman/"
                    style={{ color: "#444444" }}
                  >
                    Linked In{" "}
                    <img
                      className="contact-icon"
                      src={linkedin}
                      alt="linkedin-icon"
                    />
                  </a>
                </li>
              </ul>
            </MDBCol>
            <MDBCol md="3">
              <h5 className="title">Yaman</h5>
              <ul>
                <li className="list-unstyled">
                  <a
                    href="https://github.com/yamoonz"
                    style={{ color: "#444444" }}
                  >
                    GitHub{" "}
                    <img
                      className="contact-icon"
                      src={github}
                      alt="github-icon"
                    />
                  </a>
                </li>
                <li className="list-unstyled">
                  <a href="#!" style={{ color: "#444444" }}>
                    Linked In{" "}
                    <img
                      className="contact-icon"
                      src={linkedin}
                      alt="linkedin-icon"
                    />
                  </a>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className="footer-copyright text-center py-3">
          <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Copyright ||{" "}
            <img className="contact-icon" src={favid} alt="linkedin-icon" /> ||
            Favid-List
          </MDBContainer>
        </div>
      </MDBFooter>
    </div>
  );
}

export default Footer;
