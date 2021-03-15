import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
    backgroundColor: 'var(--purple)',
    padding: '1rem'
  },
  fullList: {
    fontSize: '2rem',
    fontFamily: 'inherit',
    width: 'auto',
  },
});

export default function MobileMenu({ currentUser, signOut }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem>
            <Link to='/build' 
              style={{
                width: '100%', 
                textAlign: 'center', 
                textDecoration: 'none',
                color: 'var(--white)',
                padding: '1rem'
              }}>
                Build
            </Link>
          </ListItem>
          <ListItem>
            <Link to='/program' 
              style={{
                width: '100%', 
                textAlign: 'center', 
                textDecoration: 'none',
                color: 'var(--white)',
                padding: '1rem'
              }}>
                Program
            </Link>
          </ListItem>
      </List>
      <Divider />
      {currentUser 
        ? <List>
            <ListItem>
              <Link to='/account' 
                style={{
                  width: '100%', 
                  textAlign: 'center', 
                  textDecoration: 'none',
                  color: 'var(--white)',
                  padding: '1rem'
                }}>
                  My Account
              </Link>
            </ListItem>
            <ListItem>
              <Link to='/'
                style={{
                  width: '100%', 
                  textAlign: 'center', 
                  textDecoration: 'none',
                  color: 'var(--white)',
                  padding: '1rem'
                }}>
                <button onClick={signOut}
                  style={{ textDecoration: 'none',
                    color: 'var(--lightpurple)',
                    fontFamily: 'inherit',
                    fontSize: '1.75rem'
                  }}
                >
                  Sign Out
                </button>
              </Link>
            </ListItem>
          </List>
        : <ListItem>
            <Link to='/login' 
              style={{
                width: '100%', 
                textAlign: 'center', 
                textDecoration: 'none',
                color: 'var(--white)',
                padding: '1rem'
              }}>
                Login
            </Link>
          </ListItem>
        }
    </div>
  );

  return (
    <div className="mobile">
      {['top'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><FaBars /></Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
