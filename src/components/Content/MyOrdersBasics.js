import React from 'react'; 
import { Link } from 'react-router-dom'; 
import { useState} from 'react'; 
import { Button } from 'antd';
import './MyOrders.css';

export class OrderDisplay extends React.Component { 
    state = [{
        id: 1, 
        date: '2023-04-10', 
        quantity: 1, 
        amount: 23, 
        pay_id: 1, 
        pay_card: '6444',
        v_id: 1, 
        v_name: 'Elsa', 
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
        pay_card: null,
        v_id: 1, 
        v_name: 'Elsa', 
        sh_id: null, 
        st_id: null, 
        mi_id: null, 
        park_id: null, 
        tkt_id: 1
    }] 

    render() {
        return <Order stateData={this.state} ></Order>
    }
} 

const allOptions = [{id: 0, type: 'All'}, {id: 1, type: 'Ticket'}, {id: 2, type: 'Store'}, 
    {id: 3, type: 'Show'}, {id: 5, type: 'Parking'}]; 

function Order({stateData}) {
    const [selectedOption, setSelectedOption] = useState(0); 
    
    function handleChange(e) {
        setSelectedOption(e.target.value); 
    }

    return (
        <div>
            <div>
                <label>Choose order type: </label> 
                <select name = 'selectedOption' defaultValue = 'All' onChange = {handleChange}> {
                    allOptions.map( option => (
                        <option key = {option.id} value = {option.id}> {option.type} </option>))
                }
                </select>
            </div>
            <div>
            {
                stateData.map( order => {
                    let typeid = 0;
                    if (order.tkt_id !== null) {
                        typeid = 1; 
                    } else if (order.st_id !== null) {
                        typeid = 2;
                    } else if (order.sh_id !== null) {
                        typeid = 3;
                    } else if (order.park_id !== null) {
                        typeid = 4;
                    }
                    let payment = '';
                    if (order.pay_id === null) {
                        payment = 'unpaid'; 
                    } else {
                        payment = '****' + order.pay_card;
                    }
                    if (selectedOption == 0 || selectedOption == typeid) {
                        return (
                            <div className='orderContainer'>
                                <div className='orderContainer1'> 
                                    <div>
                                        <label style ={{color: '#868989', fontSize: 14, marginLeft: 20}}>Order placed on</label> 
                                        <label style ={{color: '#7A7D7D', fontSize: 16, marginLeft: 20}}>{order.date}</label>
                                    </div> 
                                    <div style={{position: 'absolute', right: 20}}> 
                                        <label style ={{color: '#868989', fontSize: 14, marginLeft: 20}}>Order #{order.id}</label> 
                                    </div>
                                </div>
                                <div className='orderContainer2'> 
                                    <div>
                                        <img className='orderImage' src = {require(`./images/order/${typeid}.jpg`)}></img>
                                    </div>
                                    <div style=
                                        {{display: 'flex', flexDirection: 'column', marginLeft: 40, alignItems: 'center'}}>
                                        <label style={{marginTop: 5, fontSize: 22}}>{allOptions[typeid].type} Order</label>
                                        <label style={{marginTop: 20, marginBottom: 10, fontSize: 16}}>Here is a long description for the ordered item</label>
                                        <ViewDetail index = {typeid}/>
                                    </div>
                                    <div style=
                                        {{display: 'flex', flexDirection: 'column', paddingLeft: 10, alignItems: 'left', position: 'absolute', right: 10, borderLeft: 'dashed'}}>
                                        <label style={{fontSize: 16}}>Order Summary: </label>
                                        <label style={{fontSize: 14}}>Quantity: {order.quantity}</label>
                                        <label style={{fontSize: 14}}>Total: ${order.amount}</label>
                                        <label style={{fontSize: 14}}>Payment: {payment}</label>
                                    </div>
                                </div>
                                <div className='orderContainer3'>

                                </div>
                            </div>
                        );
                    } else {
                        return null;
                    }
                })
            }
            </div>
        </div>
    )
}

function ViewDetail({index}) { 
    console.log("index: " + index)
    if (index === 1) {
        return (<Link to = '/BookTickets'>
            <Button>Buy Again</Button>
        </Link>)
    } else if (index === 2) {
        return (<Link to = '/Stores'>
            <Button>View More Details</Button>
        </Link>)
    } else if (index === 3) {
        return (<Link to = '/Shows'>
            <Button>View More Details</Button>
        </Link>)
    } else {
        return (<Link to = '/Attractions'>
        <Button>View More Details</Button>
    </Link>)
    }
}