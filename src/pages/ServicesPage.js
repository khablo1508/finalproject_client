import styled from 'styled-components';
import { useContext, useEffect } from 'react';
import { ProceduresContext } from '../context/procedures.context';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';

import HamburgerMenu from '../components/HamburgerMenu';
import ProcedureCard from '../components/ProcedureCard';

const API_URL = process.env.REACT_APP_SERVER_URL;

function ServicesPage() {
  const { proceduresList, setProceduresList } = useContext(ProceduresContext);
  const { wrapMenu, setWrapMenu } = useContext(AuthContext);

  useEffect(() => {
    setWrapMenu(false);
    console.log(wrapMenu);
    axios
      .get(`${API_URL}/services`)
      .then((proceduresFromDB) => {
        setProceduresList(proceduresFromDB.data);
      })

      .catch((err) => console.log(err));
  }, []);

  return (
    <Wrapper>
      <section className={wrapMenu ? 'wrap' : 'service-grid'}>
        {wrapMenu ? (
          <HamburgerMenu />
        ) : (
          <>
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
          </>
        )}
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  .service-grid {
    margin: 40px auto;
    width: 90vw;
    display: grid;
    justify-content: center;
    align-items: center;
    gap: 50px;
  }

  @media screen and (min-width: 501px) {
    .service-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  @media screen and (min-width: 850px) {
    .service-grid {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default ServicesPage;
