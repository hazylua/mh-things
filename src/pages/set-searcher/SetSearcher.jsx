import React, { useState, useEffect } from "react";

import "./SetSearcher.css";

import { Layout } from "../../components/Layout";



import * as subset from "./Subset";

import { SkillsTable, PickedTable } from "./";

const SetSearcher = () => {
  const [config, configSet] = useState({
    maxResults: 10,
  });
  const [inventory, inventorySet] = useState({
    head: [],
    chest: [],
    gloves: [],
    waist: [],
    legs: [],
    charm: [],
    decos: [],
  });
  const [charms, charmsSet] = useState([]);
  const [armor, armorSet] = useState([]);
  const [decos, decosSet] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillsChosen, setSkillsChosen] = useState([]);
  const removeSkillsChosen = (value) => {
    setSkillsChosen(skillsChosen.filter((skill) => skill !== value));
  };

  return (
    <Layout>
      <div className="container">
        <div className="info-section">
          <p>Search for any sets you want here.</p>
        </div>
        <div className="set-searcher-area">
          <SkillsTable skills={skills} setSkills={setSkills} skillsChosen={skillsChosen} setSkillsChosen={setSkillsChosen} />
          <span className="sep" />
          <PickedTable
            skillsChosen={skillsChosen}
            setSkillsChosen={setSkillsChosen}
            removeSkillsChosen={removeSkillsChosen}
          />
        </div>
        <button className="search-set">Search for set</button>
      </div>
    </Layout>
  );
};



export default SetSearcher;
