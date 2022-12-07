import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className='App'>
      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/signup' element={<SignupPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
