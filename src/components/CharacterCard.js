import React, { useState ,useEffect} from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Image, Text ,Button,VStack} from '@chakra-ui/react';

const CharacterCard = ({ character, isOpen, onClose }) => {
  const [charDetails,setCharDetails] = useState(character);
  const [isFavorite,setFavorite]  = useState(charDetails.favourite);
  
  const toggleFavorite = (char) =>{
    const data = new URLSearchParams();
    data.append('favourite',!isFavorite);
    
    fetch('http://localhost:8765/api/characters/'+char.characterId+'/favourite', {
      method: 'PUT',
      headers: {'Accept':'application/json','CorrelationId':'dcrv-ebtbb'},
      body: data
    })
    .then((response) => response.json())
    .then((d) => {console.log(d)})
    .catch((err) => {console.log(err)});

    setFavorite(!isFavorite);
  }

  useEffect(()=>{
    fetch('http://localhost:8765/api/character/'+ charDetails.characterId, {
      headers: {'Accept':'application/json','CorrelationId':'dcrv-ebtbb'}
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCharDetails(data);
        setFavorite(data.favourite);
      })
      .catch((err) => {
          console.log(err);
    });
  },[])
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{charDetails.characterName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src={charDetails.characterImageFull} alt={charDetails.characterName} />
          <VStack mt="2" spacing="4" align="left">
            {charDetails.actorName && <Text><strong>Actor Name:</strong> {charDetails.actorName}</Text>}
            
            {charDetails.houseName && <Text><strong>House Name:</strong> {charDetails.houseName}</Text>}
            
            {charDetails.nickname && <Text><strong>Nickname:</strong> {charDetails.nickname}</Text>}
            
            {charDetails.royal && <Text><strong>Royal:</strong> {charDetails.royal ? "YES" : "NO"}</Text>}
            
            {charDetails.kingsguard && <Text><strong>Kingsguard:</strong> {charDetails.kingsguard ? "YES" : "NO" }</Text>}

            {charDetails.servedBy.length > 0 && (
              <Text><strong>Served By:</strong> {charDetails.servedBy.join(', ')}</Text>
            )}
            {charDetails.siblings.length > 0 && (
              <Text><strong>Siblings:</strong> {charDetails.siblings.join(', ')}</Text>
            )}
            {charDetails.guardianOf.length > 0 && (
              <Text><strong>Guardian Of:</strong> {charDetails.guardianOf.join(', ')}</Text>
            )}
            {charDetails.allies.length > 0 && (
              <Text><strong>Allies:</strong> {charDetails.allies.join(', ')}</Text>
            )}
            {charDetails.killed.length > 0 && (
              <Text><strong>Killed:</strong> {charDetails.killed.join(', ')}</Text>
            )}
            {charDetails.killedBy.length > 0 && (
              <Text><strong>Killed By:</strong> {charDetails.killedBy.join(', ')}</Text>
            )}
            {charDetails.parents.length > 0 && (
              <Text><strong>Parents:</strong> {charDetails.parents.join(', ')}</Text>
            )}
            {charDetails.abductedBy.length > 0 && (
              <Text><strong>Abducted By:</strong> {charDetails.abductedBy.join(', ')}</Text>
            )}
            {charDetails.abducted.length > 0 && (
              <Text><strong>Abducted:</strong> {charDetails.abducted.join(', ')}</Text>
            )}
            {charDetails.serves.length > 0 && (
              <Text><strong>Serves:</strong> {charDetails.serves.join(', ')}</Text>
            )}
            {charDetails.marriedEngaged.length > 0 && (
              <Text><strong>Married/Engaged:</strong> {charDetails.marriedEngaged.join(', ')}</Text>
            )}
            {charDetails.parentOf.length > 0 && (
              <Text><strong>Parent Of:</strong> {charDetails.parentOf.join(', ')}</Text>
            )}
            {charDetails.guardedBy.length > 0 && (
              <Text><strong>Guarded By:</strong> {charDetails.guardedBy.join(', ')}</Text>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
        <Button colorScheme={isFavorite ? "green":"teal"} onClick={() => toggleFavorite(charDetails)}>{isFavorite ? 'Selected as Favorite' : 'Select as Favorite'}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CharacterCard;
