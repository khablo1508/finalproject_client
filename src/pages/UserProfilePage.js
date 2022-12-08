import styled from 'styled-components';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import pic from '../assets/profile-pic-test.png';

function UserProfilePage() {
  const { user } = useContext(AuthContext);
  console.log(user);

  const [updateMode, setUpdateMode] = useState(false);

  return (
    <Wrapper>
      <section>
        <div className='apointment-info'></div>
        <div className='profile-info'>
          <div className='avatar-container'>
            <img src={pic} alt='user picture' />
            {!updateMode && (
              <button
                class='btn delete-btn'
                onClick={() => setUpdateMode(true)}
              >
                <i className='fa-solid fa-pen'></i>
              </button>
            )}
          </div>

          <div className='info-container'>
            <div className='text-container'>
              {!updateMode && (
                <div className='user-info'>
                  <h2>Username: {user.username}</h2>
                  <h2>Email: {user.email}</h2>
                </div>
              )}

              {updateMode && (
                <form className='update-form'>
                  <div className='input-label-container'>
                    <label>Email:</label>
                    <input
                      type='email'
                      name='email'
                      value={user.email}
                      // onChange={handleEmailUpdate}
                    />
                  </div>
                  <div className='input-label-container'>
                    <label>Password:</label>
                    <input
                      type='password'
                      name='password'
                      value={user.password}
                      // onChange={handlePasswordUpdate}
                    />
                  </div>
                  <div className='input-label-container'>
                    <label>Username:</label>
                    <input
                      type='text'
                      name='username'
                      value={user.username}
                      // onChange={handleUsernameUpdate}
                    />
                  </div>
                  <button type='submit' className='btn'>
                    Save
                  </button>
                </form>
              )}
            </div>
            <div className='btns-container'>
              <form>
                <button class='btn delete-btn'>Delete profile</button>
              </form>

              <form>
                <button class='btn logout-btn'>Logout</button>
              </form>
            </div>
          </div>
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
  }
  /* left side */
  .apointment-info {
    width: 70%;
    border-right: 5px dotted var(--clr-bourdeaux);
  }

  /* rigth-side */
  .profile-info {
    width: 30%;
    height: 98%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  /* upper part */
  .avatar-container {
    width: 100%;
    height: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .avatar-container img {
    margin-top: 30px;
    width: 160px;
    height: 160px;
    border-radius: 50%;
  }
  .avatar-container button {
    border-radius: 50%;
    height: 60px;
    width: 50px;
    background: var(--clr-bourdeaux);
    transform: translate(120%, -100%);
    color: var(--clr-ivory);
  }
  /* lowerpart */
  .info-container {
    width: 100%;
    height: 65%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .info-container .text-container {
    border: 2px solid blue;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 35%;
  }
  .info-container .text-container .update-form {
    border: 2px solid red;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .info-container .text-container .update-form .input-label-container {
    width: 100%;
    border: 2px solid blue;
  }
  .info-container .btns-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 30%;
  }
  .info-container .btns-container .delete-btn {
    background: var(--clr-bourdeaux);
    font-size: 20px;
    color: var(--clr-ivory);
    margin-bottom: 20px;
  }
  .info-container .btns-container .logout-btn {
    background: var(--clr-dark);
    font-size: 20px;
    color: var(--clr-ivory);
  }
`;

export default UserProfilePage;
