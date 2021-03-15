import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FaUserCircle } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';

export default function UserMenu({ currentUser, signOut }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseAndLeave = () => {
    signOut();
    setAnchorEl(null);
  };

  return (
    <div>
      <Button 
        aria-controls="simple-menu" 
        aria-haspopup="true" 
        onClick={handleClick}
      >
        <FaUserCircle 
          style={{ marginRight: 0, color: 'var(--white)' }} 
        />
      </Button>
      {currentUser 
        ? <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link 
              to="/account" 
              activeClassName="selected"
              style={{ textDecoration: 'none', }}
            >
              <MenuItem onClick={handleClose}
                style={{ textDecoration: 'none',
                  color: 'var(--purple)',
                  fontFamily: 'inherit',
                  fontSize: '1.5rem'
                }}
              >
                My Account
              </MenuItem>
            </Link>
            <Link 
              to="/" 
              activeClassName="selected"
              style={{ textDecoration: 'none', }}
            >
              <MenuItem onClick={handleCloseAndLeave}
                style={{ textDecoration: 'none',
                  color: 'var(--purple)',
                  fontFamily: 'inherit',
                  fontSize: '1.5rem'
                }}
              >
                Sign Out
              </MenuItem>
            </Link>
          </Menu>
        : <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link 
              to="/login" 
              activeClassName="selected"
              style={{ textDecoration: 'none', }}
            >
              <MenuItem onClick={handleClose}
                style={{ textDecoration: 'none',
                  color: 'var(--purple)',
                  fontFamily: 'inherit',
                  fontSize: '1.5rem'
                }}
              >
                Sign In
              </MenuItem>
            </Link>
          </Menu>
      }
    </div>
  );
}