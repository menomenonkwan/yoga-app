import { poseNames } from './Content';
import CreatableSelect from 'react-select/creatable';

const customStyles = {
  container: styles => ({
    ...styles,
    width: '500px',
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
    backgroundColor: 'var(--lightpurple)',
    color: 'var(--dark)',
    fontSize: '1.5rem',
    padding: '1rem',   
  }),             
  multiValue: styles => ({
    ...styles,            
    backgroundColor: 'var(--lightpurple)',
    fontSize: '2rem',
    padding: '0.5rem'
  }),    
  menuList: styles => ({
    ...styles,            
    backgroundColor: 'rgba(0,0,0,0.1)',
  }),                   
  placeholder: styles => ({
    ...styles,            
    color: 'var(--white)',
  }),                   
};

const PoseSelectionTwo = ({ setNames }) => {

  return (
    <CreatableSelect
      isMulti
      onChange={(e) => setNames(e)}
      options={poseNames}
      styles={customStyles}
      placeholder="Select or Add name..."
    /> 
  );
}
export default PoseSelectionTwo;


