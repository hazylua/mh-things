import React from "react";
import { Container, Col } from "react-bootstrap";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const onFirstDataRendered = (params) => {
  params.api.sizeColumnsToFit();
};

class FilterTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: "Skill Name",
          field: "name",
          sortable: true,
          filter: true,
        },
        { headerName: "Page Number", field: "page", sortable: true },
        { headerName: "Row Number", field: "row", sortable: true },
      ],
      rowData: [],
      filtered: [],
    };
  }

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/yb00/mh-things/source/client/json/skill_pages.json"
    )
      .then((response) => response.json())
      .then((json) => {
        let rows = [];
        for (let object of json) {
          let row_num = 1;
          for (let skill of object.decos) {
            rows.push({
              skill: skill,
              page: object.page,
              row: row_num,
            });
            row_num += 1;
          }
        }

        this.setState({
          rowData: rows,
          filtered: rows,
        });
      });
  }

  onSkillInputTextChange(e) {
    this.setState({
      filtered: this.state.rowData.filter(
        (skill) =>
          skill.skill.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1
      ),
    });
  }

  render() {
    return (
      <div>
        <h1 className="page-title">Filter Table</h1>
        {/* <input
          id="skill-input"
          type="text"
          className="skill-input"
          placeholder="Skill Name"
          onChange={this.onSkillInputTextChange.bind(this)}
        /> */}
        <div>
          <Container className="d-flex justify-content-center">
            <Col>
              <p>For convenience.</p>
              <div
                className="ag-theme-balham"
                style={{
                  height: "250px",
                  width: "100%",
                }}
              >
                <AgGridReact
                  onFirstDataRendered={onFirstDataRendered}
                  columnDefs={this.state.columnDefs}
                  rowData={this.state.filtered.map((skill) => {
                    return {
                      name: skill.skill,
                      page: skill.page,
                      row: skill.row,
                    };
                  })}
                ></AgGridReact>
              </div>
            </Col>
          </Container>
        </div>
        {/* <table className="skill-table">
          <thead>
            <tr>
              <th style={{ width: "60%" }}>Skill Name</th>
              <th style={{ width: "20%" }}>Page Number</th>
              <th style={{ width: "20%" }}>Row Number</th>
            </tr>
          </thead>
          <tbody>
            {this.state.filtered.map((skill) => {
              return (
                <tr>
                  <td>{skill.skill}</td>
                  <td>{skill.page}</td>
                  <td>{skill.row}</td>
                </tr>
              );
            })}
          </tbody>
        </table> */}
      </div>
    );
  }
}

export default FilterTable;
