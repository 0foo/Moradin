class ClassPicker extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.classes = [];
        this.selectedClass = null;
    }

    async connectedCallback() {
        await this.init();
        this.render();
        this.attachEventListeners();
    }

    async init() {
        try {
            const response = await fetch('/data/all-classes.json');
            this.classes = await response.json();
        } catch (error) {
            console.error('Error loading classes:', error);
        }
    }

    render() {
        const styles = `
            .class-picker {
                display: flex;
                gap: 2rem;
                padding: 1rem;
                height: 100%;
                font-family: system-ui, -apple-system, sans-serif;
            }

            .class-list {
                flex: 1;
                max-width: 600px;
            }

            .class-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 1rem;
                margin-top: 1rem;
            }

            .class-card {
                background: #fff;
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 1rem;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .class-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }

            .class-card.selected {
                border-color: #ffc107;
                box-shadow: 0 0 0 2px #ffc107;
            }

            .class-card h4 {
                margin: 0 0 0.5rem 0;
                color: #333;
            }

            .class-card p {
                margin: 0;
                font-size: 0.9rem;
                color: #666;
            }

            .class-details {
                flex: 1;
                background: #fff;
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 1.5rem;
            }

            .class-details h3, .class-list h3 {
                margin-top: 0;
                color: #333;
            }

            button {
                background: #0d6efd;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                cursor: pointer;
                margin-top: 1rem;
            }

            button:hover {
                background: #0b5ed7;
            }
        `;

        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            <div class="class-picker">
                <div class="class-list">
                    <h3>Choose Your Class</h3>
                    <div class="class-grid">
                        ${this.classes.map(classData => `
                            <div class="class-card" data-class-id="${classData.id}">
                                <h4>${classData.name}</h4>
                                <p>${this.truncateText(classData.description, 100)}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="class-details">
                    <h3>Class Details</h3>
                    <div id="selectedClassInfo">
                        <p>Select a class to view its details</p>
                    </div>
                </div>
            </div>
        `;
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }

    showClassDetails(classData) {
        const details = this.shadowRoot.getElementById('selectedClassInfo');
        details.innerHTML = `
            <h4>${classData.name}</h4>
            <p>${classData.description}</p>
            <h5>Hit Die</h5>
            <p>d${classData.hitDie}</p>
            <h5>Primary Ability</h5>
            <p>${classData.primaryAbility}</p>
            <h5>Saving Throw Proficiencies</h5>
            <p>${classData.savingThrows.join(', ')}</p>
            <button id="selectClassBtn">Choose ${classData.name}</button>
        `;

        this.shadowRoot.getElementById('selectClassBtn').addEventListener('click', () => {
            this.selectClass(classData.id);
        });
    }

    attachEventListeners() {
        this.shadowRoot.querySelector('.class-grid').addEventListener('click', (e) => {
            const card = e.target.closest('.class-card');
            if (!card) return;

            // Remove previous selection
            this.shadowRoot.querySelectorAll('.class-card.selected')
                .forEach(card => card.classList.remove('selected'));
            
            // Add selection to clicked card
            card.classList.add('selected');

            // Show details for selected class
            const classId = card.dataset.classId;
            const classData = this.classes.find(c => c.id === classId);
            if (classData) {
                this.showClassDetails(classData);
            }
        });
    }

    selectClass(classId) {
        const classData = this.classes.find(c => c.id === classId);
        if (!classData) return;

        this.selectedClass = classData;
        // Dispatch event for parent application
        const event = new CustomEvent('classSelected', {
            detail: { classData },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }
}

// Register the custom element
customElements.define('class-picker', ClassPicker); 