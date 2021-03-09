import { NavLink as Link } from 'react-router-dom';

const Nav = () => {
  return ( 
    <nav>
      <ul>
        <li>
          <Link exact to="/" activeClassName="selected">Home</Link>
          </li>
        <li>
          <Link to="/time" activeClassName="selected">Time</Link>
        </li>
        <li>
          <Link to="/pose" activeClassName="selected">Add Pose</Link>
          </li>
        <li>
          <Link to="/edit" activeClassName="selected">Edit</Link>
        </li>
        <li>
          <Link to="/program" activeClassName="selected">Program</Link>
        </li>
      </ul>
    </nav>
   );
}
 
export default Nav;