import _ from "lodash";

const sortDescendingSkillAmount = (inventory) => {
  return inventory
    .sort((a, b) =>
      a.skill_amount > b.skill_amount
        ? 1
        : b.skill_amount > a.skill_amount
        ? -1
        : 0
    )
    .reverse();
};

export const find = (skillsChosen, skillMap, charmMap, armorMap, config) => {
  const maxResults = 10;
  var inventory = {
    head: [],
    chest: [],
    gloves: [],
    waist: [],
    legs: [],
    charm: [],
    decorations: [null, [], [], [], []],
  };

  for (var skill of skillsChosen) {
    const skill_name = skill.name;
    const skill_amount = skill.amount;
    const skill_id = skill.id;
    // Only master for now. Will decide based on 'config' settings later.
    // Check if skill is in.
    if (skillMap[skill_name] && skillMap[skill_name]["master"])
      for (var piece of skillMap[skill_name]["master"]) {
        inventory[piece.type].push({ ...piece, skill_name: skill_name });
      }
    // Check if skill is in.
    if (skillMap[skill_name]["charms"])
      for (var charm of skillMap[skill_name]["charms"]) {
        inventory["charm"].push({ ...charm, skill_name: skill_name });
      }
    // Check if skill is in.
    if (skillMap[skill_name]["decorations"])
      for (var [idx, decorations] of skillMap[skill_name][
        "decorations"
      ].entries()) {
        if (idx)
          for (var decoration of decorations) {
            inventory["decorations"][idx].push({
              ...decoration,
              skill_name: skill_name,
            });
          }
      }
  }

  for (var i in inventory) {
    if (i === "decorations")
      for (var j = 1; j <= 4; j++) {
        inventory[i][j] = sortDescendingSkillAmount(inventory[i][j]);
      }
    else {
      inventory[i] = sortDescendingSkillAmount(inventory[i]);
    }
  }
  console.log(inventory);

  // Add stop conditions (empty objects).
  for (var i in inventory) {
    if (i === "decorations")
      for (var j = 1; j <= 4; j++) {
        inventory[i][j].push({});
      }
    else {
      inventory[i].push({});
    }
  }

  var sets = [];

  // Fit head.
  for (var headPiece of inventory["head"]) {
    console.log('head')
    var armorSet = { decorations: [] };
    var skills = { slots: [null, 0, 0, 0, 0], skills: {} };
    var [ total, check, set ] = fit(
      armorSet,
      headPiece,
      headPiece.type,
      skills,
      charmMap,
      armorMap,
      search
    );
    // console.log(t, c, a)
    chest(inventory, set, total, check, sets, armorMap, charmMap, search)
  }
  return sets
};

const chest = (inventory, set, total, check, sets, armorMap, charmMap, search) => {
  console.log('chest')
  if(!check)
    return
  
  for(var chestPiece of inventory['chest']) {
    var [newTotal, newCheck, newSet] = fit(set, chestPiece, chestPiece.type, total, charmMap, armorMap, search)
    gloves(inventory['gloves'], newSet, newTotal, newCheck, sets, armorMap. charmMap, search)
  }
};

const gloves = (inventory, set, total, check, sets, armorMap, charmMap, search) => {
  console.log('gloves')
  if(!check)
    return
  
  for(var glovesPiece of inventory['gloves']) {
    var [newTotal, newCheck, newSet] = fit(set, glovesPiece, glovesPiece.type, total, charmMap, armorMap, search)
    waist(inventory['waist'], newSet, newTotal, newCheck, sets, armorMap. charmMap, search)
  }
};

const waist = (inventory, set, total, check, sets, armorMap, charmMap, search) => {
  console.log('waist')
  if(!check)
    return
  
  for(var waistPiece of inventory['waist']) {
    var [newTotal, newCheck, newSet] = fit(set, waistPiece, waistPiece.type, total, charmMap, armorMap, search)
    legs(inventory['legs'], newSet, newTotal, newCheck, sets, armorMap. charmMap, search)
  }
};

const legs = (inventory, set, total, check, sets, armorMap, charmMap, search) => {
  console.log('legs')
  if(!check)
    return
  
  for(var legsPiece of inventory['legs']) {
    var [newTotal, newCheck, newSet] = fit(set, legsPiece, legsPiece.type, total, charmMap, armorMap, search)
    charm(inventory['charms'], newSet, newTotal, newCheck, sets, armorMap. charmMap, search)
   }
 };

const chest = () => {};
const gloves = () => {};
const waist = () => {};
const legs = () => {};
const charm = () => {};

const fit = (set, piece, pieceType, total, charmMap, armorMap) => {
  if (_.isEmpty(piece)) return [total, true, set];

  var picked = null;
  // Get last upgrade of charm from charMap, which is charmMap[id][length-1]
  if (pieceType === "charm") {
    const highest = charmMap[piece.id].length - 1;
    const id = piece.id;
    picked = charmMap[id][highest];
  } else {
    const id = piece.id;
    picked = armorMap[id];
  }

  // var set_copy = _.cloneDeep(set)
  // set_copy[pieceType] = piece.id

  // total_copy = _.cloneDeep(total)

  // for(var slot of piece.slots)
  //   total_copy['slots'][slot] += 1
  
  
};
