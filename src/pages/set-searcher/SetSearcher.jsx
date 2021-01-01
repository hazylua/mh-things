import React, { useState, useEffect } from "react";

import "./SetSearcher.css";

import { Layout } from "../../components/Layout";

import * as subset from "./Subset";

import { mhwdb } from "../../services";
import axios from "axios";

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
  const [charms, setCharms] = useState([]);
  const [armor, setArmor] = useState([]);
  const [decorations, setDecorations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillsChosen, setSkillsChosen] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const handleCharmsFetch = async () => {
      try {
        const response = await mhwdb().get("/charms", {
          cancelToken: source.token,
        });
        const data = await response.data;
        setCharms(data);
      } catch (err) {}
    };
    const handleDecorationsFetch = async () => {
      try {
        const response = await mhwdb().get("/decorations", {
          cancelToken: source.token,
        });
        const data = response.data;
        setDecorations(data);
      } catch (err) {}
    };
    const handleArmorFetch = async () => {
      try {
        const response = await mhwdb().get("/armor", {
          cancelToken: source.token,
        });
        const data = response.data;
        setArmor(data);
      } catch (err) {}
    };
    handleCharmsFetch();
    handleDecorationsFetch();
    handleArmorFetch();

    return () => {
      source.cancel('cancelled')
    }
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="info-section">
          <p>Search for any sets you want here.</p>
        </div>
        <div className="set-searcher-area">
          <SkillsTable
            skills={skills}
            setSkills={setSkills}
            skillsChosen={skillsChosen}
            setSkillsChosen={setSkillsChosen}
          />
          <span className="sep" />
          <PickedTable
            skillsChosen={skillsChosen}
            setSkillsChosen={setSkillsChosen}
          />
        </div>
        <button
          className="search-set"
          onClick={() => {
            const mapped = subset.mapSkills(skills, armor, charms, decorations);
            console.log(mapped);
          }}
        >
          Search for set
        </button>
      </div>
    </Layout>
  );
};

export default SetSearcher;
