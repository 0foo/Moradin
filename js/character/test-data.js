export const testData = {
    core:{
        ability_strength: {
            value:0,
            sources: [],
            properties: []
        },
        ability_dexterity: {
            value:0,
            sources: [],
            properties: []
        },
        ability_constitution: {
            value:0,
            sources: [],
            properties: []
        },
        ability_intelligence: {
            value:0,
            sources: [],
            properties: []
        },
        ability_wisdom: {
            value:0,
            sources: [],
            properties: []
        },
        ability_charisma: {
            value:0,
            sources: [],
            properties: []
        },
        armor_class: {
            value:0,
            sources: [],
            properties: []
        },
        concentration: {
            value:0,
            sources: [],
            properties: []
        },
        initiative: {
            value:0,
            sources: [],
            properties: []
        },
        hitpoints: {
            value: 0,
            sources: [],
            properties: []
        },
        temporary_hitpoints: {
            value: 0,
            sources: [],
            properties: []
        },
        other_hitpoints: {
            value: 0,
            sources: [],
            properties: []
        },
        skill_acrobatics: {
            value: 0,
            sources: [],
            properties: []
        },
        skill_animalHandling: {
            value: 0,
            sources: [],
            properties: []
        },
        skill_arcana: {
            value: 0,
            sources: [],
            properties: []
        },
        skill_athletics: {
            value: 0,
            sources: [],
            properties: []
        },
        skill_deception: {
            value: 0,
            sources: [],
            properties: []
        },
        skill_history: {
            value: 0,
            sources: [],
            properties: []
        },
        skill_insight: {
            value: 0,
            sources: [],
            properties: []
        },
        skill_intimidation: {
            value: 0,
            sources: [],
            properties: []
        },
        skill_investigation: {
            value: 0,
            sources: [],
            properties: []
        },
        skill_medicine: {
            value: 0,
            sources: [],
            properties: []
        },
        skill_nature: {
            value: 0,
            sources: [],
            properties: []
        },
        skill_perception: {
            value: 0,
            sources: [],
            properties: []
        },
        skill_performance: {
            value: 0,
            sources: [],
            properties: []
        },
        skill_persuasion: {
            value: 0,
            sources: [],
            properties: []
        },
        skill_religion: {
            value: 0,
            sources: [],
            properties: []
        },
        skill_sleightOfHand: {
            value: 0,
            sources: [],
            properties: []
        },
        skill_stealth: {
            value: 0,
            sources: [],
            properties: []
        },
        skill_survival: {
            value: 0,
            sources: [],
            properties: []
        },
        spell_hit:{
            value: 0,
            sources: [],
            properties: []
        },
        save_strength: {
            value: 0,
            sources: [],
            properties: []
        },
        save_dexterity: {
            value: 0,
            sources: [],
            properties: []
        },
        save_constitution: {
            value: 0,
            sources: [],
            properties: []
        },
        save_intelligence: {
            value: 0,
            sources: [],
            properties: []
        },
        save_wisdom: {
            value: 0,
            sources: [],
            properties: []
        },
        save_charisma: {
            value: 0,
            sources: [],
            properties: []
        }
    },
    proficiency: 0,
    attacks: {
        melee_attacks: [], // TODO
        ranged_attacks: [], // TODO
        spell_attacks: [], // TODO
    },
    total_level: 3,
    carry_weight: 0,
    spell_slots: [],
    name: "Test Character",
    inventory: [
        'chainmail_01',
        'ring_protection_01'
    ], 
    modifiers:{
        other_effects:[
            "shield_of_faith_01",
            "aid_01"
        ],
        equipped: [
            'chainmail_01',
            'ring_protection_01'
        ],
        equipped_profile: "humanoid_01",
        race: 'half_elf_01',
        feats: [
            'war_caster_01',
            'alert_01'
        ],
        spells_known: [],
        monster_type: 'humanoid_01',
        class: 'wizard_class_01',
        starting_ability: 'starting_ability_01',
        base_skills: 'base_skills_01',
        con_modifier:'con_modifier_01',
        base_concentration: 'base_concentration_01'
    },
    entities: [
        {   type: 'class',
            name: "Wizard",
            id: "wizard_class_01",
            level: 3,
            subclass: "School of Evocation",
            effects: [
                {
                    type: "hitpoints",
                    value: 6,  // d6 hit die
                    properties: ["bonus", "first_level", "max"],
                    level: 1
                },
                {
                    type: "hitpoints",
                    value: 4,  // Rolled a 4 on d6
                    properties: ["bonus"],
                    level: 2
                },
                {
                    type: "hitpoints",
                    value: 3,  // Rolled a 3 on d6
                    properties: ["bonus"],
                    level: 3
                }
            ]
        },
        {
            type: 'base_concentration',
            name: 'Base Concentration',
            id: 'base_concentration_01',
            effects: [
                {
                    type: 'concentration',
                    value: 'ability_constitution',
                    properties: ['modifier']
                }
            ]
        },
        {
            type: 'con_modifier',
            name: 'Constitution Modifier',
            id: 'con_modifier_01',
            effects: [
                {
                    type: 'hitpoints',
                    value: 'ability_constitution',
                    properties: ['modifier']
                },
                {
                    type: 'hitpoints',
                    value: 'ability_constitution',
                    properties: ['modifier']
                },
                {
                    type: 'hitpoints',
                    value: 'ability_constitution',
                    properties: ['modifier']
                }
            ]
        },
        
        {   type: 'monster_type',
            id: 'humanoid_01',
            name: 'Humanoid',
            effects: [
            {
                type: 'equipment_slots',
                value: [
                    { slot: 'head', max: 1 }, 
                    { slot: 'body', max: 1 },
                    { slot: 'back', max: 1 },
                    { slot: 'arms', max: 2 },
                    { slot: 'finger', max: 2 },
                    { slot: 'legs', max: 1 },
                    { slot: 'feet', max: 1 },
                    { slot: 'hands', max: 2 }
                ],
                properties: null
            },
            {
                type: 'armor_class',
                value: 10,
                properties: ['base', 'natural']
            }
        ]
        },
        {
            type: 'feat',
            name: 'War Caster',
            id: 'war_caster_01',
            description: 'Advantage on Constitution saves for concentration, cast spells as opportunity attacks',
            effects: [
                {
                    type: 'concentration',
                    properties: ["advantage"]
                },
                {
                    type: 'spell',
                    value: 'opportunity',
                    properties: ["bonus"]
                }
            ]
        },
        {
            type: 'feat',
            name: 'Alert',
            id: 'alert_01',
            description: '+5 to initiative, can\'t be surprised while conscious, no advantage for hidden attackers',
            effects: [ 
                {
                    type: 'initiative',
                    value: 5,
                    properties: ["bonus"]
                }
            ]
        },
        {
            type: 'race',
            name: 'Half-Elf',
            id: 'half_elf_01',
            effects: [
                {
                    type: 'ability_intelligence',
                    value: 1,
                    properties: ["bonus"]
                },
                {
                    type: 'ability_charisma',
                    value: 2,
                    properties: ["bonus"]
                },
                {
                    type: 'ability_dexterity',
                    value: 2,
                    properties: ["bonus"]
                },
                {
                    type: 'darkvision',
                    value: 60,
                    properties: ["bonus"]
                },
                {
                    type: 'skill',
                    name: 'skill_versatility',
                    value: 1,
                    properties: ["bonus"]
                },
                {
                    type: 'ancestry',
                    name: 'Fey Ancestry',
                    value: 1,
                    properties: ["bonus"]
                }
            ]
        },
        {
            type: 'base_ability',
            name: 'Starting Ability',
            id: 'starting_ability_01',
            effects: [
                {
                    type: 'ability_strength',
                    value: 8,
                    properties: ["base"]
                },
                {
                    type: 'ability_constitution',
                    value: 14,
                    properties: ["base"]
                },
                {
                    type: 'ability_dexterity',
                    value: 16,
                    properties: ["base"]
                },
                {
                    type: 'ability_intelligence',
                    value: 18,
                    properties: ["base"]
                },
                {
                    type: 'ability_wisdom',
                    value: 12,
                    properties: ["base"]
                },
                {
                    type: 'ability_charisma',
                    value: 8,
                    properties: ["base"]
                },
            ]
        },
        {
            name: "Shield of Faith",
            type: "magical_effect",
            id: "shield_of_faith_01",
            effects: [
                {
                    type: "armor_class",
                    value: 2,
                    properties: ["bonus"]
                }
            ]
        },
        {
            id: "chainmail_01",
            name: "Chain Mail",
            type: "equipment",
            properties: ["armor"],
            effects: [
                {
                    type: "armor_class",
                    value: 14,
                    properties: ["base", "medium", "metal"]
                },
                {
                    type: "armor_class",
                    value: 2,
                    properties: ["dex_limit"]
                },
                {
                    type: "equipment_slot",
                    value: "body"
                }
            ]
        },
        {
            id: "ring_protection_01",
            name: "Ring of Protection",
            type: "equipment",
            properties: ["armor", "magic"],
            effects: [
                {
                    type: "armor_class",
                    value: 2,
                    properties: ["bonus"]
                },
                {
                    type: "equipment_slot",
                    value: "finger"
                }
            ]
        },
        {
            name: "Aid",
            type: "magical_effect",
            id: "aid_01",
            description: "Your spell bolsters your allies with toughness and resolve.",
            effects: [
                {
                    type: "temporary_hitpoints",
                    value: 5,  // Aid gives 5 HP at 2nd level
                    properties: ["temporary", "bonus"],
                    duration: "8_hours"
                }
            ]
        },
        {
            name: "Base Skill Abilities",
            type: "base_skills",
            id: "base_skills_01",
            effects: [
                {
                    type: "skill_acrobatics",
                    value: "ability_dexterity",
                    properties: ["modifier"]
                },
                {
                    type: "skill_animalHandling",
                    value: "ability_wisdom",
                    properties: ["modifier"]
                },
                {
                    type: "skill_arcana",
                    value: "ability_intelligence",
                    properties: ["modifier"]
                },
                {
                    type: "skill_athletics",
                    value: "ability_strength",
                    properties: ["modifier"]
                },
                {
                    type: "skill_deception",
                    value: "ability_charisma",
                    properties: ["modifier"]
                },
                {
                    type: "skill_history",
                    value: "ability_intelligence",
                    properties: ["modifier"]
                },
                {
                    type: "skill_insight",
                    value: "ability_wisdom",
                    properties: ["modifier"]
                },
                {
                    type: "skill_intimidation",
                    value: "ability_charisma",
                    properties: ["modifier"]
                },
                {
                    type: "skill_investigation",
                    value: "ability_intelligence",
                    properties: ["modifier"]
                },
                {
                    type: "skill_medicine",
                    value: "ability_wisdom",
                    properties: ["modifier"]
                },
                {
                    type: "skill_nature",
                    value: "ability_intelligence",
                    properties: ["modifier"]
                },
                {
                    type: "skill_perception",
                    value: "ability_wisdom",
                    properties: ["modifier"]
                },
                {
                    type: "skill_performance",
                    value: "ability_charisma",
                    properties: ["modifier"]
                },
                {
                    type: "skill_persuasion",
                    value: "ability_charisma",
                    properties: ["modifier"]
                },
                {
                    type: "skill_religion",
                    value: "ability_intelligence",
                    properties: ["modifier"]
                },
                {
                    type: "skill_sleightOfHand",
                    value: "ability_dexterity",
                    properties: ["modifier"]
                },
                {
                    type: "skill_stealth",
                    value: "ability_dexterity",
                    properties: ["modifier"]
                },
                {
                    type: "skill_survival",
                    value: "ability_wisdom",
                    properties: ["modifier"]
                }
            ]
        }
    ]
}; 