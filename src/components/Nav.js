import { NavLink as Link } from 'react-router-dom';
import UserMenu from './assets/UserMenu';

const Nav = ({ currentUser, signOut }) => {
  return ( 
    <nav>
      <ul>
        {currentUser ? 
          <li style={{fontSize: '1.5rem', color: 'var(--dark)'}}>
            {currentUser.user.email}
          </li>
          : null }
        <li>
          <Link exact to="/build" activeClassName="selected">Build</Link>
        </li>
        <li>
          <Link to="/program" activeClassName="selected">Program</Link>
        </li>
        <li>
          <UserMenu 
            currentUser={currentUser} 
            signOut={signOut} 
          />
        </li>
      </ul>
    </nav>
   );
}
     
export default Nav;