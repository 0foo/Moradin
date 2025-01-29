import { Builder } from './builder.js';
import { testData } from './js/character/test-data.js';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Display original data
    const originalDataElem = document.getElementById('originalData');
    displayData(testData, originalDataElem);

    // Add build button handler
    document.getElementById('buildButton').addEventListener('click', () => {
        // Clone data and build
        const builtData = structuredClone(testData);
        Builder.populateSources(builtData);

        // Display built data
        const builtDataElem = document.getElementById('builtData');
        displayData(builtData, builtDataElem);
    });
});

function displayData(data, element) {
    const formatted = JSON.stringify(data, null, 2)
        .replace(/\n/g, '<br>')
        .replace(/ /g, '&nbsp;');
    element.innerHTML = formatted;
}



