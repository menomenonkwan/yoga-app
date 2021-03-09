import { Link } from 'react-router-dom';

const Welcome = () => {
  return ( 
    <div className="container">
      <h1>Welcome, Buddy!</h1>
      <h2>Let's Get Started...</h2>
      <Link to="/time">
        <button>Build Program</button>
      </Link>
    </div>
   );
}
 
export default Welcome;