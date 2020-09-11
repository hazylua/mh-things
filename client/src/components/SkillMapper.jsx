import React, { useState, useEffect } from "react";
import { Container, Col } from "react-bootstrap";

const SkillMapper = (props) => {
  const [map, mapAdd] = useState([]);

  useEffect(() => {
    let isSubscribed = true;

    fetch("https://mh-files.herokuapp.com/assets/skillmap.json")
      .then((response) => response.json())
      .then((json) => {
        if (isSubscribed) {
          mapAdd(json);
        } else {
          return null;
        }
      });
    return () => (isSubscribed = false);
  }, []);

  return <Container></Container>;
};

export default SkillMapper;
