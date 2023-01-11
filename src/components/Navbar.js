import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

import logo from '../assets/logo-doctor-dasha.png';

function Navbar() {
  const { isLoggedIn, isAdmin, logOutUser, wrapMenu, setWrapMenu } =
    useContext(AuthContext);

  return (
    <Wrapper>
      <div className={wrapMenu ? 'wrap-nav' : ''}>
        <div className='nav'>
          <NavLink className='nav-img-container' to='/'>
            <img src={logo} alt='logo' />
          </NavLink>
          <div className='nav-links-container'>
            <NavLink className='navlink' to='/services'>
              Services
            </NavLink>

            {!isLoggedIn && (
              <NavLink className='navlink' to='/signup'>
                Sign Up
              </NavLink>
            )}
            {!isLoggedIn && (
              <NavLink className='navlink' to='/login'>
                Log In
              </NavLink>
            )}

            {isAdmin && (
              <NavLink className='navlink' to='/admin-profile'>
                <i className='fa-solid fa-unlock-keyhole'></i>
              </NavLink>
            )}
            {!isAdmin && (
              <NavLink className='navlink' to='/user-profile/:profileId'>
                <i className='fa-solid fa-person-dress'></i>
              </NavLink>
            )}

            {isAdmin && (
              <button className='navlink' onClick={logOutUser}>
                Logout
              </button>
            )}
          </div>
          <button
            className='hamburger-menu'
            onClick={() => setWrapMenu(!wrapMenu)}
          >
            <i
              className={wrapMenu ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}
            ></i>
          </button>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  .wrap-nav {
    opacity: 0.5;
    background-color: linear-gradient(
      rgba(247, 217, 205, 0.5),
      rgba(247, 217, 205, 0.5)
    );
    transition: opacity 0.4s ease;
  }
  .nav {
    font-family: 'Parisienne', cursive;
    width: 100vw;
    height: 15vh;
    background: linear-gradient(to right, #f7d9cd, #a27565);
    box-shadow: 0 5px 15px #a27565;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .nav-img-container {
      height: 100%;
      width: 15%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 30px;
      img {
        height: 140px;
        width: 140px;
      }
      .nav-links-container {
        margin-right: 30px;
        height: 100%;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .navlink {
          width: 20%;
          height: 35%;
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          background: #f6f0e7;
          color: #734938;
          border-radius: 10px;
          border: none;
          font-size: 18px;
          cursor: pointer;
        }
      }
      .hamburger-menu {
        display: none;
      }
    }
    @media screen and (max-width: 850px) {
      .nav-links-container {
        display: none;
      }
      .hamburger-menu {
        cursor: pointer;
        border: none;
        border-radius: 10px;
        margin-right: 20px;
        width: 50px;
        height: 50px;
        background: var(--clr-ivory);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .wrap {
    background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    );
  }
`;

export default Navbar;
