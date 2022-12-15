import styled from 'styled-components';
import errorImg from '../assets/Error.jpg';

function ErrorPage() {
  return (
    <Wrapper>
      <section
        style={{
          backgroundImage: `url(${errorImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        Page not found
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  section {
    width: 100vw;
    height: 85vh;
    padding-top: 30px;
    text-align: center;
    font-size: 50px;
  }
`;

export default ErrorPage;
