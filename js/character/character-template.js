export const characterTemplate = {
    // Unique identifier
    id: null,

    // Core stats and abilities
    core: {
        // Ability scores
        ability_strength: { value: 0, sources: [], properties: [] },
        ability_dexterity: { value: 0, sources: [], properties: [] },
        ability_constitution: { value: 0, sources: [], properties: [] },
        ability_intelligence: { value: 0, sources: [], properties: [] },
        ability_wisdom: { value: 0, sources: [], properties: [] },
        ability_charisma: { value: 0, sources: [], properties: [] },

        // Defense stats
        armor_class: { value: 0, sources: [], properties: [] },
        hitpoints: { value: 0, sources: [], properties: [] },
        temporary_hitpoints: { value: 0, sources: [], properties: [] },
        other_hitpoints: { value: 0, sources: [], properties: [] },

        // Combat stats
        initiative: { value: 0, sources: [], properties: [] },
        concentration: { value: 0, sources: [], properties: [] },
        spell_hit: { value: 0, sources: [], properties: [] },

        // Skills
        skill_acrobatics: { value: 0, sources: [], properties: [] },
        skill_animalHandling: { value: 0, sources: [], properties: [] },
        skill_arcana: { value: 0, sources: [], properties: [] },
        skill_athletics: { value: 0, sources: [], properties: [] },
        skill_deception: { value: 0, sources: [], properties: [] },
        skill_history: { value: 0, sources: [], properties: [] },
        skill_insight: { value: 0, sources: [], properties: [] },
        skill_intimidation: { value: 0, sources: [], properties: [] },
        skill_investigation: { value: 0, sources: [], properties: [] },
        skill_medicine: { value: 0, sources: [], properties: [] },
        skill_nature: { value: 0, sources: [], properties: [] },
        skill_perception: { value: 0, sources: [], properties: [] },
        skill_performance: { value: 0, sources: [], properties: [] },
        skill_persuasion: { value: 0, sources: [], properties: [] },
        skill_religion: { value: 0, sources: [], properties: [] },
        skill_sleightOfHand: { value: 0, sources: [], properties: [] },
        skill_stealth: { value: 0, sources: [], properties: [] },
        skill_survival: { value: 0, sources: [], properties: [] },

        // Saving throws
        save_strength: { value: 0, sources: [], properties: [] },
        save_dexterity: { value: 0, sources: [], properties: [] },
        save_constitution: { value: 0, sources: [], properties: [] },
        save_intelligence: { value: 0, sources: [], properties: [] },
        save_wisdom: { value: 0, sources: [], properties: [] },
        save_charisma: { value: 0, sources: [], properties: [] }
    },

    // Character progression
    progression: {
        proficiency: 0,
        total_level: 0,
        experience: 0,
        milestone_level: 0
    },

    // Combat capabilities
    combat: {
        attacks: {
            melee_attacks: [],
            ranged_attacks: [],
            spell_attacks: []
        },
        spell_slots: [],
        carry_weight: 0
    },

    // Equipment and inventory
    equipment: {
        inventory: [],
        equipped: [],
        equipped_profile: null,
        currency: {
            copper: 0,
            silver: 0,
            electrum: 0,
            gold: 0,
            platinum: 0
        }
    },

    // Character modifiers and active effects
    modifiers: {
        other_effects: [],
        race: null,
        feats: [],
        spells_known: [],
        monster_type: null,
        class: null,
        subclass: null,
        background: null
    },

    // Character identity
    identity: {
        name: "",
        race: "",
        background: "",
        alignment: "",
        personality_traits: "",
        ideals: "",
        bonds: "",
        flaws: "",
        appearance: "",
        backstory: ""
    },

    // All entities that affect the character
    entities: []
}; 