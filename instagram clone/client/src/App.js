import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Profile from './Components/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Createpost from './Components/Createpost';

import { LoginContext } from './context/LoginContext'
import { useState } from 'react';
import Modal from './Components/Modal';
import UserProfile from './Components/UserProfile';
import Myfollower from './Components/Myfollower';


function App() {

  const [userLogin, setUserLogin] = useState(false)
  // create a logout states
  const [modelOpen, setModelOpen] = useState(false)
  return (
    <BrowserRouter>

      <div className="App">
        <LoginContext.Provider value={{ setUserLogin, setModelOpen }}>
          <Navbar login={userLogin} />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/signup' element={<SignUp />}></Route>
            <Route path='/signin' element={<SignIn />}></Route>
            <Route exact path='/profile' element={<Profile />}></Route>
            <Route path='/createpost' element={<Createpost />}></Route>
            <Route path='/profile/:userid' element={<UserProfile />}></Route>
            <Route path='/myfollowpost' element={<Myfollower />}></Route>
          </Routes>
          <ToastContainer theme='dark' />

          {modelOpen && <Modal setModelOpen={setModelOpen}></Modal>}
        </LoginContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
