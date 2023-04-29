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
import {BrowserRouter,Route,Routes} from 'react-router-dom'

function App() {
  const [login,setLogin] = useState(false)
  return ( 
  <BrowserRouter>
    <div className="App">
      <header className="App-header">
        {/* <CustSignUp/> */}
        <Navbar/>
        <Routes>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={AboutUs}/>
            <Route exact path="/contact" component={ContactUs}/>
            <Route exact path="/attractions" component={Attractions}/>
            <Route exact path="/stores" component={Stores}/>
            <Route exact path="/shows" component={Shows}/>
            <Route exact path="/book" component={BookTickets}/>
            <Route exact path="/orders" component={MyOrders}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/admin" component={AdminProfile}/>
        </Routes>
      </header>
    </div>
    </BrowserRouter>
  );
} 

export default App;
