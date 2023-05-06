import { useEffect, useState } from 'react';
import './App.css';
import CustLogin from './components/Authentication/Customer/CustLogin';
import CustSignUp from './components/Authentication/Customer/CustSignUp';
import EmpLogin from './components/Authentication/Employee/EmpLogin';
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
import {BrowserRouter,Route,Routes, Redirect, Navigate} from 'react-router-dom'
import AppContext from './AppContext';

function App() {
  const [login,setLogin] = useState(false)
  const [admin,setAdmin] = useState(false)

  const userSettings = {
    loginname:login, 
    setLogin
  };

  // useEffect(()=>{ 
  //   fetch('http://localhost:8080/account/getrole')
  //   .then(response=>response.json())
  //   .then(data=> {
  //       console.log(data)
  //       if(data.data === "admin"){
  //           setAdmin(true) 
  //       }
  //   })
  // },[login])

  return ( 
  <AppContext.Provider value={userSettings}>
  <BrowserRouter>
    <div className="App">
      {/* <header className="App-header"> */}
        {/* <CustSignUp/> */}

        {/* <Navigate to="/custlogin"/> */}

        {!login && 
        <div>
         <Routes>
              <Route path="/" element={<Navigate to ="/custlogin" />}/>
              <Route exact path="/custlogin" element={<CustLogin/>}/>
              <Route exact path="/custsignup" element={<CustSignUp/>}/>
              <Route exact path="/emplogin" element={<EmpLogin/>}/>
         </Routes>
         </div>
       }

        {
          login && !admin &&
          <div>
          <Navbar admin={admin}/>
          <div> 
          <Routes>
              <Route path="/custlogin" element={<Navigate to ="/" />}/>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/about"  element={<AboutUs/>} />
              <Route exact path="/contact"  element={<ContactUs/>} /> 
              <Route exact path="/attractions" element={<Attractions/>}/>
              <Route exact path="/stores" element={<Stores/>} />
              <Route exact path="/shows" element={<Shows/>} />
              <Route exact path="/book" element={<BookTickets/>} />
              <Route exact path="/orders" element={<MyOrders/>} />
              <Route exact path="/profile" element={<Profile/>} />
          </Routes>
        </div>
          </div>
        }

        {
          login && admin &&
          <div>
          <Navbar admin={admin}/>
          <div> 
          <Routes>
              <Route path="/custlogin" element={<Navigate to ="/admin" />}/>
              <Route exact path="/admin" element={<AdminProfile/>} />
          </Routes>
        </div>
          </div>
        }
       
       
      {/* </header> */}
    </div>
    </BrowserRouter>
    </AppContext.Provider>
  );
} 

export default App;
