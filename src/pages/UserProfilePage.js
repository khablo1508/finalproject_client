import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
import { ProceduresContext } from '../context/procedures.context';
import axios from 'axios';

import profilePic from '../assets/profile-pic-test.png';

import AppointmentCard from '../components/AppointmentCard';
import HamburgerMenu from '../components/HamburgerMenu';

const API_URL = process.env.REACT_APP_SERVER_URL;

function UserProfilePage() {
  const { user, setUser, logOutUser, isLoading, wrapMenu, setWrapMenu } =
    useContext(AuthContext);
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
    setWrapMenu(false);
    axios
      .get(`${API_URL}/user-profile/${profileId}`)
      .then((foundUser) => {
        setUser(foundUser.data);

        const appointments = foundUser.data.appointments.sort((a, b) => {
          return (
            new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time)
          );
        });

        setAppointmentsList(appointments);
      })

      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <section className={wrapMenu ? 'wrap' : 'user-profile'}>
        {wrapMenu ? (
          <HamburgerMenu />
        ) : (
          <>
            <div className='profile-info'>
              <div className='avatar-container'>
                <img
                  src={user.imageUrl === null ? profilePic : user.imageUrl}
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

                <div className='resp-btns'>
                  <button
                    className='resp-btn-edit resp-btn btn'
                    onClick={handleClick}
                  >
                    Edit profile
                  </button>
                  <form className='logout-form resp-btn'>
                    <button
                      className='resp-btn-logout btn'
                      onClick={logOutUser}
                    >
                      Logout
                    </button>
                  </form>
                </div>

                <button className='btn edit-btn' onClick={handleClick}>
                  Edit profile
                </button>
              </div>

              <div className='btns-container'>
                <form className='logout-form'>
                  <button className='btn logout-btn' onClick={logOutUser}>
                    Logout
                  </button>
                </form>
              </div>
            </div>
            <div className='appointment-info'>
              <h1>Your appointments</h1>

              {!isLoading && (
                <section className='cards-container'>
                  {appointmentsList?.length === 0 && (
                    <h2>No appointments yet</h2>
                  )}

                  {appointmentsList?.map((appointment) => {
                    return (
                      <AppointmentCard
                        className='appcard'
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
          </>
        )}
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  .user-profile {
    width: 100vw;
    height: 85vh;
    display: flex;
    flex-direction: column;

    /* upper side */
    .profile-info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      height: 190px;
      .avatar-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        width: 40%;
        margin: 0 0 0 20px;
        img {
          border: 4px solid var(--clr-dark);
          margin-top: 20px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
        }
        .edit-pic-btn {
          border-radius: 0;
          margin-top: 10px;
          width: 170px;
          height: 30px;
        }
      }
      .text-container {
        margin: 0 20px 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        padding: 25px 0 10px 0;
        height: 100%;
        width: 40%;

        .user-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0;
          width: 100%;
          height: 100%;
          span {
            color: var(--clr-bourdeaux);
            font-size: 30px;
          }
          .tel-email {
            margin-top: 10px;
            font-size: 10px;
          }
        }
        .edit-btn {
          display: none;
        }
        .resp-btns {
          display: flex;
          justify-content: center;
          width: 100%;
          height: 30%;

          .resp-btn-edit {
            width: 45%;
            max-width: 70px;
            background: var(--clr-dark);
            height: 100%;
            color: #fff;
            margin-right: 10px;
          }
          .logout-form {
            width: 45%;
            max-width: 70px;
          }
          .resp-btn-logout {
            width: 100%;
            height: 100%;
            background: var(--clr-bourdeaux);
            color: #fff;
          }
        }
      }
      .btns-container {
        display: none;
      }
    }
    .appointment-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      border-top: 5px dotted var(--clr-bourdeaux);
      .cards-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
    @media screen and (min-width: 601px) {
      .appointment-info {
        width: 100%;
        height: 70%;
        .cards-container {
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-evenly;
          gap: 20px;
          padding: 20px 30px;
          width: 100%;
        }
      }
    }
  }
  @media screen and (min-width: 901px) {
    .user-profile {
      flex-direction: row;

      .profile-info {
        border-right: 5px dotted var(--clr-bourdeaux);
        height: 100%;
        width: 350px;
        flex-direction: column;
        justify-content: flex-start;
        .avatar-container {
          width: 100%;
          margin: 0;
          height: 40%;
          img {
            width: 160px;
            height: 160px;
          }
        }
        .text-container {
          height: 40%;
          width: 100%;

          .user-info {
            height: 60%;
          }
          .tel-email {
            width: 70%;
            align-items: flex-start;
          }
          .resp-btns {
            display: none;
            width: 100%;
            flex-direction: column;
            align-items: center;
            .resp-btn {
              width: 85%;
              height: 45%;
              .resp-btn-logout {
              }
            }
          }
          .edit-btn {
            display: block;
            background: var(--clr-dark);
            color: #fff;
          }
        }
        .btns-container {
          height: 20%;
          display: block;
          .logout-form {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            padding-bottom: 15px;
            .logout-btn {
              background: var(--clr-bourdeaux);
              color: var(--clr-ivory);
            }
          }
        }
      }
      .appointment-info {
        border: none;
      }
    }
  }
`;

export default UserProfilePage;
