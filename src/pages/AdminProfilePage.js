import styled from 'styled-components';
import { useEffect, useContext } from 'react';
import { ProceduresContext } from '../context/procedures.context';
import { AuthContext } from '../context/auth.context';
import RequestCard from '../components/RequestCard';

import axios from 'axios';

const API_URL = 'http://localhost:5005';

function AdminProfilePage() {
  const { requestsList, setRequestsList } = useContext(ProceduresContext);
  const { isLoading } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${API_URL}/admin-profile`).then((requestsFromDb) => {
      setRequestsList(requestsFromDb.data);
      console.log(requestsList);
    });
  }, []);

  return (
    <Wrapper>
      <section className='container'>
        <h1>Your requests</h1>

        {!isLoading && (
          <section className='cards-container'>
            {requestsList.length === 0 && <h2>No requests yet</h2>}

            {requestsList.map((req) => {
              return (
                <RequestCard
                  key={req._id}
                  reqId={req._id}
                  title={req.appointment.procedure.title}
                  decision={req.decision}
                  date={req.appointment.date}
                  time={req.appointment.time}
                  appStatus={req.appointment.status}
                  appId={req.appointment._id}
                  client={req.appointment.user.username}
                ></RequestCard>
              );
            })}
          </section>
        )}
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  .container {
    width: 100vw;
    height: 85vh;
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
`;

export default AdminProfilePage;
