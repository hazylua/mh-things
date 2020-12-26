import React, { useState, useEffect } from "react";

import * as subset from "../../pages/set-searcher/Subset";

const formatResults = (results) => {
  let jsx = [];
  if (results) {
    jsx.push(<h3>Armor Pieces:</h3>);
    for (let key in results) {
      jsx.push(<p style={{ fontWeight: "bold" }}>{key}</p>);
      for (let type in results[key]) {
        jsx.push(<p style={{ marginLeft: "10px" }}>{type}</p>);
        for (let piece of results[key][type]) {
          jsx.push(<p style={{ marginRight: "20px" }}>{piece.name}</p>);
        }
      }
    }
  }

  return jsx;
};

const Results = (props) => {
  const [armorDB, armorDBSet] = useState([]);
  const [charmsDB, charmsDBSet] = useState([]);

  const [results, resultsSet] = useState({});
  useEffect(() => {
    let isSubscribed = true;

    subset.fetchArmorDB().then((response) => armorDBSet(response));
    subset.fetchCharmsDB().then((response) => charmsDBSet(response));

    return () => (isSubscribed = false);
  }, []);

  return (
    <React.Fragment>
      <div className="results-box">
        <h3>Results</h3>
        <button
          className="results-wide-button"
          onClick={() => {
            resultsSet(subset.mapSkills(props.skills, armorDB, charmsDB));
          }}
        >
          Search
        </button>
        <div>{formatResults(results)}</div>
      </div>
    </React.Fragment>
  );
};

export default Results;
