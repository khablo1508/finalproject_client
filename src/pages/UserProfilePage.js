import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
import pic from '../assets/profile-pic-test.png';

function UserProfilePage() {
  const { user, logOutUser, authenticateUser } = useContext(AuthContext);

  // useEffect(() => {
  //   authenticateUser();
  // }, []);

  return (
    <Wrapper>
      <section>
        <div className='apointment-info'>
          <h1>Your appointments</h1>
        </div>
        <div className='profile-info'>
          <div className='avatar-container'>
            <img src={pic} alt='user' />
            <Link to={`/update-profile/${user._id}`} className='btn delete-btn'>
              <i className='fa-solid fa-pen'></i>
            </Link>
          </div>

          <div className='info-container'>
            <div className='text-container'>
              <div className='user-info'>
                <h2>Username: {user.username}</h2>
                <h2>Email: {user.email}</h2>
              </div>
            </div>
            <div className='btns-container'>
              <form>
                <button className='btn delete-btn'>Delete profile</button>
              </form>

              <form>
                <button className='btn logout-btn' onClick={logOutUser}>
                  Logout
                </button>
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
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    height: 35%;
  }
  .info-container .text-container .update-form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  .info-container .text-container .update-form button {
    background: var(--clr-light);
  }
  .info-container .text-container .update-form .input-label-container {
    width: 100%;

    display: flex;
  }
  .info-container .text-container .update-form .input-label-container label {
    width: 30%;
  }
  .info-container .text-container .update-form .input-label-container input {
    padding-left: 10px;
    width: 70%;
  }
  .btns-container {
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
