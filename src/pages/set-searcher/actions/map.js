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

  for(var charm of charmsDB) {
    const obj = {
      id: charm.id,
      slots: null,
      name: charm.name,

    }
  }

  return skillMap;
}