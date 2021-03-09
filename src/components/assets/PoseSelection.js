import { poseNames } from './Content';
import CreatableSelect from 'react-select/creatable';

const customStyles = {
  container: styles => ({
    ...styles,
    width: '100%',
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
  }),
  menu: styles => ({ 
    ...styles,                 
    backgroundColor: 'var(--blue)',
    color: 'var(--dark)',
    fontSize: '1.5rem',
    padding: '1rem',   
  }),             
  multiValue: styles => ({
    ...styles,            
    backgroundColor: 'var(--blue)',
    fontSize: '2rem',
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


