import React, { useState, useEffect } from "react";
import { Col, Button } from "react-bootstrap";

import SkillMapper from "../components/SkillMapper";

const Results = (props) => {
  const [maps, mapsAdd] = useState([
    {
      name: "data",
      url: "https://mh-files.herokuapp.com/assets/skillmap.json",
    },
    {
      name: "armor",
      url: "https://mh-files.herokuapp.com/assets/armormap.json",
    },
    {
      name: "charms",
      url: "https://mh-files.herokuapp.com/assets/charmmap.json",
    },
    {
      name: "deco",
      url: "https://mh-files.herokuapp.com/assets/decomap.json",
    },
  ]);
  const [search, searchAdd] = useState(props.skills);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    console.log("useEffect");

    Promise.all(
      maps.map((map) => {
        return fetch(map.url)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            return data;
          });
      })
    ).then((values) => {
      setResponse(...response, response.push(values[0]));
      setResponse(...response, response.push(values[1]));
      setResponse(...response, response.push(values[2]));
      setResponse(...response, response.push(values[3]));
    });

    return () => (isSubscribed = false);
  }, []);

  return (
    <React.Fragment>
      <Col
        style={{
          border: "3px solid white",
          borderImage: "linear-gradient(0deg, #808080, #4a4a4a)",
          borderImageSlice: "1",
        }}
      >
        <h3
          style={{
            padding: "10px",
            background: "#22c1c3",
            backgroundColor: "#4d4d4d",
          }}
        >
          Results
        </h3>
        <Button
          style={{
            marginTop: "10px",
            marginBottom: "20px",
            width: "100%",
          }}
        >
          Test Me
        </Button>
        <div>{/* <SkillMapper></SkillMapper> */}</div>
      </Col>
    </React.Fragment>
  );
};

export default Results;
