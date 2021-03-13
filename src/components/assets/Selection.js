import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '3rem',
    color: 'var(--bright)',
    textShadow: '1px 1px 1px rgba(0,0,0,0.75)',
    '&:hover:not($disabled):not($focused):not($error):before' : {
      borderColor: 'var(--light)' 
    },
  },
  focused: {border: '1px solid red'},
  underline: {},
  disabled: {},
  error: {},
  icon: {
      fill: 'var(--light)',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 80,
  },
  label: { 
    fontSize: '2rem',
    fontFamily: 'inherit',
    color: "var(--light)",
    "&.Mui-focused": {
      color: "var(--lightpurple)",
      borderColor: 'red',
    },
  },
  menuItem: {
    color: 'var(--lightpurple)',
    fontSize: '1.5rem',
    backgroundColor: 'var(--purple)',
    display: 'flex',
    justifyContent: 'center',
    '&:hover': {
      color: 'var(--light)',
      backgroundColor: 'var(--dark)'
    }
  }
}));

const Selection = ({ name, time, handleChange, range }) => {
  const classes = useStyles();

  return ( 
    <FormControl className={classes.formControl}>
      <InputLabel
        className={classes.label}
      >{name}</InputLabel>
      <Select className={classes.root}
        inputProps={{
          classes: {
              icon: classes.icon,
              select: classes.select,
          },
        }}
        name={name}
        value={time}
        onChange={handleChange}
      >
        {range.map(item => (
          <MenuItem 
            key={item.id}
            value={item.value}
            className={classes.menuItem}
          >
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
 
export default Selection;