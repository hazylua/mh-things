import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

const onFirstDataRendered = (params) => {
  params.api.sizeColumnsToFit();
};

const ArmorSetSearcher = () => {
  const [skills, skillsAdd] = useState([]);
  const [setSkills, setSkillsAdd] = useState([]);
  const [filtered, addFiltered] = useState([]);

  const colDefs = [
    {
      headerName: "Skill Name",
      field: "name",
    },
  ];

  useEffect(() => {
    let isSubscribed = true;

    fetch("https://mhw-db.com/skills")
      .then((response) => response.json())
      .then((json) => {
        if (isSubscribed) {
          skillsAdd(json);
          addFiltered(json);
        } else {
          return null;
        }
      });
    return () => (isSubscribed = false);
  }, []);

  return (
    <Container>
      <Row style={{ marginBottom: "20px" }}>
        <Col>
          <h2>Armor Set Searcher</h2>
          <p>
            Please choose the skills you want in your set from the list below:
          </p>
          <Form>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="fa fa-search"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="skill-input"
                type="text"
                className="input-group-text justify-content-center"
                placeholder="Skill Name"
                onChange={(params) => {
                  var temp = skills.filter(
                    (skill) =>
                      skill.name
                        .toUpperCase()
                        .indexOf(params.target.value.toUpperCase()) !== -1
                  );
                  addFiltered(temp);
                }}
                type="text"
                placeholder="Skill name"
              ></FormControl>
            </InputGroup>
          </Form>
          <div className="ag-theme-alpine-dark" style={{ height: "500px" }}>
            <AgGridReact
              onFirstDataRendered={onFirstDataRendered}
              columnDefs={colDefs}
              rowData={filtered}
              onCellClicked={(params) => {
                if (setSkills.indexOf(params.node.data) === -1)
                  setSkillsAdd((setSkills) => [...setSkills, params.node.data]);
              }}
            ></AgGridReact>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Chosen skills:</p>
          <div className="ag-theme-alpine-dark" style={{ height: "500px" }}>
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
  );
};

export default ArmorSetSearcher;
