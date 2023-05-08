import { useState } from 'react';
import './App.css';
import CustLogin from './components/Authentication/Customer/CustLogin';
import CustSignUp from './components/Authentication/Customer/CustSignUp';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Navbar/Home';
import AboutUs from './components/Navbar/AboutUs';
import ContactUs from './components/Navbar/ContactUs';
import Attractions from './components/Navbar/Attractions';
import Stores from './components/Navbar/Stores';
import Shows from './components/Navbar/Shows';
import Profile from './components/Navbar/Profile';
import MyOrders from './components/Navbar/MyOrders';
import BookTickets from './components/Navbar/BookTickets';
import AdminProfile from './components/Navbar/AdminProfile';
import {BrowserRouter,Route,Routes} from 'react-router-dom'; 
import axios from 'axios'; 

axios.defaults.withCredentials = true; 

function App() {
  const [login,setLogin] = useState(false)
  return ( 
  <BrowserRouter>
    <div className="App">
      {/* <header className="App-header"> */}
        {/* <CustSignUp/> */}
       
        <Navbar/>
        <div> 
          <Routes>
              <Route exact path="/" element={<Home/>}/>
                    
              <Route exact path="/about"  element={<AboutUs/>} />
              <Route exact path="/contact"  element={<ContactUs/>} /> 
              <Route exact path="/attractions" element={<Attractions/>}/>
              <Route exact path="/stores" element={<Stores/>} />
              <Route exact path="/shows" element={<Shows/>} />
              <Route exact path="/book" element={<BookTickets/>} />
              <Route exact path="/orders" element={<MyOrders/>} />
              <Route exact path="/profile" element={<Profile/>} />
              <Route exact path="/admin" element={<AdminProfile/>} />
          </Routes>
        </div>
      {/* </header> */}
    </div>
    </BrowserRouter>
  );
} 

export default App;
