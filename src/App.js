import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import IsPrivate from './components/IsPrivate';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import EditUserProfilePage from './pages/EditUserProfilePage';
import ServicesPage from './pages/ServicesPage';

function App() {
  return (
    <div className='App'>
      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/signup' element={<SignupPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route
          path='/user-profile'
          element={
            <IsPrivate>
              <UserProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path='/update-profile/:profileId'
          element={
            <IsPrivate>
              <EditUserProfilePage />
            </IsPrivate>
          }
        />
        <Route path='/services' element={<ServicesPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
