import React, { useState, useEffect } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

import { Layout } from "../components/Layout";

import { api } from "../services";

import "./styles/filter-table.css";

const onFirstDataRendered = (params) => {
  params.api.sizeColumnsToFit();
};

const columnDefs = [
  {
    headerName: "Skill Name",
    field: "name",
    sortable: true,
  },
  { headerName: "Page Number", field: "page", sortable: true },
  { headerName: "Row Number", field: "row", sortable: true },
];

const FilterTable = () => {
  const [skills, skillsSet] = useState([]);
  const [filtered, filteredSet] = useState([]);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await api().get("/data/skill_pages");
        const data = await response.data;
        console.log(data);
        if (data) {
          let rows = [];
          for (let object of data) {
            let row_num = 1;
            for (let skill of object.decos) {
              rows.push({
                name: skill,
                page: object.page,
                row: row_num,
              });
              row_num += 1;
            }
          }
          skillsSet(rows);
          filteredSet(rows);
        } else {
          return;
        }
      } catch (err) {
        console.log(err);
      }
    };
    handleFetch();
  }, []);

  return (
    <Layout>
      <div className="container">
        <h3>Filter Table</h3>
        <div className="info-section">
          <p>For convenience.</p>
        </div>
        <div>
          <input
            className="skill-filter"
            placeholder="Enter skill name to filter here."
            onChange={(params) => {
              var temp = skills.filter(
                (skill) =>
                  skill.name
                    .toUpperCase()
                    .indexOf(params.target.value.toUpperCase()) !== -1
              );
              filteredSet(temp);
            }}
            type="text"
          />
          <div className="skill-table ag-theme-alpine-dark">
            <AgGridReact
              onFirstDataRendered={onFirstDataRendered}
              columnDefs={columnDefs}
              rowData={filtered.map((skill) => {
                return {
                  name: skill.name,
                  page: skill.page,
                  row: skill.row,
                };
              })}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FilterTable;
