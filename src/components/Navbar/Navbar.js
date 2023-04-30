import React from 'react';
import {Link,NavLink} from 'react-router-dom'


const Navbar = (props) => {
    return (
        <nav style={{display:'flex',alignItems:'center',height:100, alignSelf:'center',borderBottomWidth:2, borderBottomColor:'white',justifyItems:'center', backgroundColor:'#282c34'}}>
        <div style={{display:'flex'}}>
            <img src={require('./../../logo.png')} style={{width:100,height:76,margin:10}}/>
            <ul style={{display:'flex',listStyle:'none'}}>
                <li style={{color: 'white',textDecoration:'none', fontSize:18, marginRight:15}}><Link to="/" style={{color: 'white',textDecoration:'none'}}>Home</Link></li>
                <li style={{color: 'white',textDecoration:'none', fontSize:18, marginRight:15}}><NavLink to="/about" style={{color: 'white',textDecoration:'none'}}>About Us</NavLink></li>
                <li style={{color: 'white',textDecoration:'none', fontSize:18, marginRight:15}}><NavLink to="/contact" style={{color: 'white',textDecoration:'none'}}>Contact Us</NavLink></li>
                <li style={{color: 'white',textDecoration:'none', fontSize:18, marginRight:15}}><NavLink to="/attractions" style={{color: 'white',textDecoration:'none'}}>Attractions</NavLink></li>
                <li style={{color: 'white',textDecoration:'none', fontSize:18, marginRight:15}}><NavLink to="/stores" style={{color: 'white',textDecoration:'none'}}>Stores</NavLink></li>
                <li style={{color: 'white',textDecoration:'none', fontSize:18, marginRight:15}}><NavLink to="/shows" style={{color: 'white',textDecoration:'none'}}>Shows</NavLink></li>
                <li style={{color: 'white',textDecoration:'none', fontSize:18, marginRight:15}}><NavLink to="/book" style={{color: 'white',textDecoration:'none'}}>Book Tickets</NavLink></li>
                <li style={{color: 'white',textDecoration:'none', fontSize:18, marginRight:15}}><NavLink to="/orders" style={{color: 'white',textDecoration:'none'}}>Orders</NavLink></li>
                <li style={{color: 'white',textDecoration:'none', fontSize:18, marginRight:15}}><NavLink to="/profile" style={{color: 'white',textDecoration:'none'}}>Profile</NavLink></li>
                <li style={{color: 'white',textDecoration:'none', fontSize:18, marginRight:15}}><NavLink to="/admin" style={{color: 'white',textDecoration:'none'}}>Admin</NavLink></li>
            </ul>
        </div>
        </nav>
    );
};

export default Navbar;