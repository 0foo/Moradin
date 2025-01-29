export class StorageManager {
    constructor(namespace = 'app_storage') {
        this.namespace = namespace;
        this.initializeStorage();
    }

    initializeStorage() {
        try {
            if (!localStorage.getItem(this.namespace)) {
                localStorage.setItem(this.namespace, JSON.stringify({}));
            }
        } catch (error) {
            console.error('Failed to initialize storage:', error);
            throw error;
        }
    }

    // Get the entire storage object
    getStorage() {
        try {
            const data = localStorage.getItem(this.namespace);
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('Failed to get storage:', error);
            return {};
        }
    }

    // Save the entire storage object
    saveStorage(data) {
        try {
            localStorage.setItem(this.namespace, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Failed to save storage:', error);
            return false;
        }
    }

    // Get a value using dot notation
    get(path, defaultValue = null) {
        try {
            const storage = this.getStorage();
            if (!path) return storage;

            // Split the path into an array of keys
            const keys = path.split('.');
            
            // Traverse the object using reduce
            return keys.reduce((current, key) => {
                return (current && typeof current === 'object' && key in current)
                    ? current[key]
                    : defaultValue;
            }, storage);
        } catch (error) {
            console.error(`Error getting path "${path}":`, error);
            return defaultValue;
        }
    }

    // Set a value using dot notation
    set(path, value) {
        try {
            if (!path) throw new Error('Path is required');

            const storage = this.getStorage();
            
            // Handle root level set
            if (path.indexOf('.') === -1) {
                storage[path] = value;
                return this.saveStorage(storage);
            }

            // Split the path into an array of keys
            const keys = path.split('.');
            const lastKey = keys.pop();
            
            // Traverse and create nested objects if they don't exist
            const target = keys.reduce((current, key) => {
                if (!(key in current)) {
                    current[key] = {};
                } else if (typeof current[key] !== 'object') {
                    current[key] = {};
                }
                return current[key];
            }, storage);

            // Set the value at the final key
            target[lastKey] = value;
            return this.saveStorage(storage);
        } catch (error) {
            console.error(`Error setting path "${path}":`, error);
            return false;
        }
    }

    // Delete a value using dot notation
    delete(path) {
        try {
            if (!path) throw new Error('Path is required');

            const storage = this.getStorage();
            
            // Handle root level delete
            if (path.indexOf('.') === -1) {
                delete storage[path];
                return this.saveStorage(storage);
            }

            // Split the path into an array of keys
            const keys = path.split('.');
            const lastKey = keys.pop();
            
            // Traverse to the parent object
            const target = keys.reduce((current, key) => {
                return (current && typeof current === 'object' && key in current)
                    ? current[key]
                    : null;
            }, storage);

            // Delete the value if the path exists
            if (target && typeof target === 'object') {
                delete target[lastKey];
                return this.saveStorage(storage);
            }
            return false;
        } catch (error) {
            console.error(`Error deleting path "${path}":`, error);
            return false;
        }
    }

    // Check if a path exists
    has(path) {
        try {
            if (!path) return false;

            const storage = this.getStorage();
            const keys = path.split('.');
            
            return keys.reduce((current, key) => {
                return (current && typeof current === 'object' && key in current)
                    ? current[key]
                    : undefined;
            }, storage) !== undefined;
        } catch (error) {
            console.error(`Error checking path "${path}":`, error);
            return false;
        }
    }

    // Clear all storage
    clear() {
        try {
            localStorage.setItem(this.namespace, JSON.stringify({}));
            return true;
        } catch (error) {
            console.error('Failed to clear storage:', error);
            return false;
        }
    }
} 