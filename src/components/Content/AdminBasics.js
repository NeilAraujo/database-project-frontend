import React  from 'react';
import {useState} from 'react'; 
import { Tag, Table } from 'antd'; 

import styled from 'styled-components'; 
import './Admin.css'; 

const { Column, ColumnGroup } = Table; 

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

export class AllData {

}

function TapGroup() {
    const [activeTab, setActiveTab] = useState('All Visitors'); 
    const titles = ['All Visitors', 'All Orders', 'All Tickets', 'All Shows', 'All Attractions', 'All Stores']; 
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
                <AllShows />
            )}
            {activeTab === 'All Attractions' && (
                <AllAttractions />
            )}
            {activeTab === 'All Stores' && (
                <AllStores />
            )}
          </div>
        </div>
      );
}

class AllVisitors extends React.Component{
    state = [
    {
        id: 1, 
        name: 'Michael Smith',
        address: '250 Ashland Place, Burlington, Vermont, United States', 
        email: 'ms@gmail.com', 
        telNum: '(332)-234-6910', 
        type: 'M', 
        birthDate: '1990-10-10'
    }, {
        id: 2, 
        name: 'Michael Smith',
        address: '250 Ashland Place, Burlington, Vermont, United States', 
        email: 'ms@gmail.com', 
        telNum: '(332)-234-6910', 
        type: 'I', 
        birthDate: '1990-10-10'
    }, {
        id: 3, 
        name: 'Michael Smith',
        address: '250 Ashland Place, Burlington, Vermont, United States', 
        email: 'ms@gmail.com', 
        telNum: '(332)-234-6910', 
        type: 'S', 
        birthDate: '1990-10-10'
    }, {
        id: 4, 
        name: 'Michael Smith',
        address: '250 Ashland Place, Burlington, Vermont, United States', 
        email: 'ms@gmail.com', 
        telNum: '(332)-234-6910', 
        type: 'G', 
        birthDate: '1990-10-10'
    }] 

    render() {
        return (<ShowAllVisitors dataSource = {this.state} />)
    }

} 

function ShowAllVisitors({dataSource}) {
    const columns = [
        {
            title: 'ID', 
            dataIndex: 'id', 
            key: 'id', 
        }, {
            title: 'Name', 
            dataIndex: 'name', 
            key: 'name', 
        }, {
            title: 'Birth Date', 
            dataIndex: 'birthDate', 
            key: 'birthDate'
        }, {
            title: 'Address', 
            dataIndex: 'address', 
            key: 'address', 
        }, {
            title: 'Email', 
            dataIndex: 'email', 
            key: 'email', 
        }, {
            title: 'Tel Number', 
            dataIndex: 'telNum', 
            key: 'telNum', 
        }, {
            title: 'Type', 
            dataIndex: 'type', 
            key: 'type', 
            render: (_, {type}) => {
                console.log("type: " + type);
                if (type == 'M') {
                    return (
                    <Tag color = 'volcano'>
                        {'Member'}
                    </Tag>)
                } else if (type == 'S') {
                    return (
                    <Tag color = 'purple'>
                        {'Student'}
                    </Tag>)
                } else if (type == 'G') {
                    return (
                    <Tag color = 'geekblue'>
                        {'Group'}
                    </Tag>)
                } else {
                    return (
                    <Tag color = 'green'>
                        {'Individual'}
                    </Tag>)
                }
            }
        }
    ];
    const data = dataSource;
    
    return (<Table columns={columns} dataSource={data} />);
}

class AllTickets extends React.Component{
    state = [
        {
            id: 1, 
            online: '1',
            visitDate: '2023-04-10', 
            price: '100', 
            discount: '35', 
            isPaid: '1', 
            typeID: 1, 
        }, {
            id: 2, 
            online: '1',
            visitDate: '2023-04-10', 
            price: '100', 
            discount: '35', 
            isPaid: '1', 
            typeID: 1, 
        }, {
            id: 3, 
            online: '1',
            visitDate: '2023-04-10', 
            price: '100', 
            discount: '35', 
            isPaid: '1', 
            typeID: 1, 
        }, {
            id: 4, 
            online: '1',
            visitDate: '2023-04-10', 
            price: '100', 
            discount: '35', 
            isPaid: '1', 
            typeID: 1, 
        }] 
    
        render() {
            return (<ShowAllTickets dataSource = {this.state} />)
        }
}

function ShowAllTickets ({dataSource}) {
    const columns = [
        {
            title: 'ID', 
            dataIndex: 'id', 
            key: 'id', 
        }, {
            title: 'Method', 
            dataIndex: 'online', 
            key: 'online', 
            render: (_, {online}) => {
                if (online === '1') {
                    return <label>online</label>
                } else {
                    return <label>onsite</label>
                }
            }
        }, {
            title: 'Type', 
            dataIndex: 'typeID', 
            key: 'typeID', 
        }, {
            title: 'Visit Date', 
            dataIndex: 'visitDate', 
            key: 'visitDate'
        }, {
            title: 'Price', 
            dataIndex: 'price', 
            key: 'price', 
            render: (_, {price}) => {
                return <label>${price}</label>
            }
        }, {
            title: 'Discount', 
            dataIndex: 'discount', 
            key: 'discount', 
            render: (_, {discount}) => {
                return <label>{discount}%</label>
            }
        }, 
    ];
    const data = dataSource;
    
    return (<Table columns={columns} dataSource={data} />);
}

class AllShows extends React.Component{
    state = [
        {
            id: 1, 
            name: 'Frozen',
            description: 'Fearless Anna starts her journey to find her sister Elsa',
            startTime: '10:30:00', 
            endTime: '11:15:00',
            wheelchairAcc: '1', 
            price: 20, 
            typeID: 1, 
        }, {
            id: 2, 
            name: 'Frozen',
            description: 'Fearless Anna starts her journey to find her sister Elsa',
            startTime: '10:30:00', 
            endTime: '11:15:00',
            wheelchairAcc: '1', 
            price: 20, 
            typeID: 1, 
        }, {
            id: 2, 
            name: 'Frozen',
            description: 'Fearless Anna starts her journey to find her sister Elsa',
            startTime: '10:30:00', 
            endTime: '11:15:00',
            wheelchairAcc: '1', 
            price: 20, 
            typeID: 1, 
        }, {
            id: 3, 
            name: 'Frozen',
            description: 'Fearless Anna starts her journey to find her sister Elsa',
            startTime: '10:30:00', 
            endTime: '11:15:00',
            wheelchairAcc: '1', 
            price: 20, 
            typeID: 1, 
        }] 
    
        render() {
            return (<ShowAllShows dataSource = {this.state} />)
        }
}

function ShowAllShows ({ dataSource }) {
    const data = dataSource;
    
    return (
    <Table dataSource={data} >
        <Column title = 'ID' dataIndex = 'id' key = 'id'/>
        <Column title = 'Name' dataIndex = 'name' key = 'name' />
        <Column title = 'Description' dataIndex = 'description' key = 'description'/>
        <ColumnGroup title = "Show Time">
            <Column title = 'Start' dataIndex = 'startTime' key = 'startTime'/>
            <Column title = 'End' dataIndex = 'endTime' key = 'endTime'/>
        </ColumnGroup> 
        <Column 
            title = 'Wheelchair Accessible'  
            dataIndex = 'wheelchairAcc'
            key = 'wheelchairAcc'
            render = {(wheelchairAcc) => {
                if (wheelchairAcc === '1') {
                    return <label>Allowed</label>
                } else {
                    return <label>Not Allowed</label>
                }
            }} />
        <Column 
            title = 'Price' 
            dataIndex = 'price' 
            key = 'price'
            render = {(price) => {
                return <label>${price}</label>
            }} />
        <Column title = 'Type' dataIndex = 'typeID' key = 'typeID'/>
    </Table>
    );
}

class AllStores extends React.Component {
    render() {
        return (
            <div>Stores</div>
        )
    }
}  

class AllAttractions extends React.Component{
    state = [
        {
            id: 1, 
            name: 'Avatar Flight',
            description: 'Climb atop a winged mountain banshee for a flight over Pandora landscape',
            status: 'open', 
            capacity: 20,
            minimumHeight: 112, 
            durationTime: 20, 
            typeID: 1, 
            locaID: 1, 
        }, {
            id: 2, 
            name: 'Avatar Flight',
            description: 'Climb atop a winged mountain banshee for a flight over Pandora landscape',
            status: 'open', 
            capacity: 20,
            minimumHeight: 112, 
            durationTime: 20, 
            typeID: 1, 
            locaID: 1, 
        }, {
            id: 3, 
            name: 'Avatar Flight',
            description: 'Climb atop a winged mountain banshee for a flight over Pandora landscape',
            status: 'open', 
            capacity: 20,
            minimumHeight: 112, 
            durationTime: 20, 
            typeID: 1, 
            locaID: 1, 
        }, {
            id: 4, 
            name: 'Avatar Flight',
            description: 'Climb atop a winged mountain banshee for a flight over Pandora landscape',
            status: 'open', 
            capacity: 20,
            minimumHeight: 112, 
            durationTime: 20, 
            typeID: 1, 
            locaID: 1, 
        }] 
    
        render() {
            return (<ShowAllAttractions dataSource = {this.state} />)
        }
} 

function ShowAllAttractions({dataSource}) {
    const columns = [
        {
            title: 'ID', 
            dataIndex: 'id', 
            key: 'id', 
        }, {
            title: 'Name', 
            dataIndex: 'name', 
            key: 'name',
        }, {
            title: 'Description', 
            dataIndex: 'description', 
            key: 'description', 
        }, {
            title: 'Status', 
            dataIndex: 'status', 
            key: 'status', 
        }, {
            title: 'Capacity', 
            dataIndex: 'capacity', 
            key: 'capacity', 
            render: (_, {capacity}) => {
                return <label>{capacity}people</label>
            }
        }, {
            title: 'Minimum Height', 
            dataIndex: 'minimumHeight', 
            key: 'minimumHeight', 
            render: (_, {minimumHeight}) => {
                return <label>{minimumHeight}cm</label>
            }
        }, {
            title: 'Duration Time', 
            dataIndex: 'durationTime', 
            key: 'durationTime', 
            render: (_, {durationTime}) => {
                return <label>{durationTime}mins</label>
            }
        }, {
            title: 'Type', 
            dataIndex: 'typeID', 
            key: 'typeID', 
        }, {
            title: 'Location', 
            dataIndex: 'locaID', 
            key: 'locaID'
        }, 
    ];
    const data = dataSource;
    
    return (<Table columns={columns} dataSource={data} />);
}

class AllOrders extends React.Component{
    state = [{
        id: 1, 
        date: '2023-04-10', 
        quantity: 1, 
        amount: 23, 
        pay_id: 1, 
        v_id: 1, 
        sh_id: null, 
        st_id: 1, 
        mi_id: 1, 
        park_id: null, 
        tkt_id: null
    }, {
        id: 2, 
        date: '2023-04-10', 
        quantity: 1, 
        amount: 32, 
        pay_id: null, 
        v_id: 1, 
        sh_id: null, 
        st_id: null, 
        mi_id: null, 
        park_id: null, 
        tkt_id: 1
    }] 

    render() {
        return (<ShowAllOrders dataSource = {this.state} />)
    }
}

function ShowAllOrders({dataSource}) {
    const columns = [
        {
            title: 'ID', 
            dataIndex: 'id', 
            key: 'id', 
        }, {
            title: 'Date', 
            dataIndex: 'date', 
            key: 'date',
        }, {
            title: 'Quantity', 
            dataIndex: 'quantity', 
            key: 'quantity', 
        }, {
            title: 'Amount', 
            dataIndex: 'amount', 
            key: 'amount', 
        }, {
            title: 'Payment ID', 
            dataIndex: 'pay_id', 
            key: 'pay_id', 
            render: (_, {pay_id}) => {
                if (pay_id === null) {
                    return <label>unpaid</label>
                } else {
                    return <label>{pay_id}</label>
                }
            }
        }, {
            title: 'Visitor ID', 
            dataIndex: 'v_id', 
            key: 'v_id', 
        }, {
            title: 'Show ID', 
            dataIndex: 'sh_id', 
            key: 'sh_id', 
            render: (_, {sh_id}) => {
                if (sh_id === null) {
                    return <label>none</label>
                } else {
                    return <label>{sh_id}</label>
                }
            }
        }, {
            title: 'Store ID', 
            dataIndex: 'st_id', 
            key: 'st_id', 
            render: (_, {st_id}) => {
                if (st_id === null) {
                    return <label>none</label>
                } else {
                    return <label>{st_id}</label>
                }
            }
        }, {
            title: 'Menu Item ID', 
            dataIndex: 'mi_id', 
            key: 'mi_id', 
            render: (_, {mi_id}) => {
                if (mi_id === null) {
                    return <label>none</label>
                } else {
                    return <label>{mi_id}</label>
                }
            }
        }, {
            title: 'Parking ID', 
            dataIndex: 'park_id', 
            key: 'park_id', 
            render: (_, {park_id}) => {
                if (park_id === null) {
                    return <label>none</label>
                } else {
                    return <label>{park_id}</label>
                }
            }
        }, {
            title: 'Ticket ID', 
            dataIndex: 'tkt_id', 
            key: 'tkt_id', 
            render: (_, {tkt_id}) => {
                if (tkt_id === null) {
                    return <label>none</label>
                } else {
                    return <label>{tkt_id}</label>
                }
            }
        },  
    ];
    const data = dataSource;
    
    return (<Table columns={columns} dataSource={data} />);
}
