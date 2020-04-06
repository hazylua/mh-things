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

    // console.log(this.state.set);
    // skills.map(skill => {
    //   if (skill === e.target.textContent) console.log(skill);
    // });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <h1 className="page-title">Armor Set Searcher</h1>
          <div className="column">
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
                        <p title={skill.description} className="tooltip">
                          {skill.name}
                          {/* <span className="tooltiptext">
                            {skill.description}
                          </span> */}
                        </p>
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
