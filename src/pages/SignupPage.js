import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import HamburgerMenu from '../components/HamburgerMenu';

const API_URL = process.env.REACT_APP_SERVER_URL;

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [tel, setTel] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const {
    setUser,
    setIsLoggedIn,
    setIsAdmin,
    storeToken,
    wrapMenu,
    setWrapMenu,
  } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handleTel = (e) => setTel(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, email, password, tel, imageUrl };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        setUser(response.data.user);
        setIsLoggedIn(true);
        if (response.data.user.email === 'khablo.anna@gmail.com') {
          setIsAdmin(true);
          navigate('/admin-profile');
        } else {
          navigate(`/user-profile/${response.data.user._id}`);
        }
      })
      .catch((error) => {
        const errorDescription = error.response?.data.message;
        setErrorMessage(errorDescription);
      });
  };

  useEffect(() => {
    setWrapMenu(false);
  }, []);

  return (
    <section className={wrapMenu ? 'wrap' : 'sign-form-section'}>
      {wrapMenu ? (
        <HamburgerMenu />
      ) : (
        <>
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
                <label>Full name:</label>
                <input
                  type='text'
                  name='username'
                  value={username}
                  onChange={handleUsername}
                />
              </div>
              <div className='input-label-container'>
                <label>Phone number:</label>
                <input
                  type='tel'
                  name='phone'
                  pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}'
                  value={tel}
                  onChange={handleTel}
                />
                <small>Format: 123-45-678</small>
              </div>

              <button className='btn sign-btn' type='submit'>
                Sign Up
              </button>
            </form>
          </div>

          {errorMessage && <p className='error-message'>{errorMessage}</p>}

          <div className='sign-suggestion'>
            <p>Already have account?</p>
            <Link className='sign-link' to={'/login'}>
              Login
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

export default SignupPage;
