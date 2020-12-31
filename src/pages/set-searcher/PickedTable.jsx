import React, { useState } from "react";

import { AgGridReact, AgGridColumn } from "ag-grid-react";
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
        rowData={skillsChosen}
        alwaysShowVerticalScroll={true}
        // Remove node by holding shift and clicking it.
        onCellClicked={(params) => {
          if (params.event.shiftKey) removeSkillById(params.node.data.id);
        }}
      >
        <AgGridColumn headerName="Skill Name" field="name" />
        <AgGridColumn
          headerName="Amount"
          field="amount"
          editable={true}
          resizable={true}
          valueGetter={(params) => {
            return params.data.amount;
          }}
          // Checks to see if amount picked for skill is valid.
          valueSetter={(params) => {
            const newAmount = params.newValue;
            const ranksLength = params.data.ranks.length;
            if (newAmount < 0 || newAmount > ranksLength) return false;
            else {
              params.data.amount = newAmount;
              return true;
            }
          }}
        />
      </AgGridReact>
    </div>
  );
};
