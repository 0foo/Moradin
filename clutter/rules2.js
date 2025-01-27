export class Rules {
    static getAbilityModifier(score) {
        return Math.floor((score - 10) / 2);
    }

    static getProficiencyBonus(level) {
        return Math.floor((level - 1) / 4) + 2;
    }

} 