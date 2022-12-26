import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { ProceduresContext } from '../context/procedures.context';
import axios from 'axios';

import profilePic from '../assets/profile-pic-test.png';

import AppointmentCard from '../components/AppointmentCard';

const API_URL = process.env.REACT_APP_SERVER_URL;

function UserProfilePage() {
  const { user, setUser, logOutUser, isLoading } = useContext(AuthContext);
  const { appointmentsList, setAppointmentsList } =
    useContext(ProceduresContext);
  const navigate = useNavigate();
  const { profileId } = useParams();

  const handleClick = () => {
    navigate(`/update-profile/${user._id}`);
  };

  const handleAvatar = (e) => {
    const uploadData = new FormData();
    uploadData.append('imageUrl', e.target.files[0]);
    axios
      .post(`${API_URL}/user-profile/${profileId}/upload-avatar`, uploadData)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.log('Error while uploading the file: ', error));
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/user-profile/${profileId}`)
      .then((foundUser) => {
        console.log(foundUser.data);
        setAppointmentsList(foundUser.data.appointments);
      })

      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <section className='user-profile'>
        <div className='apointment-info'>
          <h1>Your appointments</h1>

          {!isLoading && (
            <section className='cards-container'>
              {appointmentsList?.length === 0 && <h2>No appointments yet</h2>}

              {appointmentsList?.map((appointment) => {
                return (
                  <AppointmentCard
                    key={appointment?._id}
                    title={appointment.procedure?.title}
                    duration={appointment.procedure?.duration}
                    price={appointment.procedure?.price}
                    date={appointment?.date}
                    time={appointment?.time}
                    status={appointment?.status}
                  ></AppointmentCard>
                );
              })}
            </section>
          )}
        </div>
        <div className='profile-info'>
          <div className='avatar-container'>
            <img
              src={user.imageUrl}
              // src={user.imageUrl === '' ? profilePic : user.imageUrl}
              alt='avatar'
            />
            <input
              type='file'
              className='edit-pic-btn'
              onChange={handleAvatar}
              placeholder='Edit'
            />
          </div>
          <div className='text-container'>
            <div className='user-info'>
              <h2>
                <span>{user.username}</span>
              </h2>
              <div className='tel-email'>
                <h2>Email: {user.email}</h2>
                <h2>Tel: {user.tel}</h2>
              </div>
            </div>

            <button className='btn edit-btn' onClick={handleClick}>
              Edit profile
            </button>
          </div>
          <div className='btns-container'>
            <form>
              <button className='btn logout-btn' onClick={logOutUser}>
                Logout
              </button>
            </form>
          </div>
        </div>
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  .user-profile {
    width: 100vw;
    height: 85vh;
    display: flex;
  }
  /* left side */
  .apointment-info {
    width: 70%;
    height: 100%;
    border-right: 5px dotted var(--clr-bourdeaux);
    display: flex;
    flex-direction: column;
    align-items: center;
    .cards-container {
      padding: 20px 30px;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 20px;
    }
  }

  /* right-side */
  .profile-info {
    width: 30%;
    height: 98%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .avatar-container {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        object-fit: cover;
      }
      .edit-pic-btn {
        border-radius: 0;
        margin-top: 10px;
        width: 170px;
        height: 70px;
      }
    }
    .text-container {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 35%;
      .user-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          color: var(--clr-bourdeaux);
          font-size: 30px;
        }
        .tel-email {
          margin-top: 10px;
        }
      }
      .edit-btn {
        background: var(--clr-dark);
        color: #fff;
        font-size: 20px;
      }
    }
    .btns-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: end;
      width: 100%;
      height: 30%;
      .logout-btn {
        background: var(--clr-bourdeaux);
        font-size: 20px;
        color: var(--clr-ivory);
      }
    }
  }
`;

export default UserProfilePage;
