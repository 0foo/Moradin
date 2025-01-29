class ClassSelector extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.classes = [];
        this.selectedClass = null;
        this.selectedClassData = null;
    }

    connectedCallback() {
        this.loadClasses();
        this.render();
    }

    async loadClasses() {
        try {
            const response = await fetch('/data/classes/class-names.json');
            const data = await response.json();
            this.classes = data;
            this.render();
        } catch (error) {
            console.error('Error loading classes:', error);
        }
    }

    async loadClassDetails(className) {
        try {
            const response = await fetch(`/data/classes/class-${className.toLowerCase()}.json`);
            const data = await response.json();
            this.selectedClassData = data.class[0];
            this.render();
        } catch (error) {
            console.error(`Error loading details for class ${className}:`, error);
        }
    }

    render() {
        const template = `
            <style>
                :host {
                    display: block;
                    font-family: Arial, sans-serif;
                }
                .container {
                    display: flex;
                    gap: 2rem;
                    padding: 1rem;
                }
                .selection-container {
                    flex: 0 0 300px;
                }
                .details-container {
                    flex: 1;
                    background: #fff;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 1.5rem;
                }
                select {
                    width: 100%;
                    padding: 0.5rem;
                    font-size: 1rem;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    margin-bottom: 1rem;
                }
                select:focus {
                    outline: none;
                    border-color: #007bff;
                    box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
                }
                button {
                    width: 100%;
                    padding: 0.75rem;
                    font-size: 1rem;
                    background-color: #28a745;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                button:hover {
                    background-color: #218838;
                }
                button:disabled {
                    background-color: #6c757d;
                    cursor: not-allowed;
                }
                .selected-classes {
                    margin-top: 1rem;
                }
                .selected-class {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.5rem;
                    background-color: #f8f9fa;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    margin-bottom: 0.5rem;
                }
                .remove-btn {
                    background-color: #dc3545;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    padding: 0.25rem 0.5rem;
                    cursor: pointer;
                }
                .remove-btn:hover {
                    background-color: #c82333;
                }
                .details-section {
                    margin-bottom: 1.5rem;
                }
                .details-section h3 {
                    color: #333;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 0.5rem;
                    margin-top: 0;
                }
                .details-section h4 {
                    color: #666;
                    margin: 1rem 0 0.5rem;
                }
                .details-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .details-list li {
                    padding: 0.25rem 0;
                }
            </style>
            <div class="container">
                <div class="selection-container">
                    <select size="10">
                        <option value="">Select a class...</option>
                        ${this.renderOptions()}
                    </select>
                    <button id="addBtn" disabled>Add Class</button>
                    <div class="selected-classes">
                        ${this.renderSelectedClass()}
                    </div>
                </div>
                <div class="details-container">
                    ${this.renderClassDetails()}
                </div>
            </div>
        `;
        this.shadowRoot.innerHTML = template;
        this.addEventListeners();
    }

    renderOptions() {
        if (!this.classes.length) {
            return '<option disabled>Loading classes...</option>';
        }
        return this.classes.map(className => `
            <option value="${className}">${className}</option>
        `).join('');
    }

    renderSelectedClass() {
        if (!this.selectedClass) {
            return '';
        }
        return `
            <div class="selected-class">
                <span>${this.selectedClass}</span>
                <button class="remove-btn" data-class="${this.selectedClass}">Remove</button>
            </div>
        `;
    }

    renderClassDetails() {
        if (!this.selectedClassData) {
            return '<h3>Select a class to view details</h3>';
        }

        const classData = this.selectedClassData;
        return `
            <div class="details-section">
                <h3>${classData.name}</h3>
                
                <h4>Hit Points</h4>
                <ul class="details-list">
                    <li>Hit Dice: ${classData.hd.number}d${classData.hd.faces}</li>
                </ul>

                <h4>Proficiencies</h4>
                <ul class="details-list">
                    <li>Saving Throws: ${classData.proficiency.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(', ')}</li>
                </ul>

                ${classData.spellcastingAbility ? `
                    <h4>Spellcasting</h4>
                    <ul class="details-list">
                        <li>Spellcasting Ability: ${classData.spellcastingAbility.toUpperCase()}</li>
                    </ul>
                ` : ''}

                <h4>Starting Equipment</h4>
                <ul class="details-list">
                    ${classData.startingEquipment?.default?.map(item => `
                        <li>${item}</li>
                    `).join('') || '<li>No starting equipment specified</li>'}
                </ul>
            </div>
        `;
    }

    addEventListeners() {
        const select = this.shadowRoot.querySelector('select');
        const addBtn = this.shadowRoot.querySelector('#addBtn');

        select.addEventListener('change', (e) => {
            const selectedValue = e.target.value;
            addBtn.disabled = !selectedValue;
            if (selectedValue) {
                this.loadClassDetails(selectedValue);
            }
            // Dispatch selection change event
            this.dispatchEvent(new CustomEvent('classSelectionChange', {
                detail: { className: selectedValue },
                bubbles: true,
                composed: true
            }));
        });

        addBtn.addEventListener('click', () => {
            const select = this.shadowRoot.querySelector('select');
            const selectedClass = select.value;
            if (selectedClass) {
                this.selectedClass = selectedClass;
                this.render();
                // Dispatch class added event
                this.dispatchEvent(new CustomEvent('classAdded', {
                    detail: { 
                        className: selectedClass,
                        classData: this.selectedClassData
                    },
                    bubbles: true,
                    composed: true
                }));
            }
        });

        // Add event listener for remove buttons
        this.shadowRoot.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-btn')) {
                const className = e.target.dataset.class;
                this.selectedClass = null;
                this.selectedClassData = null;
                this.render();
                // Dispatch class removed event
                this.dispatchEvent(new CustomEvent('classRemoved', {
                    detail: { className },
                    bubbles: true,
                    composed: true
                }));
            }
        });clutter/moradin-old/geri_src/5e_tools_data/class/class-artificer.json clutter/moradin-old/geri_src/5e_tools_data/class/class-barbarian.json clutter/moradin-old/geri_src/5e_tools_data/class/class-bard.json clutter/moradin-old/geri_src/5e_tools_data/class/class-cleric.json clutter/moradin-old/geri_src/5e_tools_data/class/class-druid.json clutter/moradin-old/geri_src/5e_tools_data/class/class-fighter.json clutter/moradin-old/geri_src/5e_tools_data/class/class-monk.json clutter/moradin-old/geri_src/5e_tools_data/class/class-mystic.json clutter/moradin-old/geri_src/5e_tools_data/class/class-paladin.json clutter/moradin-old/geri_src/5e_tools_data/class/class-ranger.json clutter/moradin-old/geri_src/5e_tools_data/class/class-rogue.json clutter/moradin-old/geri_src/5e_tools_data/class/class-sidekick.json clutter/moradin-old/geri_src/5e_tools_data/class/class-sorcerer.json clutter/moradin-old/geri_src/5e_tools_data/class/class-warlock.json clutter/moradin-old/geri_src/5e_tools_data/class/class-wizard.json
    }
}

customElements.define('class-selector', ClassSelector); 