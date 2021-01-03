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
  const [charms, setCharms] = useState(null);
  const [armor, setArmor] = useState(null);
  const [decorations, setDecorations] = useState(null);
  const [skills, setSkills] = useState(null);
  const [skillsChosen, setSkillsChosen] = useState([]);
  const [ready, setReady] = useState(false);
  const [map, setMap] = useState({});
  const [skillMap, setSkillMap] = useState(null)

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

    const handleSkillMapFetch = async () => {
      try {
        const response = await axios.get('https://mh-files.herokuapp.com/assets/skillmap.json', {cancelToken: source.token})
        const data = await response.data
        console.log(data)
        setSkillMap(data)
      } catch (err) {}
    }
    handleCharmsFetch();
    handleDecorationsFetch();
    handleArmorFetch();
    handleSkillMapFetch()

    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    if (armor && skills && decorations && charms) {
      setReady(true);
      console.log("all good");
    } else {
      if (ready !== false) setReady(false);
    }
  }, [armor, skills, decorations, charms, skillMap]);

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
          className={ready ? "search-set" : "search-set loading"}
          disabled={!ready}
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
