import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const onFirstDataRendered = (params) => {
  params.api.sizeColumnsToFit();
};

const ArmorSetSearcher = () => {
  const [skills, skillsAdd] = useState([]);
  const [setSkills, setSkillsAdd] = useState([]);

  const colDefs = [
    {
      headerName: "Skill Name",
      field: "name",
    },
  ];

  const sampleData = [
    { name: "Critical Eye" },
    { name: "Maximum Might" },
    { name: "Agitator" },
  ];

  useEffect(() => {
    let isSubscribed = true;

    fetch("https://mhw-db.com/skills")
      .then((response) => response.json())
      .then((json) => (isSubscribed ? skillsAdd(json) : null));
    return () => (isSubscribed = false);
  }, []);

  return (
    <React.Fragment>
      <h1 className="page-title">Armor Set Searcher</h1>
      <Container className="d-flex justify-content-center">
        <Row>
          <Col>
            <p>
              Please choose the skills you want in your set from the list below:
            </p>
            <div className="ag-theme-balham" style={{ height: "250px" }}>
              <AgGridReact
                onFirstDataRendered={onFirstDataRendered}
                columnDefs={colDefs}
                rowData={skills}
                onCellClicked={(params) => {
                  if (setSkills.indexOf(params.node.data) === -1)
                    setSkillsAdd((setSkills) => [
                      ...setSkills,
                      params.node.data,
                    ]);
                }}
              ></AgGridReact>
            </div>
          </Col>
          <Col>
            <p>Skills chosen. You can readjust their values:</p>
            <div className="ag-theme-balham" style={{ height: "250px" }}>
              <AgGridReact
                onFirstDataRendered={onFirstDataRendered}
                columnDefs={colDefs}
                rowData={setSkills}
                onCellClicked={(params) => {
                  var temp = [...setSkills];
                  var index = temp.indexOf(params.node.data);
                  temp.splice(index, 1);
                  setSkillsAdd(temp);
                }}
              ></AgGridReact>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ArmorSetSearcher;
