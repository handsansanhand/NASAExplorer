import CustomButton from '../../CustomButton/CustomButton';
import { Button } from 'react-bootstrap';
import './InfoButton.css'
function InfoButton() {
    return (
        <>
        <Button text={"Information"} className='info-button'></Button>
        </>
    );
}

export default InfoButton;