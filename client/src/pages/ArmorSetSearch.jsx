import React, { Component } from "react";

class ArmorSetSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      armorPieces: [],
      filtered: [],
      set: [],
    };
  }

  componentDidMount() {
    fetch("https://mhw-db.com/armor")
      .then((response) => response.json())
      .then((json) => {
        let armorPieces = [];
        for (let object of json) {
          if (object.rank == "master") {
            armorPieces.push({
              id: object.id,
              name: object.name,
              type: object.type,
              slots: object.slots,
              skills: object.skills,
              armorSet: object.armorSet,
              attributes: object.attributes,
            });
          }
        }
        this.setState({
          armorPieces: armorPieces,
          filtered: armorPieces,
        });
        console.log(this.state.armorPieces);
      });
  }

  logSkill = (e) => {
    // var set = this.state.set;
    // var index = set.indexOf(e.target.textContent);
    // if (index !== -1) {
    //   set.splice(index, 1);
    //   this.setState({
    //     set: set,
    //   });
    // } else {
    //   set.push(e.target.textContent);
    //   this.setState({
    //     set: set,
    //   });
    // }
    console.log(
      this.state.armorPieces.filter((object) => {
        return object.name === e.target.textContent;
      })
    );
  };

  onInputTextChange(e) {
    this.setState({
      filtered: this.state.armorPieces.filter(
        (armorPiece) =>
          armorPiece.name
            .toUpperCase()
            .indexOf(e.target.value.toUpperCase()) !== -1
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
                  <th>armorPieces Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.filtered.map((armorPieces, i) => {
                  return (
                    <tr key={i}>
                      <td onClick={this.logSkill}>
                        <p className="list-item">{armorPieces.name}</p>
                        <p>{armorPieces.type}</p>
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
