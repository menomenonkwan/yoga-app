import { useState } from 'react'; 
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { motion } from 'framer-motion';
import { CssTextField, useStyles } from './LoginStyles';
import { FaLock } from 'react-icons/fa';

const formVariants = {
  hidden: { opacity: 0, scale: 0.1 },
  show: {
    opacity: 1, scale: 1,
    transition: {
      type: 'spring',
    }
  },
  exit: { opacity: 0 }
}

export default function SignIn({ setNewUser, setCurrentUser, auth }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const classes = useStyles();

  const handleClick = () => {
    setNewUser(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form['signin-email'].value;
    const password = form['signin-password'].value;
    
    
    auth.signInWithEmailAndPassword(email, password).then(cred => {
      console.log('user signing in', cred);
      setCurrentUser(cred);
    }).catch((error) => {
      console.log(error);
      setErrorMessage(error.message);
  });
    form.reset();
  }

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <FaLock />
          </Avatar>
          <Typography component="h1" variant="h4">
            Sign in
          </Typography>
          <form className={classes.form} noValidate  onSubmit={handleSubmit}>
            <CssTextField
              className={classes.margin}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="signin-email"
              label="Email Address"
              name="signin-email"
              autoComplete="email"
              inputProps={{style: {fontSize: 15 }}} 
              InputLabelProps={{style: {fontSize: 15 }}} 
            />
            <CssTextField
              className={classes.margin}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="signin-password"
              type="password"
              label="Password"
              name="signin-password"
              inputProps={{style: {fontSize: 15 }}} 
              InputLabelProps={{style: {fontSize: 15 }}} 
            />          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            {errorMessage && <p style={{ 
                  color: 'var(--dark)', 
                  backgroundColor: 'var(--lightpurple)',
                  padding: '1rem'
            }}>{errorMessage}</p>}
            <motion.button 
              type="button" 
              onClick={handleClick}
                style={{ 
                  backgroundColor: 'transparent', 
                  borderColor: 'var(--purple)', 
                  color: 'var(--dark)'
                }}
              whileHover={{ scale: 1.1, cursor: 'pointer' }}
              whileTap={{ scale: 0.9 }}
            >
              {"Don't have an account? Sign Up"}
            </motion.button>
          </form>
        </div>
      </Container>
    </motion.div>
  );
}