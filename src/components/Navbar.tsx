import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div>
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <a href='/tutorials' className='navbar-brand'>
          bezKoder
        </a>
        <div className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link to={'/tutorials'} className='nav-link'>
              Tutorials
            </Link>
          </li>
          <li className='nav-item'>
            <Link to={'/add'} className='nav-link'>
              Add
            </Link>
          </li>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
