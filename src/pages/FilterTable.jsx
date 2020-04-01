import React from "react";

class FilterTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      rowData: [],
      filtered: []
    };
  }

  componentDidMount() {
    fetch("https://api.myjson.com/bins/149nvg")
      .then(response => response.json())
      .then(json => {
        let rows = [];
        for (let object of json) {
          let row_num = 1;
          for (let skill of object.decos) {
            rows.push({
              skill: skill,
              page: object.page,
              row: row_num
            });
            row_num += 1;
          }
        }
        // console.log(rows);
        this.setState({
          rowData: rows,
          filtered: rows
        });
      });
  }

  onSkillInputTextChange(e) {
    // console.log(
    //   this.state.rowData.filter(
    //     skill => skill.skill.toUpperCase() === e.target.value.toUpperCase()
    //   )
    // );

    this.setState({
      filtered: this.state.rowData.filter(
        skill =>
          skill.skill.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1
      )
    });
  }

  render() {
    return (
      <div>
        <h1 className="page-title">Filter Table</h1>
        <input
          id="skill-input"
          type="text"
          className="skill-input"
          placeholder="Skill Name"
          onChange={this.onSkillInputTextChange.bind(this)}
        />
        <table className="skill-table">
          <thead>
            <tr>
              <th style={{ width: "60%" }}>Skill Name</th>
              <th style={{ width: "20%" }}>Page Number</th>
              <th style={{ width: "20%" }}>Row Number</th>
            </tr>
          </thead>
          <tbody>
            {this.state.filtered.map(skill => {
              return (
                <tr>
                  <td>{skill.skill}</td>
                  <td>{skill.page}</td>
                  <td>{skill.row}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default FilterTable;
