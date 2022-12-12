import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const API_URL = 'http://localhost:5005';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { setUser, setIsLoggedIn, storeToken } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, email, password };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        setUser(response.data.user);
        setIsLoggedIn(true);
        navigate(`/user-profile/${response.data.user._id}`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Wrapper>
      <section>
        <h1>Sign Up</h1>

        <div className='sign-form-container'>
          <form className='sign-form' onSubmit={handleSignupSubmit}>
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
            <div className='input-label-container'>
              <label>Username:</label>
              <input
                type='text'
                name='username'
                value={username}
                onChange={handleUsername}
              />
            </div>

            <button className='btn sign-btn' type='submit'>
              Sign Up
            </button>
          </form>
        </div>

        {errorMessage && <p className='error-message'>{errorMessage}</p>}

        <div className='sign-suggestion'>
          <p>Already have account?</p>
          <Link className='link' to={'/login'}>
            Login
          </Link>
        </div>
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  section {
    width: 100vw;
    height: 85vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .sign-form-container {
    width: 50%;
    max-width: 500px;
    min-width: 300px;
    height: 70%;
    max-height: 500px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    background: #edcdc0;
    border-radius: 10px;
    margin-bottom: 15px;
  }
  .sign-form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  .sign-form .input-label-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
  }
  .sign-form input {
    width: 90%;
  }
  .sign-suggestion {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 40%;
  }
  .sign-suggestion p {
    font-size: 20px;
  }
  .link {
    text-decoration: none;
    color: var(--clr-bourdeaux);
    font-size: 25px;
  }
`;

export default SignupPage;
