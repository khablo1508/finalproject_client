import styled from 'styled-components';
import { useEffect, useContext } from 'react';
import { ProceduresContext } from '../context/procedures.context';
import { AuthContext } from '../context/auth.context';
import RequestCard from '../components/RequestCard';

import axios from 'axios';
import HamburgerMenu from '../components/HamburgerMenu';

const API_URL = process.env.REACT_APP_SERVER_URL;

function AdminProfilePage() {
  const { requestsList, setRequestsList } = useContext(ProceduresContext);
  const { isLoading, wrapMenu, setWrapMenu } = useContext(AuthContext);

  useEffect(() => {
    setWrapMenu(false);
    axios.get(`${API_URL}/admin-profile`).then((requestsFromDb) => {
      let sortedRequestsList = requestsFromDb.data.sort((a, b) => {
        return (
          new Date(a.appointment?.date + 'T' + a.appointment?.time) -
          new Date(b.appointment?.date + 'T' + b.appointment?.time)
        );
      });
      setRequestsList(sortedRequestsList);
    });
  }, []);

  return (
    <Wrapper>
      <section className={wrapMenu ? 'wrap' : 'container'}>
        {wrapMenu ? (
          <HamburgerMenu />
        ) : (
          <>
            <h1>Your requests</h1>
            {!isLoading && (
              <section className='cards-container'>
                {requestsList.length === 0 && <h2>No requests yet</h2>}

                {requestsList.map((req) => {
                  return (
                    <RequestCard
                      key={req._id}
                      reqId={req._id}
                      title={req.appointment?.procedure?.title}
                      decision={req.decision}
                      date={req.appointment?.date}
                      time={req.appointment?.time}
                      appStatus={req.appointment?.status}
                      appId={req.appointment?._id}
                      client={req.appointment?.user}
                    ></RequestCard>
                  );
                })}
              </section>
            )}
          </>
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
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 20px;
  }
`;

export default AdminProfilePage;
