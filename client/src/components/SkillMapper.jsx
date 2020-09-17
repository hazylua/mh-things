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

  useEffect(() => {
    let isSubscribed = true;

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
    ).then((values) => {
      let data = values[0];
      let armor = values[1];
      let charms = values[2];
      let deco = values[3];

      for (let s in search) {
        for (let a of data["master"][s]) {
          inventoryAdd(inventory, inventory[a[1]].push(a));
        }
      }

      inventoryAdd(inventory, inventory["head"].push([0, 0, 0]));
      inventoryAdd(inventory, inventory["chest"].push([0, 0, 0]));
      inventoryAdd(inventory, inventory["gloves"].push([0, 0, 0]));
      inventoryAdd(inventory, inventory["waist"].push([0, 0, 0]));
      inventoryAdd(inventory, inventory["legs"].push([0, 0, 0]));
      inventoryAdd(inventory, inventory["charm"].push([0, 0, 0]));
    });

    for (let i in inventory) {
      inventoryAdd(inventory, inventory[i].sort());
    }

    return () => (isSubscribed = false);
  }, []);

  return (
    <Container>
      {inventory["head"].map((piece) => {
        return <p>{piece}</p>;
      })}
    </Container>
  );
};

export default SkillMapper;
