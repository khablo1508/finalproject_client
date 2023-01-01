import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import imgHomepageBig from '../assets/imgHomepageBig.JPEG';
import imgHomepageHoriz from '../assets/imgHomepageHoriz.jpg';

function HomePage() {
  const { isAdmin } = useContext(AuthContext);
  return (
    <Wrapper>
      <section>
        <div className='home-text-container'>
          {/* <div className='pic-horiz'>
            <img src={imgHomepageHoriz} alt='doctor dasha' />
          </div> */}
          <h1>
            Welcome <br />
            <span>to our clinic</span> <br />
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

        <div className='menu-wrap'>
          <div className='hamburger'>
            <div></div>
          </div>
          <div className='menu'>
            <div>
              <div>
                <ul>
                  <li>
                    <Link to='/services'>Services</Link>
                  </li>

                  <li>
                    <Link to='/signup'>Sign up</Link>
                  </li>
                  <li>
                    <Link to='/login'>Log in</Link>
                  </li>
                  {isAdmin && (
                    <li>
                      <Link className='navlink' to='/admin-profile'>
                        <i className='fa-solid fa-unlock-keyhole'></i>
                      </Link>
                    </li>
                  )}
                  {!isAdmin && (
                    <li>
                      <Link className='navlink' to='/user-profile/:profileId'>
                        <i className='fa-solid fa-person-dress'></i>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
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
    justify-content: center;
    .home-text-container {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .pic-horiz {
        display: none;
      }
      h1 {
        width: 90%;
        min-width: 168px;
        max-width: 600px;
        height: 40%;
        max-height: 300px;
        text-align: center;
        font-size: 50px;
        margin-top: 50px;
      }
      span {
        color: #821d30;
      }
      p {
        display: none;
      }
      .home-page-btn {
        margin-bottom: 50px;
        margin-top: 30px;
        width: 60%;
        min-width: 150px;
        height: 60px;
        font-size: 25px;
        background-color: #821d30;
        color: #f6f0e7;
      }
    }
    .menu-wrap {
      display: none;
    }
    .home-img-container {
      display: none;
    }
    @media screen and (min-width: 501px) and (max-width: 949px) {
      .home-text-container {
        border: 2px solid red;
        width: 100%;
        justify-content: space-between;
        /* .pic-horiz {
          display: block;
  
          width: 100%;
          height: 55%;
          img {
            width: 100%;
            height: 100%;
            object-fit: fill;
          }
        } */
        h1 {
          margin-top: 20px;
          width: 90%;
          font-size: 60px;
        }
        p {
          display: block;
          width: 80%;
          font-size: 20px;
          line-height: 30px;
          text-align: center;
        }
        .home-page-btn {
          margin-bottom: 20px;
        }
      }
    }
  }
  /* @media screen and (min-width: 951px) {
    .home-text-container {
      p {
        display: block;
        text-align: center;
        width: 50%;
        max-width: 700px;
        height: 40%;
        font-size: 20px;
        line-height: 30px;
        font-family: 'Libre Caslon Text', serif;
      }
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
  } */
`;

export default HomePage;
