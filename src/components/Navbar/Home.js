import React, { useEffect } from 'react'; 
import axios from 'axios'; 

axios.defaults.withCredentials = true; 

const headers = { 'Content-Type': 'application/json', credentials: 'include'}
const body = JSON.stringify({
    "accEmail": "yz@gmail.com",
    "accPwd": "jzn1014",
})

const Home = () => { 
    useEffect(() => {
        axios.post('http://localhost:8080/account/login', body, {headers})
        .then((response) => response.data) 
        .then((data) => {
            console.log("login: " + data.message); 
        })
    }, [])
    
    return (
        <div style={{height:'100vh',width:'100%',backgroundColor:'pink'}}>
                Home
        </div>
    );
};

export default Home;