import React, { useState, useEffect } from "react";
import { Col, Button } from "react-bootstrap";

import * as subset from "./Subset";

const setSearchValues = (skills, data, armor, charms, decos) => {
  subset.searchSet(skills);
  subset.responseSet(data, armor, charms, decos);
};

const Results = (props) => {
  const [data, dataSet] = useState({});
  const [armor, armorSet] = useState({});
  const [decos, decosSet] = useState({});
  const [charms, charmsSet] = useState({});

  useEffect(() => {
    let isSubscribed = true;

    subset.fetchData().then((response) => dataSet(response));
    subset.fetchArmor().then((response) => armorSet(response));
    subset.fetchDecos().then((response) => decosSet(response));
    subset.fetchCharms().then((response) => charmsSet(response));

    return () => (isSubscribed = false);
  }, []);

  return (
    <React.Fragment>
      <Col className="results-box">
        <h3>Results</h3>
        <Button
          className="results-wide-button"
          onClick={() => {
            setSearchValues(props.skills, data, armor, charms, decos);
          }}
        >
          Send Values
        </Button>
      </Col>
    </React.Fragment>
  );
};

export default Results;
