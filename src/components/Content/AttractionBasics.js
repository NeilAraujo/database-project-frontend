import React from 'react';
import styled from 'styled-components'; 
import { useState, useEffect } from 'react'; 

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
    border-bottom: 2px solid #1C468E;
    opacity: 1;
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
`;

export function AttractionDisplay() { 
    const [typeData, setTypeData] = useState([]); 
    const [attraction, setAttraction] = useState([]); 
    const [location, setLocation] = useState([]); 
  
    useEffect(() => {
      fetch('http://localhost:8080/attraction/listatttype') 
      .then((response) => response.json()) 
      .then((data) => {
          setTypeData(data.data); 
      })
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/attraction/list') 
        .then((response) => response.json()) 
        .then((data) => {
            setAttraction(data.data); 
        })
    }, []);

    useEffect(() => {
      fetch('http://localhost:8080/attraction/listls') 
      .then((response) => response.json()) 
      .then((data) => {
          setLocation(data.data); 
      })
    }, []);

    return (
      <div>
          <TabGroup typeData={typeData} attraction={attraction} location={location}/>
      </div>
    )
}

function TabGroup({typeData, attraction, location}) {
    const [activeType, setActiveType] = useState(1); 
  
    function getSection(ls_id) {
      for (let i = 0; i < location.length; i++) {
        if (location[i].ls_id === ls_id) {
          return location[i].ls_name; 
        }
      }
      return '';
    }

    return (
      <div className='tabGroupBox'>
        <ButtonGroup>
          {typeData.map((type, index) => (
            <Tab
              key={index}
              active={activeType === type.atttype_id}
              onClick={() => setActiveType(type.atttype_id)} 
              style = {{fontSize: 22, fontStyle: 'bold', color: '#253A56'}}
            >
              {type.atttype_name}
            </Tab>
          ))}
        </ButtonGroup>
        <div className='tabContentBox'>
          <ul>
            {
              attraction.map((att, index) => { 
                if (att.atttype_id === activeType) {
                  return (
                  <div style = {{display: 'flex', alignItems: 'center', fontSize: 18}}> 
                    <img className='attractionImage' src = {require(`./images/attraction/${att.att_name}.jpg`)} alt = {att.att_name}></img> 
                    <div className='attractionDisplay'>
                      <div className='attractionDistance'>
                        <h4 style = {{marginBottom: 2, color: '#1C468E', fontSize: 22}}>{att.att_name}</h4> 
                      </div>
                      <label className='attractionDistance'>{att.att_description}</label>
                      <label className='attractionDistance'>Location Section: {getSection(att.ls_id)}</label>
                      <label className='attractionDistance'>Status: {att.att_status}</label>
                      <label className='attractionDistance'>About {att.att_duration_time} mins</label>
                      <div className='attractionDistance'>
                        <label>Capacity: {att.att_capacity} people</label>
                        <label style = {{marginLeft: 20}}>Height Limitation: {att.att_minimum_height} cm</label>
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
  