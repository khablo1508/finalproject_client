import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

import logo from '../assets/logo-doctor-dasha.png';

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Wrapper>
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

          <NavLink className='navlink' to='/user-profile'>
            <i className='fa-solid fa-person-dress'></i>
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  .nav {
    font-family: 'Parisienne', cursive;
    width: 100vw;
    height: 15vh;
    background: linear-gradient(to right, #f7d9cd, #a27565);
    box-shadow: 0 5px 15px #a27565;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .nav-img-container {
    height: 100%;
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 30px;
  }
  .nav-img-container img {
    height: 140px;

    width: 140px;
  }
  .nav-links-container {
    margin-right: 30px;
    height: 100%;
    width: 35%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .nav-links-container .navlink {
    width: 20%;
    height: 35%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    background: #f6f0e7;
    color: #734938;
    border-radius: 10px;
    font-size: 20px;
  }
`;

export default Navbar;
