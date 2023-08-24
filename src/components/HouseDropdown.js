import React, { useEffect, useState } from 'react';
import { Select } from '@chakra-ui/react';

function HouseDropdown({ onChange }) {
  const houses = ['House Stark', 'House Lannister', 'House Targaryen'];
  const [houseList,setHouseList] = useState(houses);

  const getHouseList = () => {
    fetch('http://localhost:8765/api/characters/houses' , {
      headers: {'Accept':'application/json','CorrelationId':'dcrv-ebtbb'}
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setHouseList(data.houseList.filter(elements => {
          return elements !== null;
         }));
      })
      .catch((err) => {
          console.log(err);
    });
  }


  useEffect(()=>{
    getHouseList();
  },[])

  return (
    <Select
      placeholder="Select a house"
      onChange={(event) => onChange(event.target.value)}
      width="200px"
    >
      {houseList.map((house) => (
        <option key={house} value={house}>
          {house}
        </option>
      ))}
    </Select>
  );
}

export default HouseDropdown;
