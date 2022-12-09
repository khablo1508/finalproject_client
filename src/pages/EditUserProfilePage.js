import axios from 'axios';
import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/auth.context';

const API_URL = 'http://localhost:5005';

function EditUserProfilePage() {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { user, setUser } = useContext(AuthContext);

  const handleNewUsername = (e) => {
    if (e.target.value === '') {
      setNewUsername(user.username);
    } else {
      setNewUsername(e.target.value);
    }
  };

  const { profileId } = useParams();
  const navigate = useNavigate();

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    const requestBody = { newUsername, newPassword };

    axios
      .put(`${API_URL}/update-profile/${profileId}`, requestBody)
      .then((response) => {
        setUser(response.data);
        navigate('/user-profile');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Wrapper>
      <section>
        <h1>Update Your Profile</h1>

        <div className='sign-form-container'>
          <form className='sign-form' onSubmit={handleUpdateSubmit}>
            <div className='input-label-container'>
              <label>Username:</label>
              <input
                type='text'
                name='username'
                value={newUsername}
                onChange={handleNewUsername}
              />
            </div>

            <div className='input-label-container'>
              <label>Password:</label>
              <input
                type='password'
                name='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button className='btn sign-btn' type='submit'>
              Save
            </button>
          </form>
        </div>

        {errorMessage && <p className='error-message'>{errorMessage}</p>}
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

export default EditUserProfilePage;
