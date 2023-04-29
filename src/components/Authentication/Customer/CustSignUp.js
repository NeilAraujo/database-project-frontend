import React,{useState} from 'react';

const CustSignUp = () => {
    const [email, onChangeEmail] = useState('');
    const [fname, onChangeFname] = useState('');
    const [mname, onChangeMname] = useState('');
    const [lname, onChangeLname] = useState('');
    const [staddr, onChangeSttName] = useState('');
    const [city, onChangeCity] = useState('');
    const [state, onChangeState] = useState('');
    const [country, onChangeCountry] = useState(''); 
    const [phno, onChangePhNo] = useState('');
    const [bday, onChangebday] = useState('');
    const [password, onChangePassword] = useState('');
    const [password2, onChangePassword2] = useState('');

    return (
        <div style={{
            display: 'flex',
            height:'90vh',
            width: '50vh',
            flexDirection: 'column',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            borderRadius: 20
        }}>
            <div style={{fontSize:20,color:'black',fontFamily:'sans-serif',fontWeight:'bold',marginBottom:20}}>SignUp</div>

            <div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:40,marginBottom:5}}>First Name</div>
            <input
                style={{width:'80%',height:30,marginBottom:5,borderRadius:6}}
                value={fname} // ...force the input's value to match the state variable...
                onChange={e => onChangeFname(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter First Name'
                />

            <div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:40,marginBottom:5}}>Middle Name</div>
            <input
                style={{width:'80%',height:30,marginBottom:5,borderRadius:6}}
                value={mname} // ...force the input's value to match the state variable...
                onChange={e => onChangeMname(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter Middle Name'
                />

            <div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:40,marginBottom:5}}>Last Name</div>
            <input
                style={{width:'80%',height:30,marginBottom:5,borderRadius:6}}
                value={lname} // ...force the input's value to match the state variable...
                onChange={e => onChangeLname(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter Last Name'
                />

            <div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:40,marginBottom:5}}>Street Address</div>
            <input
                style={{width:'80%',height:30,marginBottom:5,borderRadius:6}}
                value={staddr} // ...force the input's value to match the state variable...
                onChange={e => onChangeSttName(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter Street Address'
                />

<div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:40,marginBottom:5}}>City</div>
            <input
                style={{width:'80%',height:30,marginBottom:5,borderRadius:6}}
                value={city} // ...force the input's value to match the state variable...
                onChange={e => onChangeCity(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter City'
                />

<div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:40,marginBottom:5}}>State</div>
            <input
                style={{width:'80%',height:30,marginBottom:5,borderRadius:6}}
                value={state} // ...force the input's value to match the state variable...
                onChange={e => onChangeState(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter State'
                />

<div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:40,marginBottom:5}}>Country</div>
            <input
                style={{width:'80%',height:30,marginBottom:5,borderRadius:6}}
                value={country} // ...force the input's value to match the state variable...
                onChange={e => onChangeCountry(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter Country'
                />

<div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:40,marginBottom:5}}>Phone Number</div>
            <input
                style={{width:'80%',height:30,marginBottom:5,borderRadius:6}}
                value={phno} // ...force the input's value to match the state variable...
                onChange={e => onChangePhNo(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter Phone Number'
                type='number'
                />

            <div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:40,marginBottom:5}}>Date of Birth</div>
            <input
                style={{width:'80%',height:30,marginBottom:5,borderRadius:6}}
                value={bday} // ...force the input's value to match the state variable...
                onChange={e => onChangebday(e.target.value)} // ... and update the state variable on any edits!
                placeholder='MM-DD-YYYY'
                type='date'
                />

        <div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:40,marginBottom:5}}>Email</div>
            <input
                style={{width:'80%',height:30,marginBottom:5,borderRadius:6}}
                value={email} // ...force the input's value to match the state variable...
                onChange={e => onChangeEmail(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter Email'
                type='email'
                />

            <div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:40,marginBottom:5}}>Password</div>
            <input
                style={{width:'80%',height:30,marginBottom:5,borderRadius:6}}
                value={password} // ...force the input's value to match the state variable...
                onChange={e => onChangePassword(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter Password'
                type="password"
                />

            <div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:40,marginBottom:5}}>Re-Enter Password</div>
            <input
                style={{width:'80%',height:30,marginBottom:20,borderRadius:6}}
                value={password2} // ...force the input's value to match the state variable...
                onChange={e => onChangePassword2(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Re-Enter Password'
                type="password"
                />

            <button onClick={()=>console.log("Pressed")} style={{width:'30%',height:40,borderRadius:20,backgroundColor:'black',color:'white',fontFamily:16,marginTop:15}}>SignUp</button>

            <div style={{fontSize:12,color:'black',fontFamily:'sans-serif',fontWeight:'initial',marginTop:10}}>
                Have an Account?<div style={{textDecoration:'underline'}} onClick={()=>{}}>Login</div>
            </div>

            <div style={{fontSize:12,color:'black',fontFamily:'sans-serif',fontWeight:'initial',marginTop:5,marginBottom:5}}>
                Employee Login<div style={{textDecoration:'underline'}} onClick={()=>{}}>Login</div>
            </div>
        </div>
    );
};

export default CustSignUp;