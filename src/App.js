import React, { useEffect, useState } from 'react';
import { ChakraProvider, Flex, VStack } from '@chakra-ui/react';
import HouseDropdown from './components/HouseDropdown';
import FamilyTree from './components/FamilyTree';
import CharacterCard from './components/CharacterCard';
import transformCharacterData from './util';

function App() {
  const [treeData, setTreeData] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState();

  const closeCharacterCard = () => {
    setSelectedCharacter(null);
  };

  const handleHouseChange = (houseName) => {
    console.log(houseName);
    fetchTreeDataFromAPI(houseName); 
    setSelectedCharacter(null);
  };

  const fetchTreeDataFromAPI = (houseName) => {
  
   fetch('http://localhost:8765/api/characters/familytree/'+ houseName , {
      headers: {'Accept':'application/json','CorrelationId':'dcrv-ebtbb'}
      })
      .then((response) => response.json())
      .then((data) => {
        setTreeData(transformCharacterData(data.characters.map(obj=>{
          return  {...obj,name:obj.characterName}
        }),houseName))
      })
      .catch((err) => {
          console.log(err);
    });

  };
  
  const handleNodeClick = (nodeData) => {
    if(nodeData.data.parents!=null &&  nodeData.data.parents!=undefined)
    setSelectedCharacter(nodeData.data);
    console.log(nodeData);
  };

  return (
    <ChakraProvider>
      <Flex align="center" justify="center" minHeight="100vh">
        <VStack spacing="4">
          <HouseDropdown onChange={handleHouseChange} />
          {treeData !== null && (
            <FamilyTree treeData={treeData} onNodeClick={handleNodeClick} />
          )}
        </VStack>
      </Flex>
      {selectedCharacter && <CharacterCard
          character={selectedCharacter}
          isOpen={true}
          onClose={closeCharacterCard}
        />}
    </ChakraProvider>
  );
}

export default App;
