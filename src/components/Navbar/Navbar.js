import React from 'react';
import {Link,NavLink} from 'react-router-dom'

const Navbar = (props) => {
    return (
        <nav style={{display:'flex',alignItems:'center'}}>
        <div style={{display:'inline'}}>
            <a >Multipage</a>
            <ul>
                <li style={{color: 'white',textDecoration:'none'}}><Link to="/">Home</Link></li>
                <li style={{color: 'white',textDecoration:'none'}}><NavLink to="/about">About Us</NavLink></li>
                <li><NavLink to="/contact">Contact Us</NavLink></li>
                <li><NavLink to="/attractions">Attractions</NavLink></li>
                <li><NavLink to="/stores">Stores</NavLink></li>
                <li><NavLink to="/shows">Shows</NavLink></li>
                <li><NavLink to="/book">Book Tickets</NavLink></li>
                <li><NavLink to="/orders">Orders</NavLink></li>
                <li><NavLink to="/profile">Profile</NavLink></li>
                <li style={{color: 'white',textDecoration:'none'}}><NavLink to="/admin">Admin</NavLink></li>
            </ul>
        </div>
        </nav>
    );
};

export default Navbar;