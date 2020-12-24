import React, { useState, useEffect } from "react";

import "./SetSearcher.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

import { Navbar } from "../../components/Navbar";

const onFirstDataRendered = (params) => {
  params.api.sizeColumnsToFit();
};

const SetSearcher = () => {
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
    <div>
      <Navbar />
    </div>
  );
};

/* <div className="ag-theme-alpine-dark">
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
</div>; */

/* <div className="ag-theme-alpine-dark">
  <AgGridReact
    onFirstDataRendered={onFirstDataRendered}
    columnDefs={colSets}
    rowData={setSkills}
  ></AgGridReact>
</div>; */

export default SetSearcher;
