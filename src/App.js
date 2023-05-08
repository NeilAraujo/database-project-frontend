import { useEffect, useState , useContext} from 'react';
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
import axios from 'axios'; 

axios.defaults.withCredentials = true; 

function App() {
  const [login,setLogin] = useState()
  const [admin,setAdmin] = useState()
  const myContext = useContext(AppContext);

  const userSettings = {
    loginname:login, 
    setLogin
  };

  useEffect(()=>{
    console.log("Refresh")
    setLogin(false) 
    setAdmin(false)
    console.log(localStorage.getItem("Login"))
  },[])


  useEffect(()=>{ 
    fetch('http://localhost:8080/account/getrole',{method:'GET',credentials:'include'})
    .then(response=>response.json())
    .then(data=> {
        if(data.data === "admin"){
            setAdmin(true) 
        }
    })
  },[login])

  return ( 
  <AppContext.Provider value={userSettings}>
  <BrowserRouter>
    <div className="App">
      {/* <header className="App-header"> */}
        {/* <CustSignUp/> */}

        {/* <Navigate to="/custlogin"/> */}

        {((localStorage.getItem("Login")===null) || (localStorage.getItem("Login")==="false")) && 
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
          localStorage.getItem("Login")==="true" && !admin &&
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
          localStorage.getItem("Login")==="true" && admin &&
          <div>
          <Navbar admin={admin}/>
          <div> 
          <Routes>
              <Route path="/emplogin" element={<Navigate to ="/admin" />}/>
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
