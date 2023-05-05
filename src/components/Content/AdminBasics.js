import React  from 'react';
import { useState, useEffect } from 'react'; 
import { Tag, Table } from 'antd'; 

import styled from 'styled-components'; 
import './Admin.css'; 

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
                <AllShows />
            )}
            {activeTab === 'All Attractions' && (
                <AllAttractions />
            )}
            {activeTab === 'All Stores' && (
                <AllStores />
            )}
            {activeTab === 'All Parkings' && (
                <AllParkings />
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
                if (type === 'M') {
                    return (
                    <Tag color = 'volcano'>
                        {'Member'}
                    </Tag>)
                } else if (type === 'S') {
                    return (
                    <Tag color = 'purple'>
                        {'Student'}
                    </Tag>)
                } else if (type === 'G') {
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

function AllTickets() { 
    const [typeData, setTypeData] = useState([]);
    const [ticketData, setTicketData] = useState([]); 

    useEffect(() => {
        fetch('http://localhost:8080/ticket/listtkttype') 
        .then((response) => response.json()) 
        .then((data) => {
            setTypeData(data.data); 
        })
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/ticket/list') 
        .then((response) => response.json()) 
        .then((data) => {
            setTicketData(data.data); 
        })
    }, []); 

        
    return (<ShowAllTickets typeData={typeData} ticketData={ticketData}/>)
}

function ShowAllTickets ({typeData, ticketData}) { 
    function getType(tkttype_id) {
        for (let i = 0; i < typeData.length; i++) {
            if (typeData[i].tkttype_id === tkttype_id) {
                return typeData[i].tkttype_name; 
            }
        }
        return ''; 
    }

    const columns = [
        {
            title: 'ID', 
            dataIndex: 'tkt_id', 
            key: 'tkt_id', 
        }, {
            title: 'Type', 
            dataIndex: 'tkttype_id', 
            key: 'tkttype_id', 
            render: (_, {tkttype_id}) => {
                return <label>{getType(tkttype_id)}</label>
            }
        }, {
            title: 'Method', 
            dataIndex: 'tkt_online', 
            key: 'tkt_online', 
            render: (_, {tkt_online}) => {
                if (tkt_online === '1.0') {
                    return <label>online</label>
                } else {
                    return <label>onsite</label>
                }
            }
        }, {
            title: 'Visit Date', 
            dataIndex: 'tkt_visit_date', 
            key: 'tkt_visit_date', 
            render: (_, {tkt_visit_date}) => {
                return <label>{tkt_visit_date.substring(0, 10)}</label>
            }
        }, {
            title: 'Price', 
            dataIndex: 'tkt_price', 
            key: 'tkt_price', 
            render: (_, {tkt_price}) => {
                return <label>${tkt_price}</label>
            }
        }, {
            title: 'Discount', 
            dataIndex: 'tkt_discount', 
            key: 'tkt_discount', 
            render: (_, {tkt_discount}) => {
                return <label>{tkt_discount}%</label>
            }
        }, 
    ];
    
    return (<Table columns={columns} dataSource={ticketData} />);
}

function AllShows() { 
    const [typeData, setTypeData] = useState([]); 
    const [showData, setShowData] = useState([]); 
    
    useEffect(() => {
        fetch('http://localhost:8080/show/listshtype') 
        .then((response) => response.json()) 
        .then((data) => {
            setTypeData(data.data); 
        })
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/show/list') 
        .then((response) => response.json()) 
        .then((data) => {
            setShowData(data.data); 
        })
    }, []);
        
    return (<ShowAllShows typeData={typeData} showData={showData}/>)
        
}

function ShowAllShows ({ typeData, showData }) {
    function getType(shtype_id) { 
        for (let i = 0; i < typeData.length; i++) {
            if (typeData[i].shtype_id === shtype_id) {
                return typeData[i].shtype_name; 
            }
        }
        return ''; 
    }

    const columns = [
        {
            title: 'ID', 
            dataIndex: 'sh_id', 
            key: 'sh_id', 
        }, {
            title: 'Name', 
            dataIndex: 'sh_name', 
            key: 'sh_name', 
        }, {
            title: 'Type', 
            dataIndex: 'shtype_id', 
            key: 'shtype_id', 
            render: (_, {shtype_id}) => {
                return <label>{getType(shtype_id)}</label>
            }
        }, {
            title: 'Description', 
            dataIndex: 'sh_description', 
            key: 'sh_description', 
        }, {
            title: 'Start Time', 
            dataIndex: 'sh_start_time', 
            key: 'sh_start_time', 
            render: (_, {sh_start_time}) => {
                return <label>{sh_start_time.substring(11, 19)}</label>
            }
        }, {
            title: 'End Time', 
            dataIndex: 'sh_end_time', 
            key: 'sh_end_time', 
            render: (_, {sh_end_time}) => {
                return <label>{sh_end_time.substring(11, 19)}</label>
            }
        }, {
            title: 'Wheelchair Accessible', 
            dataIndex: 'sh_wheelchair_acc', 
            key: 'sh_wheelchair_acc', 
            render: (_, {sh_wheelchair_acc}) => { 
                if (sh_wheelchair_acc === '1.0') {
                    return <label>Allowed</label>
                } else {
                    return <label>Not Allowed</label>
                }
            }
        }, {
            title: 'Price', 
            dataIndex: 'sh_price', 
            key: 'sh_price', 
            render: (_, {sh_price}) => {
                return <label>$ {sh_price}</label>
            }
        }, 
    ];
    
    return (<Table columns={columns} dataSource={showData} />);
}

function AllAttractions() { 
    const [typeData, setTypeData] = useState([]); 
    const [location, setLocation] = useState([]);
    const [attraction, setAttraction] = useState([]); 

    useEffect(() => {
        fetch('http://localhost:8080/attraction/listatttype') 
        .then((response) => response.json()) 
        .then((data) => {
            setTypeData(data.data); 
        })
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/attraction/listls') 
        .then((response) => response.json()) 
        .then((data) => {
            setLocation(data.data); 
        })
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/attraction/list') 
        .then((response) => response.json()) 
        .then((data) => {
            setAttraction(data.data); 
        })
    }, []);
        
    return (<ShowAllAttractions typeData={typeData} location={location} attraction={attraction}/>)
        
} 

function ShowAllAttractions({typeData, location, attraction}) { 
    function getType(atttype_id) { 
        for (let i = 0; i < typeData.length; i++) {
            if (typeData[i].atttype_id === atttype_id) {
                return typeData[i].atttype_name; 
            }
        }
        return ''; 
    }

    function getLocation(ls_id) { 
        for (let i = 0; i < location.length; i++) {
            if (location[i].ls_id === ls_id) {
                return location[i].ls_name; 
            }
        }
        return ''; 
    }

    const columns = [
        {
            title: 'ID', 
            dataIndex: 'att_id', 
            key: 'att_id', 
        }, {
            title: 'Name', 
            dataIndex: 'att_name', 
            key: 'att_name', 
        }, {
            title: 'Type', 
            dataIndex: 'atttype_id', 
            key: 'atttype_id', 
            render: (_, {atttype_id}) => {
                return <label>{getType(atttype_id)}</label>
            }
        }, {
            title: 'Description', 
            dataIndex: 'att_description', 
            key: 'att_description', 
        }, {
            title: 'Status', 
            dataIndex: 'att_status', 
            key: 'att_status', 
        }, {
            title: 'Capacity', 
            dataIndex: 'att_capacity', 
            key: 'att_capacity', 
            render: (_, {att_capacity}) => {
                return <label>{att_capacity} people</label>
            }
        }, {
            title: 'Minimum Height', 
            dataIndex: 'att_minimum_height', 
            key: 'att_minimum_height', 
            render: (_, {att_minimum_height}) => {
                return <label>{att_minimum_height} cm</label>
            }
        }, {
            title: 'Duration Time', 
            dataIndex: 'att_duration_time', 
            key: 'att_duration_time', 
            render: (_, {att_duration_time}) => {
                return <label>{att_duration_time} mins</label>
            }
        }, {
            title: 'Location Section', 
            dataIndex: 'ls_id', 
            key: 'ls_id', 
            render: (_, {ls_id}) => {
                return <label>{getLocation(ls_id)}</label>
            }
        }, 
    ];
    
    return (<Table columns={columns} dataSource={attraction} />);
}

function AllStores() {
    const [category, setCategory] = useState([]); 
    const [storeData, setStoreData] = useState([]); 

    useEffect(() => {
        fetch('http://localhost:8080/store/listctg') 
        .then((response) => response.json()) 
        .then((data) => {
            setCategory(data.data); 
        })
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/store/list') 
        .then((response) => response.json()) 
        .then((data) => {
            setStoreData(data.data); 
        })
    }, []);

    return (<ShowAllStores category={category} storeData={storeData}/>)
}  

function ShowAllStores({category, storeData}) { 
    function getCategory(ctg_id) {
        for (let i = 0; i < category.length; i++) {
            if (category[i].ctg_id === ctg_id) {
                return category[i].ctg_name; 
            }
        }
        return ''; 
    }

    const columns = [
        {
            title: 'ID', 
            dataIndex: 'st_id', 
            key: 'st_id', 
        }, {
            title: 'Name', 
            dataIndex: 'st_name', 
            key: 'st_name', 
        }, {
            title: 'Category', 
            dataIndex: 'ctg_id', 
            key: 'ctg_id', 
            render: (_, {ctg_id}) => {
                return <label>{getCategory(ctg_id)}</label>
            }
        }, {
            title: 'Description', 
            dataIndex: 'st_description', 
            key: 'st_description', 
        }, {
            title: 'Menu Items', 
            dataIndex: 'st_id', 
            key: 'st_id', 
            render: (_, {st_id}) => {
                return <GetMenu st_id={st_id} />
            }
        },  
    ];

    return (<Table columns={columns} dataSource={storeData} />);
} 

function GetMenu({st_id}) {
    const [menuItems, setMenuItems] = useState([]); 
    useEffect(() => {
        fetch(`http://localhost:8080/store/getmi?stId=${st_id}`) 
        .then((response) => response.json()) 
        .then((data) => { 
            setMenuItems(data.data); 
            console.log("menu items: " + menuItems); 
        })
    }, []); 

    return (
        <ul>
            {
                menuItems.map((item, index) => (
                    <li>{item.mi_name}: $ {item.mi_unit_price}</li>
                ))
            }
        </ul>
    );
}

function AllParkings() {
    const [parkLot, setParkLot] = useState([]); 
    const [parking, setParking] = useState([]); 

    useEffect(() => {
        fetch('http://localhost:8080/parking/listpl') 
        .then((response) => response.json()) 
        .then((data) => {
            setParkLot(data.data); 
        })
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/parking/list') 
        .then((response) => response.json()) 
        .then((data) => {
            setParking(data.data); 
        })
    }, []);

    return (<ShowAllParkings parkLot = {parkLot} parking = {parking} />)
    
}  

function ShowAllParkings({parkLot, parking}) {
     function getParkLot(pl_id) {
        for (let i = 0; i < parkLot.length; i++) {
            if (parkLot[i].pl_id === pl_id) {
                return parkLot[i].pl_name; 
            }
        }
        return ''; 
    }

    const columns = [
        {
            title: 'ID', 
            dataIndex: 'park_id', 
            key: 'park_id', 
        }, {
            title: 'Time in', 
            dataIndex: 'park_time_in', 
            key: 'park_time_in', 
        }, {
            title: 'Time out', 
            dataIndex: 'park_time_out', 
            key: 'park_time_out', 
        }, {
            title: 'Fee per Hour', 
            dataIndex: 'park_fee', 
            key: 'park_fee', 
            render: (_, {park_fee}) => {
                return <label>$ {park_fee}</label>
            }
        }, {
            title: 'Spot Number', 
            dataIndex: 'park_spotno', 
            key: 'park_spotno', 
        }, {
            title: 'Parking Lot', 
            dataIndex: 'pl_id', 
            key: 'pl_id', 
            render: (_, {pl_id}) => {
                return <label>{getParkLot(pl_id)}</label>
            }
        },   
    ];

    return (<Table columns={columns} dataSource={parking} />);
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
