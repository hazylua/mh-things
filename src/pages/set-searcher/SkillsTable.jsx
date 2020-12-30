import React, { useState, useEffect } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-fresh.css";

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

export const SkillsTable = ({
  skills,
  setSkills,
  skillsChosen,
  setSkillsChosen,
}) => {
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await mhwdb().get("/skills");
        const data = await response.data;
        setSkills(data);
      } catch (err) {}
    };

    handleFetch();
  }, []);

  return (
    <div className="ag-theme-fresh set-skills-table">
      <AgGridReact
        onFirstDataRendered={onFirstDataRendered}
        columnDefs={SetSkillsCols}
        rowData={skills}
        onCellClicked={(params) => {
          if (skillsChosen.indexOf(params.node.data) === -1) {
            setSkillsChosen([...skillsChosen, params.node.data]);
          }
        }}
      ></AgGridReact>
    </div>
  );
};
