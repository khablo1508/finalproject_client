import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import IsPrivate from './components/IsPrivate';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminProfilePage from './pages/AdminProfilePage';
import EditUserProfilePage from './pages/EditUserProfilePage';
import ServicesPage from './pages/ServicesPage';
import CreateAppointmentPage from './pages/CreateAppointmentPage';
import ErrorPage from './pages/ErrorPage';
import EditServicePage from './pages/EditServicePage';

function App() {
  return (
    <div className='App'>
      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/user-profile/:profileId'
          element={
            <IsPrivate>
              <UserProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path='/admin-profile/'
          element={
            <IsPrivate>
              <AdminProfilePage />
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
        <Route
          path='/create-appointment/:appId'
          element={
            <IsPrivate>
              <CreateAppointmentPage />
            </IsPrivate>
          }
        />
        <Route path='/services' element={<ServicesPage />} />
        <Route
          path='/edit-procedure/:procedureId'
          element={
            <IsPrivate>
              <EditServicePage />
            </IsPrivate>
          }
        />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
