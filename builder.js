import { ValueCalculator } from './systems/calculateValue.js';

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
        ValueCalculator.calculate(data);

        return data;
    }
} 