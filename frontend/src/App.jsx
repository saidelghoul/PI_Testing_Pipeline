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
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials= true


function App() {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

 // if (!isLoggedIn) {
   // return <SignIn onLogin={() => setIsLoggedIn(true)} />
  //}

  return (
    <>
  <UserContextProvider>
  <Toaster position='bottom-right' toastOptions={{duration:2000}}/>
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
    </UserContextProvider>
      </>
  )
}

export default App
