import React, { useState, useEffect } from "react";
import { Col, Button } from "react-bootstrap";

import * as subset from "./Subset";

const formatResults = (results) => {
  let jsx = [];
  for (let key in results) {
    jsx.push(<p>{key}</p>);
    for (let type in results[key]) {
      jsx.push(<p>{type}</p>);
      for (let piece of results[key][type]) {
        jsx.push(<p>{piece.name}</p>);
      }
    }
  }

  return jsx;
};

const Results = (props) => {
  // const [data, dataSet] = useState({});
  // const [armor, armorSet] = useState({});
  // const [decos, decosSet] = useState({});
  // const [charms, charmsSet] = useState({});

  const [armorDB, armorDBSet] = useState([]);
  const [charmsDB, charmsDBSet] = useState([]);

  const [results, resultsSet] = useState({});
  useEffect(() => {
    let isSubscribed = true;

    // subset.fetchData().then((response) => dataSet(response));
    // subset.fetchArmor().then((response) => armorSet(response));
    // subset.fetchDecos().then((response) => decosSet(response));
    // subset.fetchCharms().then((response) => charmsSet(response));

    subset.fetchArmorDB().then((response) => armorDBSet(response));
    subset.fetchCharmsDB().then((response) => charmsDBSet(response));

    return () => (isSubscribed = false);
  }, []);

  return (
    <React.Fragment>
      <Col className="results-box">
        <h3>Results</h3>
        <Button
          className="results-wide-button"
          onClick={() => {
            resultsSet(subset.mapSkills(props.skills, armorDB, charmsDB));
          }}
        >
          Search
        </Button>
        <div>{formatResults(results)}</div>
      </Col>
    </React.Fragment>
  );
};

export default Results;
