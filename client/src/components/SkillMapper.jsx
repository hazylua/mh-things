import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const SkillMapper = (props) => {
  const [map, mapAdd] = useState([]);
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

    // fetch("https://mh-files.herokuapp.com/assets/skillmap.json")
    //   .then((response) => response.json())
    //   .then((json) => {
    //     if (isSubscribed) {
    //       mapAdd(json);
    //     } else {
    //       return null;
    //     }
    //   });

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
          inventoryAdd(inventory[a[1]].push(a));
        }
      }

      inventoryAdd(inventory["head"].push([0, 0, 0]));
      inventoryAdd(inventory["chest"].push([0, 0, 0]));
      inventoryAdd(inventory["gloves"].push([0, 0, 0]));
      inventoryAdd(inventory["waist"].push([0, 0, 0]));
      inventoryAdd(inventory["legs"].push([0, 0, 0]));
      inventoryAdd(inventory["charm"].push([0, 0, 0]));
    });

    for (let i in inventory) {
      inventoryAdd(inventory[i].sort());
      console.log(inventory);
    }

    return () => (isSubscribed = false);
  }, []);

  return <Container></Container>;
};

export default SkillMapper;
