import React  from 'react';
import { Link } from 'react-router-dom'; 
import { DatePicker } from 'antd';
import { Radio } from 'antd';
import { Button, message, Steps, theme, Result } from 'antd';
import { Input } from 'antd'; 
import { DeleteOutlined } from '@ant-design/icons'; 
import { Alert } from 'antd';
import { Home } from '../Navbar/Home'; 
import './BookTickets.css'; 

const steps = ['Book a ticket', 'Make a payment', 'Done!']

export class BookDisplay extends React.Component { 
    constructor() {
        super(); 
        this.state = {
            stepIndex: 0,
            visitDate: null,
            visitDateStr: '',
            count: 0, 
            alertMessage: '', 
            showAlert: false,
            showPayment: false,
            otherAccount: '', 
            addedAccount: [], 
            ticketPrice: 100, 
            cardName: '', 
            cardNumber: '', 
            exDate: null, 
            exDateStr: '',
            cvv: '', 
            credit: true,
        }; 
        this.handleCountChange = this.handleCountChange.bind(this);
        this.handleAccountChange = this.handleAccountChange.bind(this);
        this.handleAddAccount = this.handleAddAccount.bind(this); 
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleVisitDate = this.handleVisitDate.bind(this);
        this.handlePay = this.handlePay.bind(this); 
        this.handleCardName = this.handleCardName.bind(this);
        this.handleCardNumber = this.handleCardNumber.bind(this); 
        this.handleExDate = this.handleExDate.bind(this);
        this.handleCvv = this.handleCvv.bind(this);
    } 

    //step 1
    handleVisitDate = (date, dateString) => { 
        this.setState ({
            visitDate: date,
            visitDateStr: dateString
        })
    }

    handleCountChange(e) {
        this.setState ({
            count: e.target.value
        })
    } 
    handleAccountChange (e) {
        this.setState ({
            otherAccount: e.target.value.trim()
        })
    }
    handleAddAccount() { 
        if (this.state.otherAccount === '') {
            return; 
        }
        let include = this.state.addedAccount.includes(this.state.otherAccount)
        if (include) {
            //console.log("redundancy");
            return; 
        }
        //verify the added account here: add only if the account exists
        /**/ 
        
        const newAddedAccount = (this.state.addedAccount === null) ? [this.state.otherAccount] : [].concat(this.state.addedAccount, this.state.otherAccount);
        //console.log("current added accounts: " + newAddedAccount + newAddedAccount.length);
        this.setState ({
            addedAccount: newAddedAccount
        })
    }

    handleDeleteAccount(value) {
        let afterDelete = this.state.addedAccount.slice(); 
        for (let i = 0; i < afterDelete.length; i++) {
            if (afterDelete[i] === value) {
                afterDelete.splice(i, 1); 
            }
        }
        this.setState ({
            addedAccount: afterDelete
        })
    }

    handleSubmit() {
        /* post data to backend ==> add ticket by account ==> unpaid*/ 
        const val1 = this.state.count;
        const val2 = (this.state.addedAccount === null) ? 0 : this.state.addedAccount.length;
        const now = new Date();
        if (this.state.visitDate == null || this.state.visitDate < now) {
            this.setState ({
                alertMessage: "You should select a visit date from now on.", 
                showAlert: true
            }) 
        } else if (val1 == 0 && val2 == 0) { 
            this.setState ({
                alertMessage: "You should select at least one ticket.", 
                showAlert: true
            })
        } else if (val1 != val2) {
            //not match
            this.setState ({
                alertMessage: "You should add equivalent amount of accounts.", 
                showAlert: true
            })
        } else {
            //transfer data
            this.setState ({
                showAlert: false
            })
            console.log('match');
            this.setState ({
                stepIndex: 1
            }) 
            console.log("added accounts: " + this.state.addedAccount)
        }
    }  

    //step 2
    handleCardName(e) {
        this.setState ({
            cardName: e.target.value.trim()
        })
    } 

    handleCardNumber(e) {
        this.setState ({
            cardNumber: e.target.value.trim()
        })
    }

    handleExDate = (date, dateString) => {
        this.setState ({
            exDate: date,
            exDateStr: dateString
        }) 
    } 

    handleCvv(e) {
        this.setState ({
            cvv: e.target.value.trim()
        })
    }

    handlePay() { 
        const now = new Date(); 
        if (this.state.cardName === '' || this.state.cardNumber === '' || this.state.cvv === '') {
            this.setState ({
                alertMessage: "The card is invalid. Please check the card information.", 
                showAlert: true
            })
        } else if (this.state.exDate === null || this.state.exDate <= now) {
            this.setState ({
                alertMessage: "The card is expired. Please check the card information.", 
                showAlert: true
            })
        } else {
            this.setState ({
                stepIndex: 2
            })
        }
    }  

    render() { 
        const items = steps.map((item) => ({
            key: item.title,
            title: item.title,
        }));
        
        return (
            <div className='subbody'> 
                <Steps current={this.state.stepIndex} items={items} 
                    style = {{marginTop: 20}}/>
                {this.state.stepIndex == 0 && (
                <div className='bookBox'>
                    <label style = {{color: '#0367D9', fontSize: 24, fontStyle: 'bold', marginTop: 20}}>
                        Welcome to Wonderful Land!
                    </label>
                    <div style = {{display: 'flex', flexDirection: 'row'}}>
                        <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
                            <div>
                                <label> 
                                    Which day would you like to visit? 
                                </label>
                            </div>
                            <DatePicker 
                                format='YYYY-MM-DD' 
                                onChange={this.handleVisitDate}/> 
                            {
                                (this.state.showAlert) ? (
                                    <Alert
                                        message="Error"
                                        description={this.state.alertMessage}
                                        type="error"
                                        showIcon 
                                        style = {{width: 220, marginTop: 20}}
                                    />
                                ) : null
                            }
                        </div> 
                        <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 120}}>
                            <div style = {{marginTop: 30}}>
                                <label> Select the number of tickets: </label>
                            </div>
                            <Radio.Group onChange={this.handleCountChange}>
                                <Radio value={1}>1</Radio>
                                <Radio value={2}>2</Radio>
                                <Radio value={3}>3</Radio>
                                <Radio value={4}>4</Radio>
                                <Radio value={5}>5</Radio>
                            </Radio.Group>
                            <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
                                <div>
                                    <Input placeholder="other account" onChange = {this.handleAccountChange} style = {{width: 200}}/>
                                    <Button onClick = {this.handleAddAccount} style = {{marginLeft: 10}}>Add</Button> 
                                    <ul>
                                        {
                                            this.state.addedAccount.map(( account, index ) => (
                                                <div style = {{display: 'flex', flexDirection: 'row', alignItems:'center'}}>
                                                    <div key = {index} style = {{backgroundColor: '#F3F4F5', borderRadius: 5, width: 200, padding: 2, marginTop: 5}}>
                                                        {account} 
                                                    </div>
                                                    <DeleteOutlined onClick = {() => this.handleDeleteAccount(account)}/>
                                                </div>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <Button onClick = {this.handleSubmit}>Submit</Button> 
                            </div>
                        </div>
                    </div>
                    
                </div>)}

                {this.state.stepIndex == 1 && (
                    <div className='bookBox'> 
                        <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <label style = {{marginTop: 20, fontSize: 20, fontStyle: 'bold'}}>Book Summary</label> 
                            <div className='paySummary'>
                                <label style = {{marginLeft: 30, marginTop: 10}}>Ticket Price: {this.state.ticketPrice}</label>
                                <label style = {{marginLeft: 30, marginTop: 10}}>Ticket Quantity: {this.state.count}</label>
                                <label style = {{marginLeft: 30, marginTop: 10}}>For accounts: </label> 
                                {
                                    this.state.addedAccount.map((account, index) => {
                                        return <li key = {index} style = {{marginLeft: 40, marginTop: 8}}>{account}</li>
                                    })
                                }
                                <label style = {{marginLeft: 30, marginTop: 10}}>Total Amount: </label> 
                                 
                            </div>
                            <div className='addCard'>
                                <div>
                                    <label>Card Name: </label>
                                    <Input placeholder="card name" onChange = {this.handleCardName} style = {{width: 200}}/>
                                </div>
                                <div>
                                    <label style = {{marginTop: 10}}>Card Number: </label> 
                                    <Input placeholder="card number" onChange = {this.handleCardNumber} style = {{width: 200}}/>
                                </div>
                                <div>
                                    <label style = {{marginTop: 10}}>CVV: </label>
                                    <Input placeholder="security code" onChange = {this.handleCvv} style = {{width: 200}}/>
                                </div>
                                <div>
                                    <label style = {{marginTop: 10}}>Expiration Date: </label>
                                    <DatePicker 
                                        format='YYYY-MM-DD' 
                                        onChange={this.handleExDate}/> 
                                </div> 


                            </div>
                        </div>
                        <Button onClick = {this.handlePay} style = {{marginTop: 30}}>Pay</Button> 
                        {
                            (this.state.showAlert) ? (
                                <Alert
                                    message="Error"
                                    description={this.state.alertMessage}
                                    type="error"
                                    showIcon 
                                    style = {{width: 250, marginTop: 20}}
                                />
                            ) : null
                        }
                    </div>)}
                
                {this.state.stepIndex == 2 && (
                    <div className='bookBox'>
                        <Result
                            status="success"
                            title="Successfully Purchased Ticket(s)!"
                            extra={[
                                <Link to = '/Home'>
                                    <Button>
                                        Go to Home
                                    </Button>
                                </Link>
                            ]}
                        />
                    </div>)}

            </div>
        )
    }
    
}

