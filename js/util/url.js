export const URLutil = {
    /**
     * Opens a URL with the specified path and query parameters
     * @param {string} newPath - The path to navigate to
     * @param {Object} queryParams - Key-value pairs of query parameters
     * @param {Object} options - Additional options for opening the location
     * @param {boolean} options.openInNewTab - Whether to open in a new tab (default: true)
     * @param {boolean} options.preserveCurrentParams - Whether to keep current URL parameters (default: false)
     * @param {string} options.target - Specific target for window.open (default: based on openInNewTab)
     * @returns {Window|null} The new window object if opened in new tab, null otherwise
     */
    openLocation: function(newPath, queryParams = {}, options = {}) {
        try {
            // Default options
            const defaultOptions = {
                openInNewTab: true,
                preserveCurrentParams: false,
                target: null
            };
            options = { ...defaultOptions, ...options };

            // Construct the full URL
            const currentURL = new URL(window.location.href);
            
            // Clean the new path (ensure it starts with '/')
            const cleanPath = newPath.startsWith('/') ? newPath : `/${newPath}`;
            currentURL.pathname = cleanPath;

            // Clear existing parameters if not preserving them
            if (!options.preserveCurrentParams) {
                currentURL.search = '';
            }

            // Add new query parameters to the URL
            for (const [key, value] of Object.entries(queryParams)) {
                if (value !== null && value !== undefined) {
                    currentURL.searchParams.set(key, value.toString());
                }
            }

            // Determine the target
            const target = options.target || (options.openInNewTab ? '_blank' : '_self');

            // Open the URL
            const newWindow = window.open(currentURL.toString(), target);
            
            // Focus the new window if it was opened in a new tab
            if (newWindow && options.openInNewTab) {
                newWindow.focus();
            }

            return newWindow;
        } catch (error) {
            console.error('Error opening location:', error);
            return null;
        }
    },

    /**
     * Gets a parameter value from the URL
     * @param {string} parameterKey - The key of the parameter to get
     * @param {*} defaultValue - Value to return if parameter is not found
     * @returns {string|null} The parameter value or defaultValue if not found
     */
    getParameter(parameterKey, defaultValue = null) {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(parameterKey) ?? defaultValue;
        } catch (error) {
            console.error('Error getting parameter:', error);
            return defaultValue;
        }
    },

    /**
     * Gets all parameters from the URL as an object
     * @returns {Object} Object containing all URL parameters
     */
    getAllParameters() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const params = {};
            for (const [key, value] of urlParams.entries()) {
                params[key] = value;
            }
            return params;
        } catch (error) {
            console.error('Error getting all parameters:', error);
            return {};
        }
    },

    /**
     * Updates URL parameters without reloading the page
     * @param {Object} params - Parameters to update
     * @param {boolean} replace - Whether to replace current history entry
     */
    updateParameters(params, replace = false) {
        try {
            const url = new URL(window.location.href);
            
            for (const [key, value] of Object.entries(params)) {
                if (value === null || value === undefined) {
                    url.searchParams.delete(key);
                } else {
                    url.searchParams.set(key, value.toString());
                }
            }

            if (replace) {
                window.history.replaceState({}, '', url);
            } else {
                window.history.pushState({}, '', url);
            }
        } catch (error) {
            console.error('Error updating parameters:', error);
        }
    }
}