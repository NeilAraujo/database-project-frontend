import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [profile,setProfile] = useState();

    useEffect(()=>{
        fetch('http://localhost:8080/account/profile')
        .then(response=>response.json())
        .then(data=> {
            setProfile(data.data.vtype) 
            console.log(data.data)
        })
    },[])

    return (
        <div style={{display: 'flex',
        height:'100%',
        width: '100%',
        flexDirection: 'column', 
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        marginTop:20}}>
            <div style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>
                <div style={{fontSize:23,color:'black',fontFamily:'sans-serif',fontWeight:'initial'}}>Email:</div>
                <div style={{fontSize:23,color:'grey',fontFamily:'sans-serif',fontWeight:'initial', marginLeft:10}}>Email</div>
            </div>

            <div style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>
                <div style={{fontSize:23,color:'black',fontFamily:'sans-serif',fontWeight:'initial'}}>Full Name:</div>
                <div style={{fontSize:23,color:'grey',fontFamily:'sans-serif',fontWeight:'initial', marginLeft:10}}>email</div>
            </div>

            <div style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>
                <div style={{fontSize:23,color:'black',fontFamily:'sans-serif',fontWeight:'initial'}}>Address:</div>
                <div style={{fontSize:23,color:'grey',fontFamily:'sans-serif',fontWeight:'initial', marginLeft:10}}>email</div>
            </div>

            <div style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>
                <div style={{fontSize:23,color:'black',fontFamily:'sans-serif',fontWeight:'initial'}}>Phone Number:</div>
                <div style={{fontSize:23,color:'grey',fontFamily:'sans-serif',fontWeight:'initial', marginLeft:10}}>email</div>
            </div>

            <div style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>
                <div style={{fontSize:23,color:'black',fontFamily:'sans-serif',fontWeight:'initial'}}>Address:</div>
                <div style={{fontSize:23,color:'grey',fontFamily:'sans-serif',fontWeight:'initial', marginLeft:10}}>email</div>
            </div>

            <div style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>
                <div style={{fontSize:23,color:'black',fontFamily:'sans-serif',fontWeight:'initial'}}>Acount Type:</div>
                <div style={{fontSize:23,color:'grey',fontFamily:'sans-serif',fontWeight:'initial', marginLeft:10}}>email</div>
            </div>

            {/* {
                profile!== undefined &&
                profile.vtype == "S" &&
                <div>
                    <div style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>
                        <div style={{fontSize:23,color:'black',fontFamily:'sans-serif',fontWeight:'initial'}}>School Name:</div>
                        <div style={{fontSize:23,color:'grey',fontFamily:'sans-serif',fontWeight:'initial', marginLeft:10}}>email</div>
                    </div>
                </div>
            }

            {
                profile!== undefined &&
                profile.vtype == "M" &&
                <div>
                    <div style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>
                        <div style={{fontSize:23,color:'black',fontFamily:'sans-serif',fontWeight:'initial'}}>Membership Start date:</div>
                        <div style={{fontSize:23,color:'grey',fontFamily:'sans-serif',fontWeight:'initial', marginLeft:10}}>email</div>
                    </div>

                    <div style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>
                        <div style={{fontSize:23,color:'black',fontFamily:'sans-serif',fontWeight:'initial'}}>Membership end date:</div>
                        <div style={{fontSize:23,color:'grey',fontFamily:'sans-serif',fontWeight:'initial', marginLeft:10}}>email</div>
                    </div>
                </div>
            } */}

        </div>
    );
}; 

export default Profile;