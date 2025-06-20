import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function DateDropdown( {text, changeText} ) {

    return (
        <>
         <DropdownButton id="dropdown-basic-button" title={text}>
      <Dropdown.Item href="#/action-1" onClick={() => changeText('hii')}>Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2" onClick={() => changeText('Yesterday')}>Yesterday</Dropdown.Item>
      <Dropdown.Item href="#/action-3" onClick={() => changeText('Week')}>Week</Dropdown.Item>
    </DropdownButton>
        </>
    )
}

export default DateDropdown