function characterToNode(characterMap, character) {
    const node = {
      ...character,
      name: character.name,
      children: [],
    };
  
    if (character.parentOf) {
      character.parentOf.forEach((childName) => {
        const childCharacter = characterMap[childName];
        if (childCharacter) {
          node.children.push(characterToNode(characterMap, childCharacter));
        }
      });
    }
  
    return node;
  }

function transformCharacterData(characterDataList,housename) {
    const characterMap = {};
  
    // Create a map of characters for quick lookup
    characterDataList.forEach((character) => {
      characterMap[character.name] = character;
    });
  
    // Create a root node for characters without parents
    const rootNode = {
      name: housename, 
      children: [],
    };
  
    // Build the tree structure recursively
    characterDataList.forEach((character) => {
      if (!character.parents || character.parents.length === 0) {
        rootNode.children.push(characterToNode(characterMap, character));
      }
    });
  
    return rootNode;
}

export default transformCharacterData;