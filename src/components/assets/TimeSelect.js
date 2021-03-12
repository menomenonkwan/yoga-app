import WheelPicker from 'react-simple-wheel-picker';

const TimeSelect = ({arr, handleChange, currentValue = 0}) => {
  const handleOnChange = target => {
    handleChange(target.value);
  };
  
  return (
    <WheelPicker
      data={arr}
      onChange={handleOnChange}
      height={150}
      width={100}
      titleText="Enter value same as aria-label"
      itemHeight={30}
      selectedID={arr[currentValue].id}
      fontSize="1.75rem"
      color="var(--purple)"
      activeColor="var(--white)"
      backgroundColor="var(--lightpurple)"
      focusColor="transparent"
    />
  );
};

export default TimeSelect;