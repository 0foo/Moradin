
    getTop() {
        try {
            const storageCharData = localStorage.getItem(this.root_application_namespace_key);
            return storageCharData ? JSON.parse(storageCharData) : {};
        } catch (error) {
            console.error('Failed to load character data:', error);
            return {};
        }
    }

    saveFullNamespace(full_character_data) {
        try {
            const dataString = JSON.stringify(full_character_data);
            localStorage.setItem(this.root_application_namespace_key, dataString);
        } catch (error) {
            console.error('Failed to save character data:', error);
        }
    }

    getIdentifierAndNames() {
        const full_namespace_data = this.getFullNamespace();
        return Object.keys(full_namespace_data).reduce((acc, key) => {
            acc[key] = full_namespace_data[key].name;
            return acc;
        }, {});
    }

    getRootKeys() {
        const full_character_data = this.loadFullCharacterData();
        return Object.values(full_character_data).map(obj => obj.name);
    }

    getCharacterIdentifiers() {
        const full_character_data = this.loadFullCharacterData();
        return Object.keys(full_character_data);
    }
    
    getSingleCharacterIdentifier(name) {
        const full_character_data = this.loadFullCharacterData();
        return Object.keys(full_character_data).find(key => 
            full_character_data[key].name === name
        );
    }

    generateRandomHash(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    newBlankCharacter(name = "") {
        const full_character_data = this.loadFullCharacterData();
        const trimmedName = name.trim();
        const finalName = trimmedName === "" ? "name_" + this.generateRandomHash(6) : trimmedName;
        const hash = this.generateRandomHash(6);
        
        full_character_data[hash] = {
            "name": finalName
        };
        
        this.saveFullCharacterData(full_character_data);
        return hash;
    }

    getCharacterById(char_id) {
        const full_character_data = this.loadFullCharacterData();
        return full_character_data[char_id] || {};
    }
    
    deleteCharacterByName(charName) {
        const full_character_data = this.loadFullCharacterData();
        Object.keys(full_character_data).forEach(hash => {
            if (full_character_data[hash].name === charName) {
                delete full_character_data[hash];
            }
        });
        this.saveFullCharacterData(full_character_data);
    }

    deleteCharacterById(charId) {
        const full_character_data = this.loadFullCharacterData();
        delete full_character_data[charId];
        this.saveFullCharacterData(full_character_data);
    }