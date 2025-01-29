import { StorageManager } from '/js/storage/StorageManager.js';
// import * as Util from  '/js/util/util-compiled.js'


// Util.Storage.clear()

let storage = new StorageManager('Moradin')

document.getElementById('viewCharacterBtn').addEventListener('click', function() {
    console.log('view character')
    // Util.URL.changeLocation('edit.html', ["charIdentifier", ])
});

document.getElementById('editCharacterBtn').addEventListener('click', function() {
    let the_identifier = getFirstSelectOption().value
    // Util.URLutil.openLocation('edit.html', {"charIdentifier": the_identifier})
});

document.getElementById('addCharacterBtn').addEventListener('click', function() {
    const characterName = prompt('Enter the character\'s name (can be changed later):');
    if (characterName.trim() === ""){
        characterName = "name_" + Util.Hash.generateRandomHash(6);
    }
    let hash = Util.Hash.generateRandomHash(6);
    full_character_data[hash] = {
        "name": characterName
    };
    // updateSelectBox()
});

document.getElementById('deleteCharacterBtn').addEventListener('click', function() {
    let char_id = getFirstSelectOption().value
    // char_store.deleteCharacterById(char_id)
    updateSelectBox()
});

document.addEventListener('DOMContentLoaded', function() {
    updateSelectBox()
});

function updateSelectBox(){
    document.getElementById('characterSelect').innerHTML = '';
    // const characterData = char_store.getIdentifierAndNames()

    // for (let identifier in characterData) {
    //     if (characterData.hasOwnProperty(identifier)) {
    //       const name = characterData[identifier];
    //       addToSelectBox(identifier, name)
    //     }
    //   }
}

// function addToSelectBox(characterId, characterName){
//     const selectBox = document.getElementById('characterSelect');
//     const newOption = document.createElement('option');
//     newOption.text = characterName;
//     newOption.value = characterId;
//     selectBox.add(newOption);
// }

// function getFirstSelectOption(){
//     const selectElement = document.getElementById('characterSelect');
//     const selectedIndex = selectElement.selectedIndex;
//     return selectElement.options[selectedIndex];
// }


