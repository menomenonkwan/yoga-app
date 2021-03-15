import TextField from '@material-ui/core/TextField';
import { withStyles, makeStyles } from '@material-ui/core/styles';


const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'var(--dark)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'transparent',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'var(--dark)',
      },
      '&:hover fieldset': {
        borderColor: 'var(--bright)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'var(--purple)',
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  paper: {
    color: '#eee',
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'var(--purple)',
    color: 'var(--light)',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    fontSize: '1.5rem',
    color: 'var(--light)',
    backgroundColor: 'var(--purple)',
    margin: theme.spacing(2, 0, 2),
    '&:hover': {
      color: 'var(--lightpurple)',
      backgroundColor: 'var(--purple)',
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.4),0px 4px 5px 0px rgba(0,0,0,0.3),0px 1px 10px 0px rgba(0,0,0,0.2)',
    }
  },
}));

export { CssTextField, useStyles };