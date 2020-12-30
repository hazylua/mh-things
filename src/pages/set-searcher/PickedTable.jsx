import React, { useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-fresh.css";

const onFirstDataRendered = (params) => {
  params.api.sizeColumnsToFit();
};

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

export const PickedTable = ({ skillsChosen, setSkillsChosen }) => {
  const removeSkillById = (id) => {
    console.log(skillsChosen);
    setSkillsChosen(skillsChosen.filter((skill) => skill.id !== id));
  };


  return (
    <div className="ag-theme-fresh results-table">
      <AgGridReact
        onFirstDataRendered={onFirstDataRendered}
        columnDefs={ChosenSkillsCols}
        rowData={skillsChosen}
        onCellClicked={(params) => removeSkillsChosen(params.node.data)}
      ></AgGridReact>
    </div>
  );
};
