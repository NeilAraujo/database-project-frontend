import React, { useState } from 'react';
import './CustLogin.css'

const CustLogin = () => {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');

    return (
        <div style={{
            display: 'flex',
            height:'50vh',
            width: '50vh',
            flexDirection: 'column',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            borderRadius: 20
        }}>
            <div style={{fontSize:20,color:'black',fontFamily:'sans-serif',fontWeight:'bold',marginBottom:20}}>Login</div>

            <div style={{fontSize:20,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:40,marginBottom:10}}>Email</div>
            <input
                style={{width:'80%',height:30,marginBottom:20,borderRadius:6}}
                value={email} // ...force the input's value to match the state variable...
                onChange={e => onChangeEmail(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter Email'
                />

            <div style={{fontSize:20,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:40,marginBottom:10}}>Password</div>
            <input
                style={{width:'80%',height:30,marginBottom:20,borderRadius:6}}
                value={password} // ...force the input's value to match the state variable...
                onChange={e => onChangePassword(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter Password'
                type="password"
                />

            <button onClick={()=>console.log("Pressed")} style={{width:'30%',height:40,borderRadius:20,backgroundColor:'black',color:'white',fontFamily:16,marginTop:15}}>Login</button>

            <div style={{fontSize:12,color:'black',fontFamily:'sans-serif',fontWeight:'initial',marginTop:10}}>
                Don't have an Account?<div style={{textDecoration:'underline'}} onClick={()=>{}}>Sign Up</div>
            </div>

            <div style={{fontSize:12,color:'black',fontFamily:'sans-serif',fontWeight:'initial',marginTop:10}}>
                Employee Login<div style={{textDecoration:'underline'}} onClick={()=>{}}>Login</div>
            </div>
        </div>
    );
};

export default CustLogin;