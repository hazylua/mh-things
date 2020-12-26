import React, { useState, useEffect } from "react";

import "./SetSearcher.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-fresh.css";

import { Layout } from "../../components/Layout";

import { mhwdb } from "../../services";

const onFirstDataRendered = (params) => {
  params.api.sizeColumnsToFit();
};

const SetSkillsCols = [
  {
    headerName: "Skill Name",
    field: "name",
    filter: true,
  },
];
const ChosenSkillsCols = [
  {
    headerName: "Skill Chosen",
    field: "name",
  },
  {
    headerName: "Skill Level",
    field: "ranks.length",
    editable: true,
  },
];

const SetSearcher = () => {
  const [skills, skillsSet] = useState([]);
  const [skillsChosen, skillsChosenSet] = useState([]);

  const handleChosenSkillsRemove = (value) => {
    skillsChosenSet(skillsChosen.filter((skill) => skill !== value));
  };

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await mhwdb().get("/skills");
        const data = await response.data;
        skillsSet(data);
      } catch (err) {}
    };

    handleFetch();
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="info-section">
          <p>Search for any sets you want here.</p>
        </div>
        <div className="set-searcher-area">
          {/* <aside className="set-searcher-settings"> + </aside> */}
          <div className="ag-theme-fresh set-skills-table">
            <AgGridReact
              onFirstDataRendered={onFirstDataRendered}
              columnDefs={SetSkillsCols}
              rowData={skills}
              onCellClicked={(params) => {
                if (skillsChosen.indexOf(params.node.data) === -1) {
                  skillsChosenSet([...skillsChosen, params.node.data]);
                }
              }}
            ></AgGridReact>
          </div>
          <span className="sep" />
          <div className="ag-theme-fresh results-table">
            <AgGridReact
              onFirstDataRendered={onFirstDataRendered}
              columnDefs={ChosenSkillsCols}
              rowData={skillsChosen}
              onCellClicked={(params) =>
                handleChosenSkillsRemove(params.node.data)
              }
            ></AgGridReact>
          </div>
        </div>
      </div>
    </Layout>
  );
};

/* ; */

export default SetSearcher;
