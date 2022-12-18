import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const API_URL = process.env.REACT_APP_SERVER_URL;

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response?.data.authToken);
        authenticateUser();
      })
      .catch((error) => {
        const errorDescription = error.response?.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <section className='sign-form-section'>
      <h1>Log in</h1>

      <div className='sign-form-container'>
        <form className='sign-form' onSubmit={handleLoginSubmit}>
          <div className='input-label-container'>
            <label>Email:</label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className='input-label-container'>
            <label>Password:</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={handlePassword}
            />
          </div>

          <button className='btn sign-btn' type='submit'>
            Log In
          </button>
        </form>
      </div>

      {errorMessage && <p className='error-message'>{errorMessage}</p>}

      <div className='sign-suggestion'>
        <p>No account yet?</p>
        <Link className='sign-link' to={'/signup'}>
          Sign up
        </Link>
      </div>
    </section>
  );
}

export default LoginPage;
