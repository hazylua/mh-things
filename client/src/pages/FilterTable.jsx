import React, { useState, useEffect } from "react";
import { Container, Col, Form, InputGroup, FormControl } from "react-bootstrap";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

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
  const [skills, skillsAdd] = useState([]);
  const [filtered, filteredAdd] = useState([]);

  useEffect(() => {
    let isSubscribed = true;

    fetch(
      "https://raw.githubusercontent.com/yb00/mh-things/source/client/json/skill_pages.json"
    )
      .then((response) => response.json())
      .then((json) => {
        if (isSubscribed) {
          let rows = [];
          for (let object of json) {
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
          skillsAdd(rows);
          filteredAdd(rows);
        } else {
          return null;
        }
      });
    return () => (isSubscribed = false);
  }, []);

  return (
    <Container>
      <Col>
        <h2>Filter Table</h2>
        <p>For convenience.</p>
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
                filteredAdd(temp);
              }}
              size="lg"
              type="text"
              placeholder="Skill name"
            ></FormControl>
          </InputGroup>
        </Form>
        <div
          className="ag-theme-alpine-dark"
          style={{
            height: "1000px",
            width: "100%",
          }}
        >
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
      </Col>
    </Container>
  );
};

// class FilterTable extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       columnDefs: [
//         {
//           headerName: "Skill Name",
//           field: "name",
//           sortable: true,
//         },
//         { headerName: "Page Number", field: "page", sortable: true },
//         { headerName: "Row Number", field: "row", sortable: true },
//       ],
//       rowData: [],
//       filtered: [],
//     };
//   }

//   componentDidMount() {
//     fetch(
//       "https://raw.githubusercontent.com/yb00/mh-things/source/client/json/skill_pages.json"
//     )
//       .then((response) => response.json())
//       .then((json) => {
//         let rows = [];
//         for (let object of json) {
//           let row_num = 1;
//           for (let skill of object.decos) {
//             rows.push({
//               skill: skill,
//               page: object.page,
//               row: row_num,
//             });
//             row_num += 1;
//           }
//         }

//         this.setState({
//           rowData: rows,
//           filtered: rows,
//         });
//       });
//   }

//   onSkillInputTextChange(e) {
//     this.setState({
//       filtered: this.state.rowData.filter(
//         (skill) =>
//           skill.skill.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1
//       ),
//     });
//   }

//   render() {
//     return (
//       <Container>
//         <Col>
//           <h2>Filter Table</h2>
//           <p>For convenience.</p>
//           <Form>
//             <InputGroup>
//               <InputGroup.Prepend>
//                 <InputGroup.Text>
//                   <i className="fa fa-search"></i>
//                 </InputGroup.Text>
//               </InputGroup.Prepend>
//               <FormControl
//                 id="skill-input"
//                 type="text"
//                 className="input-group-text justify-content-center"
//                 placeholder="Skill Name"
//                 onChange={this.onSkillInputTextChange.bind(this)}
//                 size="lg"
//                 type="text"
//                 placeholder="Skill name"
//               ></FormControl>
//             </InputGroup>
//           </Form>
//           <div
//             className="ag-theme-alpine-dark"
//             style={{
//               height: "1000px",
//               width: "100%",
//             }}
//           >
//             <AgGridReact
//               onFirstDataRendered={onFirstDataRendered}
//               columnDefs={this.state.columnDefs}
//               rowData={this.state.filtered.map((skill) => {
//                 return {
//                   name: skill.skill,
//                   page: skill.page,
//                   row: skill.row,
//                 };
//               })}
//             ></AgGridReact>
//           </div>
//         </Col>
//       </Container>
//     );
//   }
// }

export default FilterTable;
