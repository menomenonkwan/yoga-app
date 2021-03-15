import Nav from './Nav';

const Header = ({ currentUser, signOut }) => {
  return ( 
    <header>
      <h1>Yoga Timer</h1>
      <Nav 
        currentUser={currentUser} 
        signOut={signOut} 
      />
    </header>
   );
}
 
export default Header;