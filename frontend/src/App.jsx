import {  useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Profil from './Components/Pages/Profils'
import {   Route,Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Home from './Components/Pages/Home'
import SignIn from './Components/SignIn'
import AccountSetting from './Components/Pages/AccountSetting'
import Groups from './Components/Pages/Groups'
import Messages from './Components/Pages/Messages'
import Activites from './Components/Pages/Activites'


function App() {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

 // if (!isLoggedIn) {
   // return <SignIn onLogin={() => setIsLoggedIn(true)} />
  //}

  return (
    <>
  
  <Router>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/home' element={<><Navbar /><Home /><Footer /></>} />
        <Route path='/Groupes' element={<><Navbar /><Groups /><Footer /></>} />
        <Route path='/Message' element={<><Navbar /><Messages /><Footer /></>} />
        <Route path='/profil' element={<><Navbar /><Profil /><Footer /></>} />
        <Route path='/settings' element={<><Navbar /><AccountSetting /><Footer /></>} />
        <Route path='/activities' element={<><Navbar /><Activites /><Footer /></>} />

      </Routes>
    </Router>
      </>
  )
}

export default App
