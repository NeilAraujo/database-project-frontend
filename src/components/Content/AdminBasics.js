import React  from 'react';
import { useState, useEffect } from 'react'; 
import { Tag, Table, Button, Form, Input, Radio, TimePicker, Alert, Modal } from 'antd'; 

import styled from 'styled-components'; 
import './Admin.css';  

import { AllVisitors } from './AdminTables'; 
import { AllOrders } from './AdminTables'; 
import { AllTickets } from './AdminTables'; 
import { AllShows } from './AdminTables'; 
import { AllAttractions } from './AdminTables'; 
import { AllStores } from './AdminTables';
import { AllParkings } from './AdminTables';

const Tab = styled.button`
  font-size: 16px;
  font-style: bold;
  padding: 1% 3%;
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

export function AdminDisplay() {
    return (
        <div>
            <TapGroup />
        </div>
    )
} 

export class Analysis {
    
} 

function TapGroup() {
    const [activeTab, setActiveTab] = useState('All Visitors'); 
    const titles = ['All Visitors', 'All Orders', 'All Tickets', 'All Shows', 'All Attractions', 'All Stores', 'All Parkings'];
    
    return (
        <div className='tabGroupBox'>
          <ButtonGroup>
            {titles.map(title => (
              <Tab
                key={title}
                active={activeTab === title}
                onClick={() => setActiveTab(title)}
              >
                {title}
              </Tab>
            ))}
          </ButtonGroup>
          <div className='tabContentBox'>
            {activeTab === 'All Visitors' && (
                <AllVisitors /> 
            )}
            {activeTab === 'All Orders' && (
                <AllOrders />
            )}      
            {activeTab === 'All Tickets' && (
                <AllTickets />
            )}    
            {activeTab === 'All Shows' && (
                <div>
                    <AllShows />
                    <AddShow />
                </div>
            )}
            {activeTab === 'All Attractions' && (
                <div>
                    <AllAttractions />
                    <AddAttraction />
                </div>
            )}
            {activeTab === 'All Stores' && (
                <div>
                    <AllStores /> 
                    <Button>Add Menu Item</Button> 
                    <Button style={{marginLeft:40}}>Add Store Menu Item</Button>
                </div>
            )}
            {activeTab === 'All Parkings' && (
                <AllParkings />
            )}
          </div>
        </div>
      );
}

class AddShow extends React.Component { 
    constructor() {
        super();
        this.state = {
            showTypes: [], 
            name: '', 
            description: '', 
            startTime: null, 
            startTimeStr: '', 
            endTime: null, 
            endTimeStr: '', 
            wheelchairAcc: '1', 
            price: NaN, 
            type: '', 
            typeId: 0,
            alertMessage: '', 
            showAlert: false, 
            success: false, 
        }
        this.handleShowName = this.handleShowName.bind(this); 
        this.handleShowDescription = this.handleShowDescription.bind(this); 
        this.handleStartTime = this.handleStartTime.bind(this); 
        this.handleEndTime = this.handleEndTime.bind(this); 
        this.handleWheelchairAcc = this.handleWheelchairAcc.bind(this); 
        this.handleShowPrice = this.handleShowPrice.bind(this); 
        this.handleShowType = this.handleShowType.bind(this); 
        this.getShowTypeId = this.getShowTypeId.bind(this); 
        this.handleAddShow = this.handleAddShow.bind(this); 
    }
    
    
    componentDidMount() {
        fetch('http://localhost:8080/show/listshtype') 
        .then((response) => response.json()) 
        .then((data) => {
            this.setState({
                showTypes: data.data,
            })
        })
    }

    handleShowName(e) {
        this.setState({
            name: e.target.value.trim(),
        }, () => {})
    }

    handleShowDescription(e) {
        this.setState({
            description: e.target.value.trim(), 
        }, () => {})
    }

    handleStartTime(time, timeStr) {
        this.setState({
            startTime: time, 
            startTimeStr: timeStr, 
        }, () => {})
    }

    handleEndTime(time, timeStr) {
        this.setState({
            endTime: time, 
            endTimeStr: timeStr, 
        }, () => {})
    }

    handleWheelchairAcc(e) {
        this.setState({
            wheelchairAcc: e.target.value, 
        }, () => {})
    }

    handleShowPrice(e) { 
        this.setState({
            price: parseInt(e.target.value.trim()), 
        }, () => {}) 
    }

    handleShowType(e) {
        this.setState({
            type: e.target.value, 
        }, () => {
            this.getShowTypeId();
        })
    }

    getShowTypeId() {
        for (let i = 0; i < this.state.showTypes.length; i++) {
            if (this.state.showTypes[i].shtype_name === this.state.type) {
                this.setState({
                    typeId: this.state.showTypes[i].shtype_id, 
                }, () => {})
            }
        }
    }

    handleAddShow() {
        console.log("type id: " + this.state.typeId) 
        if (this.state.name === '' || this.state.description === '') {
            this.setState({
                alertMessage: "Show name and description cannot be null.", 
                showAlert: true, 
            }, () => {})
        } else if (this.state.startTime === null || this.state.endTime === null || this.state.startTime >= this.state.endTime) {
            this.setState({
                alertMessage: "Show time cannot be null and start time must be before end time.", 
                showAlert: true, 
            }, () => {})
        } else if (isNaN(this.state.price)) {
            this.setState({
                alertMessage: "Show price should be set to integer.", 
                showAlert: true, 
            }, () => {})
        } else {
            this.setState({
                showAlert: false, 
            }, () => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                }; 
                const date = new Date(); 
                const str = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() 
                const start = str + " " + this.state.startTimeStr
                const end = str + " " + this.state.endTimeStr
                fetch(`http://localhost:8080/show/add?shName=${this.state.name}&shDescription=${this.state.description}&shStartTime=${start}&shEndTime=${end}&shWheelchairAcc=${this.state.wheelchairAcc}&shPrice=${this.state.price}&shTypeId=${this.state.typeId}`, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log("add show!") 
                        this.setState({
                            success: true
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    success: false
                                })
                            }, 3000);
                        })
                    });
            })
        }
    } 

    render() {
        return (
            <div className='operationBox'>
                <div>
            <Form labelCol={{
                    span: 10,
                  }}
                  wrapperCol={{
                    span: 14, 
                  }}
                  layout="horizontal" 
                  style = {{marginTop: 30}}>
                <Form.Item label="Show Name">
                    <Input placeholder="name" onChange = {this.handleShowName}/>
                </Form.Item>
                <Form.Item label="Show Description">
                    <Input placeholder="description" onChange = {this.handleShowDescription}/>
                </Form.Item>
                <Form.Item label="Start Time">
                    <TimePicker onChange = {this.handleStartTime}/>
                </Form.Item> 
                <Form.Item label="End Time">
                    <TimePicker onChange = {this.handleEndTime}/>
                </Form.Item> 
                <Form.Item label="Wheelchair Accessible">
                    <Radio.Group onChange={this.handleWheelchairAcc} defaultValue={"1.0"}>
                        <Radio value="1.0"> Yes </Radio>
                        <Radio value="0.0"> No </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Show Price">
                    <Input placeholder="price" onChange = {this.handleShowPrice}/>
                </Form.Item>
                <Form.Item label="Show Type">
                    <Radio.Group onChange={this.handleShowType} defaultValue={"drama"}>
                        <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
                            <Radio value="drama"> Drama </Radio>
                            <br />
                            <Radio value="musical"> Musical </Radio>
                            <br />
                            <Radio value="comedy"> Comedy </Radio>
                            <br />
                            <Radio value="horror"> Horror </Radio>
                            <br />
                        </div>
                    </Radio.Group>
                </Form.Item>
            </Form> 
            </div>
            {
                (this.state.showAlert) ? (
                    <Alert
                        message="Error"
                        description={this.state.alertMessage}
                        type="error"
                        showIcon 
                        style = {{marginTop: 30, width: 400}}
                    />
                ) : null
            }
            <Button onClick = {this.handleAddShow} style ={{marginTop: 20}}>Add Show</Button> 
            {
                (this.state.success) ? (
                    <Alert style = {{marginTop:30}} message="Successfully Added!" type="success" showIcon />
                ) : null
            }
        </div>)
    }
    
} 

class AddAttraction extends React.Component { 
    constructor() {
        super();
        this.state = {
            attractionTypes: [], 
            locationSections: [], 
            name: '', 
            description: '', 
            status: 'open', 
            capacity: NaN, 
            minimumHeight: NaN, 
            duration: NaN, 
            location: 'Lot A', 
            locationId: 0, 
            type: 'roller coaster', 
            typeId: 0,
            alertMessage: '', 
            showAlert: false, 
            success: false, 
        }
        this.handleName = this.handleName.bind(this); 
        this.handleDescription = this.handleDescription.bind(this); 
        this.handleStatus = this.handleStatus.bind(this); 
        this.handleCapacity = this.handleCapacity.bind(this); 
        this.handleMinimumHeight = this.handleMinimumHeight.bind(this); 
        this.handleDuration = this.handleDuration.bind(this); 
        this.handleLocation = this.handleLocation.bind(this); 
        this.handleType = this.handleType.bind(this); 
        this.handleAddAttraction = this.handleAddAttraction.bind(this); 
    }
    
    
    componentDidMount() {
        fetch('http://localhost:8080/attraction/listatttype') 
        .then((response) => response.json()) 
        .then((data) => {
            this.setState({
                attractionTypes: data.data,
            }, () => {
                fetch('http://localhost:8080/attraction/listls') 
                .then((response) => response.json()) 
                .then((data) => {
                    this.setState({
                        locationSections: data.data,
                    })
                })
            })
        })
    }

    handleName(e) {
        this.setState({
            name: e.target.value.trim(),
        }, () => {})
    }

    handleDescription(e) {
        this.setState({
            description: e.target.value.trim(),
        }, () => {})
    }

    handleStatus(e) {
        this.setState({
            status: e.target.value,
        }, () => {})
    }

    handleCapacity(e) {
        this.setState({
            capacity: parseInt(e.target.value.trim()), 
        }, () => {
            console.log("capacity: " + this.state.capacity)
        }) 
    }

    handleMinimumHeight(e) {
        this.setState({
            minimumHeight: parseInt(e.target.value.trim()), 
        }, () => {
            console.log("minimum height: " + this.state.minimumHeight)
        }) 
    }

    handleDuration(e) {
        this.setState({
            duration: parseInt(e.target.value.trim()), 
        }, () => {
            console.log("duration time: " + this.state.duration)
        }) 
    }

    handleLocation(e) {
        this.setState({
            location: e.target.value,
        }, () => {
            this.getLocationId();
        })
    }

    handleType(e) {
        this.setState({
            type: e.target.value,
        }, () => {
            this.getTypeId();
        })
    }
   

    getTypeId() {
        for (let i = 0; i < this.state.attractionTypes.length; i++) {
            if (this.state.attractionTypes[i].atttype_name === this.state.type) {
                this.setState({
                    typeId: this.state.attractionTypes[i].atttype_id, 
                }, () => {})
            }
        }
    } 

    getLocationId() {
        for (let i = 0; i < this.state.locationSections.length; i++) {
            if (this.state.locationSections[i].ls_name === this.state.location) {
                this.setState({
                    locationId: this.state.locationSections[i].ls_id, 
                }, () => {})
            }
        }
    }

    handleAddAttraction() {
        if (this.state.name === '' || this.state.description === '') {
            this.setState({
                alertMessage: "Attraction name and description cannot be null.", 
                showAlert: true, 
            }, () => {})
        } else if (isNaN(this.state.capacity) || isNaN(this.state.minimumHeight) || isNaN(this.state.duration)) {
            this.setState({
                alertMessage: "Attraction capacity, minimum hieght or duration time should be integer.", 
                showAlert: true, 
            }, () => {})
        } else {
            this.setState({
                showAlert: false, 
            }, () => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                }; 
                fetch(`http://localhost:8080/attraction/add?attName=${this.state.name}&attDescription=${this.state.description}&attStatus=${this.state.status}&attCapacity=${this.state.capacity}&attMinimumHeight=${this.state.minimumHeight}&attDurationTime=${this.state.duration}&lsId=${this.state.locationId}&attTypeId=${this.state.typeId}`, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        this.setState({
                            success: true
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    success: false
                                })
                            }, 3000);
                        })
                    });
            })
        }
    }

    render() {
        return (
            <div className='operationBox'>
                <div>
            <Form labelCol={{
                    span: 12,
                  }}
                  wrapperCol={{
                    span: 14, 
                  }}
                  layout="horizontal" 
                  style = {{marginTop: 30}}>
                <Form.Item label="Attraction Name">
                    <Input placeholder="name" onChange = {this.handleName}/>
                </Form.Item>
                <Form.Item label="Attraction Description">
                    <Input placeholder="description" onChange = {this.handleDescription}/>
                </Form.Item>
                <Form.Item label="Attraction Status">
                    <Radio.Group onChange={this.handleStatus} defaultValue={"open"}>
                        <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
                            <Radio value="open"> Open </Radio>
                            <br />
                            <Radio value="under maintenance"> Under Maintenance </Radio>
                            <br />
                            <Radio value="closed"> Closed </Radio>
                            <br />
                        </div>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Attraction Capacity">
                    <Input placeholder="capacity" onChange = {this.handleCapacity}/>
                </Form.Item>
                <Form.Item label="Attraction Minium Height">
                    <Input placeholder="minimum height" onChange = {this.handleMinimumHeight}/>
                </Form.Item>
                <Form.Item label="Attraction Duration Time">
                    <Input placeholder="duration time" onChange = {this.handleDuration}/>
                </Form.Item>
                <Form.Item label="Attraction Type">
                    <Radio.Group onChange={this.handleType} defaultValue={"roller coaster"}>
                        <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
                            <Radio value="roller coaster"> Roller Coaster </Radio>
                            <br />
                            <Radio value="water ride"> Water Ride </Radio>
                            <br />
                            <Radio value="dark ride"> Dark Ride </Radio>
                            <br />
                            <Radio value="kid ride"> Kid Ride </Radio>
                            <br />
                            <Radio value="vr ride"> VR Ride </Radio>
                            <br />
                        </div>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Location Section">
                    <Radio.Group onChange={this.handleLocation} defaultValue={"Lot A"}>
                        <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
                            <Radio value="Lot A"> Lot A </Radio>
                            <br />
                            <Radio value="Lot B"> Lot B </Radio>
                            <br />
                            <Radio value="Lot C"> Lot C </Radio>
                            <br />
                            <Radio value="Lot D"> Lot D </Radio>
                            <br />
                        </div>
                    </Radio.Group>
                </Form.Item>
            </Form> 
            </div>
            {
                (this.state.showAlert) ? (
                    <Alert
                        message="Error"
                        description={this.state.alertMessage}
                        type="error"
                        showIcon 
                        style = {{marginTop: 30, width: 400}}
                    />
                ) : null
            }
            <Button onClick = {this.handleAddAttraction} style ={{marginTop: 20}}>Add Attraction</Button> 
            {
                (this.state.success) ? (
                    <Alert style = {{marginTop:30}} message="Successfully Added!" type="success" showIcon />
                ) : null
            }
        </div>)
    }
    
}

