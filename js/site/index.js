import { StorageManager } from '/js/storage/StorageManager.js';
import { characterTemplate } from '../character/character-template.js';
import { URLutil } from '../util/url.js';

class CharacterManager {
    constructor() {
        this.storage = new StorageManager('character_data');
        this.selectedCharacterId = null;
        this.initializeEventListeners();
        this.loadCharacters();
    }

    initializeEventListeners() {
        // Add character button
        document.getElementById('addCharacterBtn').addEventListener('click', () => {
            const name = prompt('Enter character name:');
            if (name) {
                this.createNewCharacter(name);
            }
        });

        // Edit character button
        document.getElementById('editCharacterBtn').addEventListener('click', () => {
            if (this.selectedCharacterId) {
                URLutil.openLocation('/edit.html', { id: this.selectedCharacterId }, { openInNewTab: false });
            } else {
                alert('Please select a character to edit');
            }
        });

        // Delete character button
        document.getElementById('deleteCharacterBtn').addEventListener('click', () => {
            if (this.selectedCharacterId) {
                this.deleteCharacter(this.selectedCharacterId);
            } else {
                alert('Please select a character to delete');
            }
        });

        // Character selection change
        document.getElementById('characterSelect').addEventListener('change', (event) => {
            this.selectedCharacterId = event.target.value;
            const hasSelection = !!this.selectedCharacterId;
            document.getElementById('editCharacterBtn').disabled = !hasSelection;
            document.getElementById('deleteCharacterBtn').disabled = !hasSelection;
        });
    }

    generateRandomHash(length = 8) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        
        return result;
    }

    createNewCharacter(name) {
        try {
            // Create new character from template
            const newCharacter = structuredClone(characterTemplate);
            
            // Generate unique ID and add name
            newCharacter.id = this.generateRandomHash();
            newCharacter.identity.name = name;

            // Save to storage
            this.storage.set(`characters.${newCharacter.id}`, newCharacter);

            // Add to select box
            this.addCharacterToSelect(newCharacter);

            return newCharacter.id;
        } catch (error) {
            console.error('Error creating character:', error);
            alert('Failed to create character. Please try again.');
            return null;
        }
    }

    deleteCharacter(characterId) {
        try {
            // Get character name for confirmation
            const character = this.storage.get(`characters.${characterId}`);
            if (!character) {
                throw new Error('Character not found');
            }

            // Show confirmation dialog
            const confirmMessage = `Are you sure you want to delete the character "${character.identity.name}"?\nThis action cannot be undone.`;
            if (!confirm(confirmMessage)) {
                return false;
            }

            // Delete from storage
            this.storage.delete(`characters.${characterId}`);

            // Remove from select box
            const select = document.getElementById('characterSelect');
            const option = select.querySelector(`option[value="${characterId}"]`);
            if (option) {
                option.remove();
            }

            // Reset selection if the deleted character was selected
            if (this.selectedCharacterId === characterId) {
                this.selectedCharacterId = null;
                document.getElementById('editCharacterBtn').disabled = true;
                document.getElementById('deleteCharacterBtn').disabled = true;
            }

            return true;
        } catch (error) {
            console.error('Error deleting character:', error);
            alert('Failed to delete character. Please try again.');
            return false;
        }
    }

    addCharacterToSelect(character) {
        const select = document.getElementById('characterSelect');
        const option = document.createElement('option');
        option.value = character.id;
        option.textContent = character.identity.name;
        select.appendChild(option);
    }

    loadCharacters() {
        try {
            const characters = this.storage.get('characters') || {};
            const select = document.getElementById('characterSelect');
            select.innerHTML = ''; // Clear existing options
            
            Object.values(characters).forEach(character => {
                this.addCharacterToSelect(character);
            });

            // Initialize button states
            document.getElementById('editCharacterBtn').disabled = true;
            document.getElementById('deleteCharacterBtn').disabled = true;
        } catch (error) {
            console.error('Error loading characters:', error);
        }
    }
}

// Initialize the character manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.characterManager = new CharacterManager();
});


