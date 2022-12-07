import styled from 'styled-components';
import imgHomepageBig from '../assets/imgHomepageBig.JPEG';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Wrapper>
      <section>
        <div className='home-text-container'>
          <h1>
            Welcome <br />
            <span>to my clinic</span> <br />
            for aesthetic medicine
          </h1>
          <p>
            <i>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              expedita ex, mollitia, eveniet perferendis facilis explicabo et
              enim accusantium nulla at voluptate ratione dolor aspernatur
              dolorum alias aliquam saepe sunt?
            </i>
          </p>
          <Link className='btn home-page-btn' to='/services'>
            To our serices
          </Link>
        </div>
        <div className='home-img-container'>
          <img src={imgHomepageBig} alt='doctor dasha' />
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
    justify-content: space-between;
  }
  .home-img-container {
    height: 100%;
    width: 35%;
    display: flex;
    align-items: flex-end;
  }
  .home-img-container img {
    height: 99%;
    width: 100%;
  }
  .home-text-container {
    height: 100%;
    width: 65%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .home-text-container h1 {
    width: 50%;
    max-width: 500px;
    height: 30%;
    max-height: 300px;
    text-align: center;
    font-size: 50px;
  }
  .home-text-container span {
    color: #821d30;
  }
  .home-text-container p {
    width: 50%;
    max-width: 700px;
    height: 40%;
    font-size: 20px;
    line-height: 30px;
    font-family: 'Libre Caslon Text', serif;
  }
  .home-text-container .home-page-btn {
    background-color: #821d30;
    color: #f6f0e7;
  }
`;

export default HomePage;
