export class Rules {
    static getAbilityModifier(score) {
        return Math.floor((score - 10) / 2);
    }

    static getProficiencyBonus(level) {
        return Math.floor((level - 1) / 4) + 2;
    }

    static populateEquippedSources(data) {
        // Iterate through equipped items
        for (const itemId of data.equipped) {
            // Find the entity
            const entity = data.entities.find(e => e.id === itemId);
            if (!entity?.effects) continue;

            // Check each effect
            for (const effect of entity.effects) {
                // If effect type exists as a key in data and has sources array
                if (data[effect.type]?.sources) {
                    // Add entity ID to sources if not already present
                    if (!data[effect.type].sources.includes(entity.id)) {
                        data[effect.type].sources.push(entity.id);
                    }
                }
            }
        }
    }
}