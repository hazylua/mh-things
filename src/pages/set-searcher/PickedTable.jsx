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

export const PickedTable = ({skillsChosen, setSkillsChosen, removeSkillsChosen}) => {


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
