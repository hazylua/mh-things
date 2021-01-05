export function mapSkills(skills, armorDB, charmsDB, decorationsDB) {
  var skillMap = {};

  // Map armor pieces.
  for (var piece of armorDB) {
    var slots = [];
    for (var slot of piece["slots"]) slots.push(slot["rank"]);

    for (var skill of piece["skills"]) {
      const rank = piece.rank;
      const skill_name = skill.skillName;

      // Template.
      const obj = {
        id: piece.id,
        slots: slots,
        name: piece.name,
        skill_amount: skill.level,
      };

      // Check if key exists. If not, add empty object to it. Same for subkey.
      if (!skillMap[skill_name]) skillMap[skill_name] = {};
      if (!skillMap[skill_name][rank]) skillMap[skill_name][rank] = [];
      skillMap[skill_name][rank].push(obj);
    }
  }

  // Map charms.
  for (var charm of charmsDB) {
    for (var rank of charm["ranks"]) {
      for (var skill of rank["skills"]) {
        const skill_name = skill.skillName;

        const obj = {
          id: charm.id,
          type: "charm",
          rarity: rank.rarity,
          origin: charm.name,
          name: rank.name,
          skill_amount: skill.level,
        };

        // Check if key exists. If not, add empty object to it. Same for subkey.
        if (!skillMap[skill_name]) skillMap[skill_name] = {};
        if (!skillMap[skill_name]["charms"])
          skillMap[skill_name]["charms"] = [];
        skillMap[skill_name]["charms"].push(obj);
      }
    }
  }

  // Map decorations.
  for (var decoration of decorationsDB) {
    const slot = decoration.slot;
    for (var skill of decoration["skills"]) {
      const skill_name = skill.skillName;

      const obj = {
        id: decoration.id,
        name: decoration.name,
        rarity: decoration.rarity,
        skill_amount: skill.level,
      };

      // Check if key exists. If not, add empty object to it. Same for subkey. Decoration position indicates how much it occupies in a slot.
      if (!skillMap[skill_name]) skillMap[skill_name] = {};
      if (!skillMap[skill_name]["decorations"])
        skillMap[skill_name]["decorations"] = [null, [], [], [], []];
      skillMap[skill_name]["decorations"][slot].push(obj);
    }
  }

  return skillMap;
}

// Use index of array as hash to id of armor.
export const mapArmor = (armorDB) => {
  var armorMap = [];
  for (var piece of armorDB) {
    const id = piece.id;
    var skills = [];
    for (var skill of piece["skills"]) {
      const obj = {
        id: skill.id,
        skill_name: skill.skillName,
        skill_amount: skill.level,
      };
      skills.push(obj);
    }

    // Create array to push to on index.
    if (!armorMap[id]) armorMap[id] = [];
    armorMap[id].push(skills);
  }

  return armorMap;
};

// Use index of array as hash to id of charm.
export const mapCharms = (charmDB) => {
  var charmsMap = [];
  for (var charm of charmDB) {
    const id = charm.id;
    for (var [idx, rank] of charm["ranks"].entries()) {
      var skills = [];
      for (var skill of rank["skills"]) {
        const obj = {
          id: skill.id,
          skill_name: skill.skillName,
          skill_amount: skill.level,
        };
        // Each position in the array at charmsMap[id] indicates an upgrade/rank of the charm. Last position is the max level of charm.
        skills.push(obj);

        // Create array to push to on index.
        if (!charmsMap[id]) charmsMap[id] = [];
        charmsMap[id].push(skills);
      }
    }
  }

  return charmsMap;
};
