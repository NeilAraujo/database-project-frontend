import React from 'react'; 
import { Link } from 'react-router-dom'; 
import { useState, useEffect } from 'react'; 
import { Button } from 'antd';
import './MyOrders.css';

export function OrderDisplay() { 
    const [orderData, setOrderData] = useState([]); 
    
    useEffect(() => {
        fetch('http://localhost:8080/order/visitlist') 
        .then((response) => response.json()) 
        .then((data) => {
            setOrderData(data.data); 
        })
    }, [])
    
    return <Order orderData={orderData} />
    
} 

const allOptions = [{id: 0, type: 'All'}, {id: 1, type: 'Ticket'}, {id: 2, type: 'Store'}, 
    {id: 3, type: 'Show'}, {id: 4, type: 'Parking'}]; 

function Order({orderData}) {
    const [selectedOption, setSelectedOption] = useState(0); 
    
    function handleChange(e) {
        setSelectedOption(e.target.value); 
    }

    return (
        <div>
            <div style = {{marginTop: 30, marginBottom: 20}}>
                <label style = {{fontSize: 20, color: '#263956', fontWeight: 'bold'}}>Choose order type: </label> 
                <select name = 'selectedOption' defaultValue = 'All' onChange = {handleChange} style = {{fontSize: 20}}> {
                    allOptions.map( option => (
                        <option key = {option.id} value = {option.id}> {option.type} </option>))
                }
                </select>
            </div>
            <div>
            {
                orderData.map( order => {
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
                
                    if (selectedOption == 0 || selectedOption == typeid) {
                        return (
                            <div className='orderContainer'>
                                <div className='orderContainer1'> 
                                    <div>
                                        <label style ={{color: '#868989', fontSize: 14, marginLeft: 20}}>Order placed on</label> 
                                        <label style ={{color: '#7A7D7D', fontSize: 16, marginLeft: 20}}>{order.o_date}</label>
                                    </div> 
                                    <div style={{position: 'absolute', right: 20}}> 
                                        <label style ={{color: '#868989', fontSize: 14, marginLeft: 20}}>Order #{order.o_id}</label> 
                                    </div>
                                </div>
                                <div className='orderContainer2'> 
                                    <div>
                                        <img className='orderImage' src = {require(`./images/order/${typeid}.jpg`)}></img>
                                    </div>
                                    <div style=
                                        {{display: 'flex', flexDirection: 'column', marginLeft: 40, alignItems: 'center'}}>
                                        <label style={{marginTop: 5, fontSize: 22, color: '#1C468E', fontWeight: 'bold'}}>{allOptions[typeid].type} Order</label>
                                        <label style={{marginTop: 20, marginBottom: 10, fontSize: 16}}>Here is a long description for the ordered item</label>
                                        <ViewDetail index = {typeid}/>
                                    </div>
                                    <div style=
                                        {{display: 'flex', flexDirection: 'column', paddingLeft: 10, alignItems: 'left', position: 'absolute', right: 10, borderLeft: 'dashed'}}>
                                        <label style={{fontSize: 16}}>Order Summary: </label>
                                        <label style={{fontSize: 14}}>Quantity: {order.o_quantity}</label>
                                        <label style={{fontSize: 14}}>Total: $ {order.o_amount}</label>
                                        <GetPayment o_id = {order.o_id} />
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

function GetPayment({o_id}) {
    const [payment, setPayment] = useState([]); 
    useEffect(() => {
        fetch(`http://localhost:8080/payment/getbyorder?oId=${o_id}`) 
        .then((response) => response.json()) 
        .then((data) => {
            setPayment(data.data); 
        })
    } ,[]); 
    if (payment.length === 0) {
        return <label style={{fontSize: 14}}>Payment: Unpaid</label>
    } else if (payment[0].pay_method === 'CA') {
        return <label style={{fontSize: 14}}>Payment: Cash</label>
    } else {
        return <label style={{fontSize: 14}}>Payment: Card</label>
    }
}

function ViewDetail({index}) { 
    if (index === 1) {
        return (<Link to = '/book'>
            <Button>Buy Again</Button>
        </Link>)
    } else if (index === 2) {
        return (<Link to = '/stores'>
            <Button>View More Details</Button>
        </Link>)
    } else if (index === 3) {
        return (<Link to = '/shows'>
            <Button>View More Details</Button>
        </Link>)
    } else {
        return (<div></div>)
    }
}
