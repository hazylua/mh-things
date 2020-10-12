var inventory = {
    head: [],
    chest: [],
    gloves: [],
    waist: [],
    legs: [],
    charm: [],
}
var search = {
    "critical-eye": 7,
    "attack-boost": 7,
    "peak-performance": 3,
}
var limit = 10
var data = null
var decos = null
var charms = null
var armor = null
var sets_total = []

export const fetchData = async (url) => {
    let response = await fetch("https://mh-files.herokuapp.com/assets/skillmap.json")
    let data = await response.json()
    return data
}

export const fetchArmor = async () => {
    let response = await fetch("https://mh-files.herokuapp.com/assets/armormap.json")
    let data = await response.json()
    return data
}

export const fetchCharms = async () => {
    let response = await fetch("https://mh-files.herokuapp.com/assets/charmmap.json")
    let data = await response.json()
    return data
}

export const fetchDecos = async () => {
    let response = await fetch("https://mh-files.herokuapp.com/assets/decomap.json")
    let data = await response.json()
    return data
}

export const fetchArmorDB = async () => {
    let response = await fetch("https://mhw-db.com/armor")
    let data = await response.json()
    return data
}

export const fetchCharmsDB = async () => {
    let response = await fetch("https://mhw-db.com/charms")
    let data = await response.json()
    return data
}

// Mapping skills to search to armor pieces.
export const mapSkills = (skills, armorDB, charmsDB) => {
    /*  Object with keys for each skill.
    Each key is the name of the skill id is also an object defined as:
        {
            id: skill_id,
            name: skill_name,
            armor_pieces: {
                "head": [{obj_from_api}, ...],
                ...,
                "charm: [{obj_from_api}, ...]"
            }
        }
    */
    var SkillToArmorMap = {}

    skills.forEach(skill => {
        SkillToArmorMap[String(skill.name)] = {
            "head": [],
            "chest": [],
            "gloves": [],
            "waist": [],
            "legs": [],
            "charm": []
        }
    })

    for (let skill of skills) {
        for (let armorPiece of armorDB) {
            for (let armorPieceSkill of armorPiece.skills) {
                if (armorPieceSkill.skillName === skill.name) {
                    let type = armorPiece.type
                    SkillToArmorMap[`${skill.name}`][`${type}`].push(armorPiece)
                    break;
                }
            }
        }
        // If skill is present in the last rank of charm, consider it.
        for (let charm of charmsDB) {
            for (let charmSkill of charm.ranks[charm.ranks.length - 1].skills) {
                if (charmSkill.skillName === skill.name) {
                    SkillToArmorMap[`${skill.name}`][`charm`].push(charm)
                }
            }


        }
    }

    return SkillToArmorMap


}


export const searchSet = (skills) => {
    search = {}
    skills.map(skill => {
        let key = skill.name.toLowerCase().replace(" ", "-")
        search[key] = true
    })
}


export const responseSet = (data_res, armor_res, charms_res, decos_res) => {
    data = data_res
    armor = armor_res
    charms = charms_res
    decos = decos_res
}

export const inventorySet = () => {
    for (let s in search) {
        for (let a of data["master"][s]) {
            inventory[a[1]].push(a)
            inventory[a[1]].push()
        }
    }

    inventory["head"].push([0, 0, 0])
    inventory["chest"].push([0, 0, 0])
    inventory["gloves"].push([0, 0, 0])
    inventory["waist"].push([0, 0, 0])
    inventory["legs"].push([0, 0, 0])
    inventory["charm"].push([0, 0, 0])


    for (let i in inventory) {
        inventory[i].sort()
    }
}

export const check_levels = (total) => {
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
};

export const equip_deco = (armor, level, skill, total) => {
    if (skill in decos[level]) {
        for (var effects of decos[level][skill]) {
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
};

export const fill_decoration = (armorset, total) => {
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
            console.log(decos[slot_level]);
        });
        console.log(armorset);
    }
};


export const chest = (armory, armor, total, check, sets) => {
    if (!check) {
        return;
    }

    for (let g in armory) {
        let t,
            c,
            a = declare_fits(armor, g, "chest", total);
        gloves(inventory["gloves"], a, t, c, sets);
        if (sets.length > limit) {
            return;
        }
    }
};

export const gloves = (armory, armor, total, check, sets) => {
    if (!check) {
        return;
    }

    for (let g in armory) {
        let t,
            c,
            a = declare_fits(armor, g, "gloves", total);
        waist(inventory["waist"], a, t, c, sets);
        if (sets.length > limit) {
            return;
        }
    }
};

export const waist = (armory, armor, total, check, sets) => {
    if (!check) {
        return;
    }

    for (let g in armory) {
        let t,
            c,
            a = declare_fits(armor, g, "waist", total);
        legs(inventory["legs"], a, t, c, sets);
        if (sets.length > limit) {
            return;
        }
    }
};

export const legs = (armory, armor, total, check, sets) => {
    if (!check) {
        return;
    }

    for (let g in armory) {
        let t,
            c,
            a = declare_fits(armor, g, "legs", total);
        charm(inventory["charm"], a, t, c, sets);
        if (sets.len > limit) {
            return;
        }
    }
};

export const charm = (armory, armor, total, check, sets) => {
    if (!check) {
        return;
    }
    if (sets.length > limit) {
        return;
    }

    console.log(sets)
    for (let g in armory) {
        let t,
            c,
            a = declare_fits(armor, g, "charms", total);

        if (check_levels(t)) {
            console.log(sets)
            sets.push((t, a));
            sets_total = sets
        }

        if (sets.length > limit) {
            return;
        }
    }
};

export const declare_fits = (armorset, piece, piece_type, total) => {
    if (piece[0] == 0) {
        return [total, true, armorset];
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
            tcopy["skills"][i[2]] += i[1]
        } else {
            tcopy["skills"][i[2]] = i[1]
        }
    }
    if (tcopy['skills'][piece[4]] > search[piece[4]]) {
        return [total, false, armorset]
    }
    return [total, true, armor_copy]
};


export const subset = () => {

    for (let g1 in inventory["head"]) {
        armor = { decos: [] }
        let s = { slots: [0, 0, 0, 0], skills: {} };
        let t, c, a
        [t, c, a] = declare_fits(armor, g1, "head", s);
        chest(inventory["chest"], a, t, c, sets_total);
    }
    return sets_total;
};

export const showResults = () => {
    for (let s in subset()) {
        console.log(s);
    }
}