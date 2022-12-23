import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_URL;

const AuthContext = React.createContext();

function AuthProviderWrapper({ children }) {
  const navigate = useNavigate();
  const [wrapMenu, setWrapMenu] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [appointment, setAppointment] = useState(null);

  const storeToken = (token) => {
    // save token in the local storagr for further validation
    localStorage.setItem('authToken', token);
  };

  const removeToken = () => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem('authToken');
  };

  const logOutUser = () => {
    // To log out the user, remove the token
    removeToken();
    // and update the state variables
    authenticateUser();
    navigate('/');
  };

  const authenticateUser = () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken');

    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // If the server verifies that JWT token is valid
          const user = response.data;

          // check if admin
          if (user.email === 'khablo.anna@gmail.com') {
            setIsAdmin(true);
            setIsLoggedIn(true);
            setIsLoading(false);
            setUser(user);
            navigate('/admin-profile');
          } else {
            setIsLoggedIn(true);
            setIsLoading(false);
            setUser(user);
            navigate(`/user-profile/${user._id}`);
          }
        })
        .catch((error) => {
          // If the server sends an error response (invalid token)
          // Update state variables
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      // If the token is not available (or is removed)
      setIsLoggedIn(false);
      setIsAdmin(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        wrapMenu,
        setWrapMenu,
        isAdmin,
        setIsAdmin,
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading,
        user,
        setUser,
        appointment,
        setAppointment,
        storeToken,
        removeToken,
        logOutUser,
        authenticateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
