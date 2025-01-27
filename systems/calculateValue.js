export class ValueCalculator {
    static calculate(data) {
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