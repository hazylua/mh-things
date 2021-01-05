export function mapSkills(skills, armorDB, charmsDB, decorationsDB) {
  var skillMap = {};
  for (var piece of armorDB) {
    var slots = [];
    for (var slot of piece["slots"]) slots.push(slot["rank"]);

    for (var skill of piece["skills"]) {
      const rank = piece.rank;
      const skill_name = skill.skillName;

      const obj = {
        id: piece.id,
        slots: slots,
        name: piece.name,
        skill_amount: skill.level,
      };

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

    }
  }

  return skillMap;
}