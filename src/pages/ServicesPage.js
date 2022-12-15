import styled from 'styled-components';
import { useContext, useEffect } from 'react';
import { ProceduresContext } from '../context/procedures.context';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';

import Loading from '../components/Loading';
import ProcedureCard from '../components/ProcedureCard';

const API_URL = 'http://localhost:5005';

function ServicesPage() {
  const { proceduresList, setProceduresList } = useContext(ProceduresContext);
  const { isLoading, setIsLoading } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${API_URL}/services`)
      .then((proceduresFromDB) => {
        setProceduresList(proceduresFromDB.data);
      })

      .catch((err) => console.log(err));
  }, []);

  return (
    <Wrapper>
      {isLoading && <Loading />}

      {!isLoading && (
        <section>
          {proceduresList?.map((procedure) => {
            return (
              <ProcedureCard
                key={procedure._id}
                id={procedure._id}
                title={procedure.title}
                code={procedure.code}
                description={procedure.description}
                duration={procedure.duration}
                price={procedure.price}
              />
            );
          })}
        </section>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.main`
  section {
    margin: 40px auto;
    width: 90vw;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 120px;
  }
`;

export default ServicesPage;
