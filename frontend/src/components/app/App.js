import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import NavBar from '../navBar/navBar';
import {
    useNavigate,
    Routes,
    Route,
} from "react-router-dom";

const App = () => {
    return (
        <>
            <NavBar/>
            <Routes>
                <Route path='/login' element={<LoginForm navigate={useNavigate()} />} />
                <Route path='/' element={<SignUpForm navigate={useNavigate()} />} />
                <Route path='/signup' element={<SignUpForm navigate={useNavigate()} />} />
            </Routes> 
        </>
    );
}

export default App;
