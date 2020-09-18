import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";

const SkillMapper = (props) => {
  const [maps, mapsAdd] = useState([
    {
      name: "data",
      url: "https://mh-files.herokuapp.com/assets/skillmap.json",
      content: null,
    },
    {
      name: "armor",
      url: "https://mh-files.herokuapp.com/assets/armormap.json",
      content: null,
    },
    {
      name: "charms",
      url: "https://mh-files.herokuapp.com/assets/charmmap.json",
      content: null,
    },
    {
      name: "deco",
      url: "https://mh-files.herokuapp.com/assets/decomap.json",
      content: null,
    },
  ]);
  const [search, searchAdd] = useState({
    "critical-eye": 7,
    "attack-boost": 7,
    "peak-performance": 3,
  });
  const [inventory, inventoryAdd] = useState({
    head: [],
    chest: [],
    gloves: [],
    waist: [],
    legs: [],
    charm: [],
  });
  const [limit, setLimit] = useState(10);

  const [response, setResponse] = useState({});

  useEffect(() => {
    let isSubscribed = true;
    let data = null;
    let armor = null;
    let charms = null;
    let deco = null;

    Promise.all(
      maps.map((map) => {
        return fetch(map.url)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            return data;
          });
      })
    )
      .then((values) => {
        data = JSON.parse(JSON.stringify(values[0]));
        armor = JSON.parse(JSON.stringify(values[1]));
        charms = JSON.parse(JSON.stringify(values[2]));
        deco = JSON.parse(JSON.stringify(values[3]));
      })
      .then(() => {
        for (let s in search) {
          for (let a of data["master"][s]) {
            inventoryAdd(inventory, inventory[a[1]].push(a));
          }
        }
      });

    inventoryAdd(inventory, inventory["head"].push([0, 0, 0]));
    inventoryAdd(inventory, inventory["chest"].push([0, 0, 0]));
    inventoryAdd(inventory, inventory["gloves"].push([0, 0, 0]));
    inventoryAdd(inventory, inventory["waist"].push([0, 0, 0]));
    inventoryAdd(inventory, inventory["legs"].push([0, 0, 0]));
    inventoryAdd(inventory, inventory["charm"].push([0, 0, 0]));

    for (let i in inventory) {
      inventoryAdd(inventory, inventory[i].sort());
    }

    function check_levels(total) {
      for (var skill in search) {
        if (
          skill in total["skills"] &&
          total["skills"][skill] == search["skill"]
        ) {
        } else {
          return false;
        }
      }
      return true;
    }

    // ???
    function equip_deco(armor, level, skill, total) {
      if (skill in deco[level]) {
        for (var effects of deco[level][skill]) {
          if (total["slots"][level] <= 0) {
            return;
          }

          var temp = {};

          for (var s in effects[1]) {
            temp[s[1]] = s[0];
            if (s[1] in total["skills"]) {
              temp[s[1]] += total["skills"][s[1]];
            }
          }
          if (temp[skill] <= search[skill]) {
            for (var key in temp) {
              total["skills"][key] = temp[key];
            }
            total["slots"][level] -= 1;
            armor["decos"].push(effects[0]);
          }
        }
      } else {
        return;
      }
    }

    const fill_decoration = (armorset, total) => {
      console.log(total);

      // Need to deep copy.
      for (var skill in JSON.parse(JSON.stringify(total["skills"]))) {
        if (skill in search && total["skills"][skill] < search[skill]) {
          total["slots"].forEach((slot_level, index) => {
            equip_deco(armorset, slot_level, skill, total);
            if (total["skills"][skill] == search[skill]) {
              return;
            }
          });
        }
        total["slots"].forEach((slot_level, index) => {
          console.log(deco[slot_level]);
        });
        console.log(armorset);
      }
    };

    const fits = (armorset, piece, piece_type, total) => {
      if (piece[0] == 0) {
        return total, true, armorset;
      }

      var d = null;
      if (piece_type == "charm") {
        d = charms[piece[0]];
      } else {
        d = armor[piece[0]];
      }

      var armor_copy = JSON.parse(JSON.stringify(armorset));
      armor_copy[piece_type] = piece[0];

      var tcopy = JSON.parse(JSON.stringify(total));

      for (var slot in piece[3]) {
        tcopy["slots"][slot - 1] += 1;
      }
      for (var i in d) {
        if (i[2] in tcopy["skills"]) {
        }
      }
    };

    const chest = (armory, armor, total, check, sets) => {
      if (!check) {
        return;
      }

      for (let g in armory) {
        let t,
          c,
          a = fits(armor, g, "chest", total);
        gloves(inventory["gloves"], a, t, c, sets);
        if (sets.length > limit) {
          return;
        }
      }
    };

    const gloves = (armory, armor, total, check, sets) => {
      if (!check) {
        return;
      }

      for (let g in armory) {
        let t,
          c,
          a = fits(armor, g, "gloves", total);
        waist(inventory["waist"], a, t, c, sets);
        if (sets.length > limit) {
          return;
        }
      }
    };

    const waist = (armory, armor, total, check, sets) => {
      if (!check) {
        return;
      }

      for (let g in armory) {
        let t,
          c,
          a = fits(armor, g, "waist", total);
        legs(inventory["legs"], a, t, c, sets);
        if (sets.length > limit) {
          return;
        }
      }
    };

    const legs = (armory, armor, total, check, sets) => {
      if (!check) {
        return;
      }

      for (let g in armory) {
        let t,
          c,
          a = fits(armor, g, "legs", total);
        charm(inventory["charm"], a, t, c, sets);
        if (sets.len > limit) {
          return;
        }
      }
    };

    const charm = (armory, armor, total, check, sets) => {
      if (!check) {
        return;
      }
      if (sets.length > limit) {
        return;
      }

      for (let g in armory) {
        let t,
          c,
          a = fits(armor, g, "charms", total);

        if (check_levels(t)) {
          sets.push((t, a));
        }

        if (sets.length > limit) {
          return;
        }
      }
    };

    const subset = () => {
      let sets = [];

      for (let g1 in inventory["head"]) {
        armor = { decos: [] };
        let s = { slosts: [0, 0, 0, 0], skills: {} };
        let t,
          c,
          a = fits(armor, g1, "head", s);
        chest(inventory["chest"], a, t, c, sets);
      }
      return sets;
    };
    return () => (isSubscribed = false);
  }, []);

  return (
    <Container>
      {inventory["head"].map((piece) => {
        return <p>{piece}</p>;
      })}
    </Container>
    //
    //   {() => {
    //     for (let s in subset()) {
    //        return <p>{s}</p>
    //     }
    //   }}
    //
  );
};

export default SkillMapper;
