import React, { Component } from "react";

class ArmorSetSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      filtered: [],
      set: [],
    };
  }

  componentDidMount() {
    fetch("https://mhw-db.com/skills")
      .then((response) => response.json())
      .then((json) => {
        let skills = [];
        for (let object of json) {
          skills.push({
            name: object.name,
            description: object.description,
          });
        }
        this.setState({
          skills: skills,
          filtered: skills,
        });
      });
  }

  addSkill = (e) => {
    var set = this.state.set;
    var index = set.indexOf(e.target.textContent);
    if (index !== -1) {
      set.splice(index, 1);
      this.setState({
        set: set,
      });
    } else {
      set.push(e.target.textContent);
      this.setState({
        set: set,
      });
    }

    console.log(this.state.set);
  };

  onInputTextChange(e) {
    this.setState({
      filtered: this.state.skills.filter(
        (skill) =>
          skill.name.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1
      ),
    });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <h1 className="page-title">Armor Set Searcher</h1>
          <div className="column">
            <input
              id="skill-input"
              type="text"
              className="skill-input"
              placeholder="Skill Name"
              onChange={this.onInputTextChange.bind(this)}
            />
            <table className="skill-table">
              <thead>
                <tr>
                  <th>Skill Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.filtered.map((skill) => {
                  return (
                    <tr>
                      <td onClick={this.addSkill}>
                        <p className="list-item">{skill.name}</p>
                        <p>{skill.description}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ArmorSetSearch;
