import { Builder } from './builder.js';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const testData = {
        core:{
            strength: {
                value:0,
                sources: [],
                properties: []
            },
            dexterity: {
                value:0,
                sources: [],
                properties: []
            },
            constitution: {
                value:0,
                sources: [],
                properties: []
            },
            intelligence: {
                value:0,
                sources: [],
                properties: []
            },
            wisdom: {
                value:0,
                sources: [],
                properties: []
            },
            charisma: {
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
            acrobatics: {
                value: 0,
                sources: [],
                properties: []
            },
            animalHandling: {
                value: 0,
                sources: [],
                properties: []
            },
            arcana: {
                value: 0,
                sources: [],
                properties: []
            },
            athletics: {
                value: 0,
                sources: [],
                properties: []
            },
            deception: {
                value: 0,
                sources: [],
                properties: []
            },
            history: {
                value: 0,
                sources: [],
                properties: []
            },
            insight: {
                value: 0,
                sources: [],
                properties: []
            },
            intimidation: {
                value: 0,
                sources: [],
                properties: []
            },
            investigation: {
                value: 0,
                sources: [],
                properties: []
            },
            medicine: {
                value: 0,
                sources: [],
                properties: []
            },
            nature: {
                value: 0,
                sources: [],
                properties: []
            },
            perception: {
                value: 0,
                sources: [],
                properties: []
            },
            performance: {
                value: 0,
                sources: [],
                properties: []
            },
            persuasion: {
                value: 0,
                sources: [],
                properties: []
            },
            religion: {
                value: 0,
                sources: [],
                properties: []
            },
            sleightOfHand: {
                value: 0,
                sources: [],
                properties: []
            },
            stealth: {
                value: 0,
                sources: [],
                properties: []
            },
            survival: {
                value: 0,
                sources: [],
                properties: []
            },
        },
        proficiency: 2,
        attacks: {
            melee_attacks: [], // TODO
            ranged_attacks: [], // TODO
            spell_attacks: [], // TODO
        },
        total_level: 3,
        carry_weight: 0,
        saves: {
            strength: { proficient: false, bonus: -1 },
            dexterity: { proficient: false, bonus: 1 },
            constitution: { proficient: false, bonus: 2 },
            intelligence: { proficient: true, bonus: 5 },
            wisdom: { proficient: true, bonus: 3 },
            charisma: { proficient: false, bonus: -1 }
        },
        spell_slots: [],
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
                        value: 'constitution',
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
                        value: 'constitution',
                        properties: ['modifier']
                    },
                    {
                        type: 'hitpoints',
                        value: 'constitution',
                        properties: ['modifier']
                    },
                    {
                        type: 'hitpoints',
                        value: 'constitution',
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
                        type: 'intelligence',
                        value: 1,
                        properties: ["bonus"]
                    },
                    {
                        type: 'charisma',
                        value: 2,
                        properties: ["bonus"]
                    },
                    {
                        type: 'dexterity',
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
                        type: 'strength',
                        value: 8,
                        properties: ["base"]
                    },
                    {
                        type: 'constitution',
                        value: 14,
                        properties: ["base"]
                    },
                    {
                        type: 'dexterity',
                        value: 16,
                        properties: ["base"]
                    },
                    {
                        type: 'intelligence',
                        value: 18,
                        properties: ["base"]
                    },
                    {
                        type: 'wisdom',
                        value: 12,
                        properties: ["base"]
                    },
                    {
                        type: 'charisma',
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
                        type: "acrobatics",
                        value: "dexterity",
                        properties: ["modifier"]
                    },
                    {
                        type: "animalHandling",
                        value: "wisdom",
                        properties: ["modifier"]
                    },
                    {
                        type: "arcana",
                        value: "intelligence",
                        properties: ["modifier"]
                    },
                    {
                        type: "athletics",
                        value: "strength",
                        properties: ["modifier"]
                    },
                    {
                        type: "deception",
                        value: "charisma",
                        properties: ["modifier"]
                    },
                    {
                        type: "history",
                        value: "intelligence",
                        properties: ["modifier"]
                    },
                    {
                        type: "insight",
                        value: "wisdom",
                        properties: ["modifier"]
                    },
                    {
                        type: "intimidation",
                        value: "charisma",
                        properties: ["modifier"]
                    },
                    {
                        type: "investigation",
                        value: "intelligence",
                        properties: ["modifier"]
                    },
                    {
                        type: "medicine",
                        value: "wisdom",
                        properties: ["modifier"]
                    },
                    {
                        type: "nature",
                        value: "intelligence",
                        properties: ["modifier"]
                    },
                    {
                        type: "perception",
                        value: "wisdom",
                        properties: ["modifier"]
                    },
                    {
                        type: "performance",
                        value: "charisma",
                        properties: ["modifier"]
                    },
                    {
                        type: "persuasion",
                        value: "charisma",
                        properties: ["modifier"]
                    },
                    {
                        type: "religion",
                        value: "intelligence",
                        properties: ["modifier"]
                    },
                    {
                        type: "sleightOfHand",
                        value: "dexterity",
                        properties: ["modifier"]
                    },
                    {
                        type: "stealth",
                        value: "dexterity",
                        properties: ["modifier"]
                    },
                    {
                        type: "survival",
                        value: "wisdom",
                        properties: ["modifier"]
                    }
                ]
            }
        ]
    };

    // Display original data
    const originalDataElem = document.getElementById('originalData');
    displayData(testData, originalDataElem);

    // Add build button handler
    document.getElementById('buildButton').addEventListener('click', () => {
        // Clone data and build
        const builtData = structuredClone(testData);
        Builder.populateSources(builtData);

        // Display built data
        const builtDataElem = document.getElementById('builtData');
        displayData(builtData, builtDataElem);
    });
});

function displayData(data, element) {
    const formatted = JSON.stringify(data, null, 2)
        .replace(/\n/g, '<br>')
        .replace(/ /g, '&nbsp;');
    element.innerHTML = formatted;
}



