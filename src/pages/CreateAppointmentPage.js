import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProceduresContext } from '../context/procedures.context';
import axios from 'axios';

import Loading from '../components/Loading';
const API_URL = process.env.REACT_APP_SERVER_URL;

function CreateAppointmentPage() {
  const [appDate, setAppDate] = useState('');
  const [appTime, setAppTime] = useState('');
  const [userId, setUserId] = useState('');

  const { appId } = useParams();
  const navigate = useNavigate();
  const { chosenProcedure, setChosenProcedure } = useContext(ProceduresContext);

  useEffect(() => {
    axios
      .get(`${API_URL}/create-appointment/${appId}`)
      .then((foundAppointment) => {
        setChosenProcedure(foundAppointment.data);
        console.log(chosenProcedure);
        setUserId(foundAppointment.data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  const requestAppointment = (e) => {
    e.preventDefault();
    const requestBody = { appDate, appTime, userId };

    axios
      .put(`${API_URL}/create-appointment/${appId}`, requestBody)
      .then((response) => {
        console.log('user updated:', response.data);
      });

    axios
      .post(`${API_URL}/create-appointment/${appId}`, requestBody)
      .then((response) => {
        console.log('request created', response.data);
        navigate(`/user-profile/${userId}`);
      });
  };

  return (
    <Wrapper>
      {chosenProcedure === undefined ? (
        <Loading />
      ) : (
        <section>
          <div className='sign-form-container'>
            <h1>Create an appointment request</h1>
            <div className='sign-form'>
              <h3>Procedure: {chosenProcedure?.procedure.title} </h3>
              <h3>Duration: {chosenProcedure?.procedure.duration} </h3>
              <h3>Price: ${chosenProcedure?.procedure.price} </h3>
              <form
                className='input-label-container'
                onSubmit={requestAppointment}
              >
                <div className='input-label-container'>
                  <label>Date: </label>
                  <input
                    type='date'
                    name='date'
                    value={appDate}
                    onChange={(e) => setAppDate(e.target.value)}
                  />
                </div>
                <div className='input-label-container'>
                  <label>Time: </label>
                  <input
                    type='time'
                    name='time'
                    value={appTime}
                    onChange={(e) => setAppTime(e.target.value)}
                  />
                </div>
                <button className='btn sign-btn' type='submit'>
                  Request an appointment
                </button>
              </form>
            </div>
          </div>
        </section>
      )}
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
`;

export default CreateAppointmentPage;
