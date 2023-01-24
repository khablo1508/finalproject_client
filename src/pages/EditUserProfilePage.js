import axios from 'axios';
import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import HamburgerMenu from '../components/HamburgerMenu';

const API_URL = process.env.REACT_APP_SERVER_URL;

function EditUserProfilePage() {
  const [newPassword, setNewPassword] = useState('');
  const [newTel, setNewTel] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { user, setUser, wrapMenu } = useContext(AuthContext);

  const handleNewTel = (e) => {
    if (e.target.value === '') {
      setNewTel(user.tel);
    } else {
      setNewTel(e.target.value);
    }
  };

  const { profileId } = useParams();
  const navigate = useNavigate();

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    if (newPassword === '' && newTel === '') {
      navigate(`/user-profile/${profileId}`);
    } else {
      const requestBody = { newPassword, newTel };
      axios
        .put(`${API_URL}/update-profile/${profileId}`, requestBody)
        .then((response) => {
          setUser(response.data);
          navigate(`/user-profile/${profileId}`);
        })
        .catch((error) => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        });
    }
  };

  return (
    <main>
      <section className={wrapMenu ? 'wrap' : 'sign-form-section'}>
        {wrapMenu ? (
          <HamburgerMenu />
        ) : (
          <>
            <h1>Edit Your Profile</h1>
            <div className='sign-form-container'>
              <form className='sign-form' onSubmit={handleUpdateSubmit}>
                <div className='input-label-container'>
                  <label>Password:</label>
                  <input
                    type='password'
                    name='password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className='input-label-container'>
                  <label>Tel:</label>
                  <input
                    type='tel'
                    name='phone'
                    value={newTel}
                    pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}'
                    onChange={handleNewTel}
                  />
                  <small>Format: 123-45-678</small>
                </div>

                <button className='btn sign-btn' type='submit'>
                  Save
                </button>
              </form>
            </div>
          </>
        )}

        {errorMessage && <p className='error-message'>{errorMessage}</p>}
      </section>
    </main>
  );
}

export default EditUserProfilePage;
