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
              We, the doctors and cosmetologists of Doctor Dasha Clinic believe
              that beauty will save the world, you just need to contact us! A
              wide range of services, quality cosmetics and pleasant prices -
              become a real superhero with our first-class specialists
            </i>
          </p>
          <Link className='btn home-page-btn' to='/services'>
            To our serices
          </Link>
        </div>
        <div className='home-img-container'>
          <img src={imgHomepageBig} alt='doctor dasha' className='pic-vert' />
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
    width: 30%;
    display: flex;
    align-items: flex-end;
    .pic-vert {
      height: 99%;
      width: 100%;
    }
  }
  .home-text-container {
    height: 100%;
    width: 65%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      width: 50%;
      max-width: 500px;
      height: 30%;
      max-height: 300px;
      text-align: center;
      font-size: 50px;
    }
    span {
      color: #821d30;
    }
    p {
      text-align: center;
      width: 50%;
      max-width: 700px;
      height: 40%;
      font-size: 20px;
      line-height: 30px;
      font-family: 'Libre Caslon Text', serif;
    }
    .home-page-btn {
      background-color: #821d30;
      color: #f6f0e7;
    }
  }
  @media screen and (max-width: 420px) {
    .home-text-container {
      width: 100%;
      justify-content: space-between;
      h1 {
        margin-top: 60px;
      }
      p {
        display: none;
      }
      .home-page-btn {
        margin-bottom: 60px;
      }
    }
    .home-img-container {
      display: none;
    }
  }
`;

export default HomePage;
