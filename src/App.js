import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <div className='App'>
      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route
          path='/signup'
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        ></Route>
        <Route
          path='/login'
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        ></Route>
        <Route
          path='/user-profile'
          element={
            <IsPrivate>
              <UserProfile />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
