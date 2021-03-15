import { poseNames } from './Content';
import CreatableSelect from 'react-select/creatable';

const customStyles = {

  container: styles => ({
    ...styles,
    width: '100%',
    margin: '1rem 0 3rem 0',
    outline: 'transparent',
  }),
  control: styles => ({ 
    ...styles,                 
    fontSize: '1.5rem',
    backgroundColor: 'var(--purple)',
  }),
  option: styles => ({ 
    ...styles,                 
    borderBottom: '1px solid var(--purple)',
    padding: '1rem', 
  }),
  menu: styles => ({ 
    ...styles,                 
    backgroundColor: 'var(--purple)',
    color: 'var(--dark)',
    fontSize: '1.5rem',
    padding: '1rem',   
  }),             
  multiValue: styles => ({
    ...styles,            
    backgroundColor: 'var(--lightpurple)',
    fontSize: '1.5rem',
    padding: '0.5rem'
  }),    
  menuList: styles => ({
    ...styles,            
    backgroundColor: 'var(--lightpurple)',
  }),                   
  placeholder: styles => ({
    ...styles,            
    color: 'var(--white)',
  }),                   
};

const PoseSelectionTwo = ({ names, setNames }) => {

  return (
    <CreatableSelect
      isMulti
      onChange={(e) => setNames(e)}
      options={poseNames}
      styles={customStyles}
      placeholder="Select or Add name..."
      value={names}
    /> 
  );
}
export default PoseSelectionTwo;


