import React from 'react';
import styled from 'styled-components'; 
import {useState} from 'react'; 

import './Attractions.css'; 

const Tab = styled.button`
  font-size: 18px;
  font-style: bold;
  padding: 2% 6%;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
`;

export class AttractionDisplay extends React.Component{
    state = [{
      id: 1,
      name: 'Avatar Flight',
      description: 'Climb atop a winged mountain banshee for a flight over Pandora landscape',
      status: 'open', 
      capacity: 20, 
      minimum_height: 112, 
      duration_time: 20, 
      typeid: 1, 
      type: 'vr ride', 
      locaid: 1, 
      loca: 'Lot A' 
    }] 
  
    render() {
      console.log('In TabDisplay: '+ this.state[0].name);
      return (
        <div>
            <img src={require(`./images/attraction/map.jpg`)} alt='map' className='mapImage'/>
            <TabGroup stateData={this.state}/>
        </div>
      )
    }
}

function TabGroup({stateData}) {
    const [activeLoca, setActiveLoca] = useState('Lot A'); 
    console.log('In TabGroup: ' + {stateData}); 
    const locations = ['Lot A', 'Lot B', 'Lot C', 'Lot D']; 
  
    return (
      <div className='tabGroupBox'>
        <ButtonGroup>
          {locations.map(location => (
            <Tab
              key={location}
              active={activeLoca === location}
              onClick={() => setActiveLoca(location)}
            >
              {location}
            </Tab>
          ))}
        </ButtonGroup>
        <div className='tabContentBox'>
          <ul>
            {
              stateData.map((value, index) => { 
                if (value.loca === activeLoca) {
                  return (
                  <div style = {{display: 'flex', alignItems: 'center', fontSize: 18}}> 
                    <img className='attractionImage' src = {require(`./images/attraction/${value.name}.jpg`)} alt = {value.name}></img> 
                    <div className='attractionDisplay'>
                      <div className='attractionDistance'>
                        <h4>{value.name}</h4> 
                        <label>{value.type}</label>
                      </div>
                      <label className='attractionDistance'>{value.description}</label>
                      <label className='attractionDistance'>Status: {value.status}</label>
                      <label className='attractionDistance'>About {value.duration_time} mins</label>
                      <div className='attractionDistance'>
                        <label>Capacity: {value.capacity} people</label>
                        <label style = {{marginLeft: 20}}>Height Limitation: {value.minimum_height} cm</label>
                      </div>
                    </div>
                  </div>)
                } else {
                  return null; 
                }
                
              })
            }
          </ul>
        </div>
      </div>
    );
}
  