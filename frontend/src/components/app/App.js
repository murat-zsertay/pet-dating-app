import './App.css'
import LoginForm from '../auth/LoginForm.js'
import SignUpForm from '../user/SignUpForm.js'
import FindPetsPage from '../findPetsPage/FindPetsPage.js'
import NavBar from '../navBar/navBar.js'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Profile from '../profile/Profile.js'
import EditProfile from '../editProfile/EditProfile.js'

const App = () => {
  return (
        <>
            <NavBar/>
            <Routes>
                <Route path='/login' element={<LoginForm navigate={useNavigate()}/>}/>
                <Route path='/' element={<SignUpForm navigate={useNavigate()}/>}/>
                <Route path='/signup' element={<SignUpForm navigate={useNavigate()}/>}/>
                <Route path='/findPetsPage' element={<FindPetsPage navigate={useNavigate()}/>}/>
                <Route path='/profile' element={<Profile navigate={useNavigate()}/>}/>
                <Route path='/edit-profile' element={<EditProfile navigate={useNavigate()}/>}/>
            </Routes>
        </>
  )
}

export default App
