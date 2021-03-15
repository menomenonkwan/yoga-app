import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SignIn from './assets/SignIn';
import SignUp from './assets/SignUp';
import Account from './assets/Account';


export default function Login({ auth, currentUser, setCurrentUser, signOut, setPoses }) {
  const [newUser, setNewUser] = useState(false);

  return (
    <div className="container">
      {currentUser 
        ?  <Account currentUser={currentUser} signOut={signOut} setPoses={setPoses}/>
        : 
          <AnimatePresence>
            {!newUser 
              && <SignIn 
                    setNewUser={setNewUser} 
                    setCurrentUser={setCurrentUser}
                    auth={auth}
                    />}
            {newUser 
              &&  <SignUp  
                    setNewUser={setNewUser} 
                    setCurrentUser={setCurrentUser}
                    auth={auth}
                  />}
          </AnimatePresence>
      }
    </div>
  );
}
