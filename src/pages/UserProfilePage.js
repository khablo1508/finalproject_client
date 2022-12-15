import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
import { ProceduresContext } from '../context/procedures.context';
import axios from 'axios';

import AppointmentCard from '../components/AppointmentCard';

const API_URL = process.env.REACT_APP_SERVER_URL;

function UserProfilePage() {
  const { user, logOutUser, isLoading } = useContext(AuthContext);
  const { appointmentsList, setAppointmentsList } =
    useContext(ProceduresContext);
  const navigate = useNavigate();
  const { profileId } = useParams();

  const handleClick = () => {
    navigate(`/update-profile/${user._id}`);
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/user-profile/${profileId}`)
      .then((foundUser) => {
        console.log(foundUser.data.appointments);
        setAppointmentsList(foundUser.data.appointments);
      })

      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <section>
        <div className='apointment-info'>
          <h1>Your appointments</h1>

          {!isLoading && (
            <section className='cards-container'>
              {appointmentsList?.length === 0 && <h2>No appointments yet</h2>}

              {appointmentsList?.map((appointment) => {
                return (
                  <AppointmentCard
                    key={appointment._id}
                    title={appointment.procedure.title}
                    duration={appointment.procedure.duration}
                    price={appointment.procedure.price}
                    date={appointment.date}
                    status={appointment.status}
                  ></AppointmentCard>
                );
              })}
            </section>
          )}
        </div>
        <div className='profile-info'>
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
  section {
    width: 100vw;
    height: 85vh;
    display: flex;
  }
  /* left side */
  .apointment-info {
    width: 70%;
    border-right: 5px dotted var(--clr-bourdeaux);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .cards-container {
    padding: 20px 30px;
    width: 100%;
    display: flex;
    gap: 20px;
  }

  /* rigth-side */
  .profile-info {
    width: 30%;
    height: 98%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .text-container {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 35%;
  }
  .text-container .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .text-container .user-info span {
    color: var(--clr-bourdeaux);
    font-size: 30px;
  }
  .text-container .user-info .tel-email {
    margin-top: 10px;
  }
  .edit-btn {
    background: var(--clr-dark);
    color: #fff;
    font-size: 20px;
  }
  .btns-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    width: 100%;
    height: 30%;
  }
  .logout-btn {
    background: var(--clr-bourdeaux);
    font-size: 20px;
    color: var(--clr-ivory);
  }
`;

export default UserProfilePage;
