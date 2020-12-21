import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";

import "./SetSearcher.css";

import Results from "../components/Results";

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
  const colSets = [
    {
      headerName: "Skill Chosen",
      field: "name",
    },
    {
      headerName: "Skill Level",
      field: "ranks.length",
      editable: "true",
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
      <h2>Armor Set Searcher</h2>
      <Row>
        <Col>Choose the skills from the list below:</Col>
        <Col>Chosen skills:</Col>
      </Row>
      <Row>
        <Col style={{ paddingBottom: "0", paddingTop: "0" }}>
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
              ></FormControl>
            </InputGroup>
          </Form>
        </Col>
        <Col style={{ paddingBottom: "0", paddingTop: "0" }}></Col>
      </Row>
      <Row>
        <Col style={{ paddingBottom: "0", paddingTop: "0" }}>
          <div className="ag-theme-alpine-dark">
            <AgGridReact
              onFirstDataRendered={onFirstDataRendered}
              columnDefs={colDefs}
              rowData={filtered}
              onCellClicked={(params) => {
                if (setSkills.indexOf(params.node.data) === -1) {
                  setSkillsAdd((setSkills) => [...setSkills, params.node.data]);
                }
              }}
            ></AgGridReact>
          </div>
        </Col>
        <Col style={{ paddingBottom: "0", paddingTop: "0" }}>
          <div className="ag-theme-alpine-dark">
            <AgGridReact
              onFirstDataRendered={onFirstDataRendered}
              columnDefs={colSets}
              rowData={setSkills}
              // onCellClicked={(params) => {
              //   var temp = [...setSkills];
              //   var index = temp.indexOf(params.node.data);
              //   temp.splice(index, 1);
              //   setSkillsAdd(temp);
              // }}
            ></AgGridReact>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Results skills={setSkills} data={skills}></Results>
        </Col>
      </Row>
    </Container>
  );
};

export default ArmorSetSearcher;
