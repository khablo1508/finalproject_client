import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function HamburgerMenu() {
  const { isAdmin } = useContext(AuthContext);

  return (
    <div className='menu-wrap'>
      <div className='menu'>
        <Link className='navlink' to='/services'>
          Services
        </Link>

        <Link className='navlink' to='/signup'>
          Sign up
        </Link>

        <Link className='navlink' to='/login'>
          Log in
        </Link>

        {isAdmin && (
          <Link className='navlink' to='/admin-profile'>
            <i className='fa-solid fa-unlock-keyhole'></i>
          </Link>
        )}

        {!isAdmin && (
          <Link className='navlink' to='/user-profile/:profileId'>
            <i className='fa-solid fa-person-dress'></i>
          </Link>
        )}
      </div>
    </div>
  );
}

export default HamburgerMenu;
