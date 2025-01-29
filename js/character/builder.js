export class Builder {
    static populateSources(data) {
        // Get all core keys that have a sources array
        const coreKeys = Object.keys(data.core).filter(key => 
            data.core[key]?.sources !== undefined
        );

        // Get all modifier values (both arrays and strings)
        const relevantIds = Object.entries(data.modifiers).reduce((ids, [key, value]) => {
            if (Array.isArray(value)) {
                return [...ids, ...value];
            }
            if (typeof value === 'string') {
                return [...ids, value];
            }
            return ids;
        }, []);

        // Check each entity
        for (const entityId of relevantIds) {
            const entity = data.entities.find(e => e.id === entityId);
            if (!entity?.effects) continue;

            // Check each effect
            for (const effect of entity.effects) {
                // If effect type matches a core key, add entity to sources if not already present
                if (coreKeys.includes(effect.type) && !data.core[effect.type].sources.includes(entity.id)) {
                    data.core[effect.type].sources.push(entity.id);
                }
            }
        }

        // Calculate all values
        this.calculateValues(data);

        return data;
    }

    static calculateValues(data) {
        // Get all core keys that have a sources array
        const coreKeys = Object.keys(data.core).filter(key => 
            data.core[key]?.sources !== undefined
        );

        // Calculate each core value
        for (const key of coreKeys) {
            // Reset value
            data.core[key].value = 0;

            // Get all effects from sources
            const effects = data.core[key].sources.map(sourceId => {
                const entity = data.entities.find(e => e.id === sourceId);
                return entity.effects.filter(effect => effect.type === key);
            }).flat();

            // Check for advantage in properties
            for (const effect of effects) {
                if (effect.properties.includes('advantage') && !data.core[key].properties.includes('advantage')) {
                    data.core[key].properties.push('advantage');
                }
            }

            // Calculate base value first
            const baseEffects = effects.filter(effect => effect.properties.includes('base'));
            if (baseEffects.length > 0) {
                // If multiple base effects, take the highest
                data.core[key].value = Math.max(...baseEffects.map(effect => effect.value));
            }

            // Add bonus effects
            const bonusEffects = effects.filter(effect => effect.properties.includes('bonus'));
            for (const effect of bonusEffects) {
                if (Number.isInteger(effect.value)) {
                    data.core[key].value += effect.value;
                    continue;
                }
            }

            // Add modifier effects
            const modifierEffects = effects.filter(effect => effect.properties.includes('modifier'));
            for (const effect of modifierEffects) {
                if (typeof effect.value === 'string' && data.core[effect.value]) {
                    const abilityScore = data.core[effect.value].value;
                    const modifier = Math.floor((abilityScore - 10) / 2);
                    data.core[key].value += modifier;
                }
            }
        }

        return data;
    }
} 