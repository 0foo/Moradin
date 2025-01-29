import { Validator } from './validator.js';

export class Character {
    #data;
    #subscribers = new Set();

    constructor() {
        this.#data = {};
    }

    importFromJSON(data) {
        this.#data = Validator.validateData(data);
        this.notifySubscribers();
    }

    subscribe(callback) {
        this.#subscribers.add(callback);
        return () => this.#subscribers.delete(callback);
    }

    notifySubscribers() {
        this.#subscribers.forEach(callback => callback(this.#data));
    }
} 