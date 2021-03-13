import { NavLink as Link } from 'react-router-dom';

const Nav = () => {
  return ( 
    <nav>
      <ul>
        <li>
          <Link exact to="/build" activeClassName="selected">Build</Link>
        </li>
        <li>
          <Link to="/program" activeClassName="selected">Program</Link>
        </li>
      </ul>
    </nav>
   );
}
 
export default Nav;