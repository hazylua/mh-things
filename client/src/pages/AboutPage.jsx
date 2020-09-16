import React from "react";
import { Container, Col } from "react-bootstrap";

const AboutPage = () => (
  <Container>
    <Col>
      <h2>About:</h2>
      <p>
        Source code for this page is here:{" "}
        <a href="https://github.com/yb00/mh-things">
          https://github.com/yb00/mh-things
        </a>
      </p>
    </Col>
  </Container>
);

export default AboutPage;
