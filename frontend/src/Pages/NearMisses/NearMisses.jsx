import './NearMisses.css'
import InfoButton from '../../Components/Map/InfoButton/InfoButton';
import InfoModalMisses from '../../Components/Map/InfoButton/InfoModalEvents/InfoModalMisses';

import { useState } from 'react';
import NearMissesTable from '../../Components/NearMissesTable/NearMissesTable';


function NearMisses () {
          const [showInfoModal, setShowInfoModal] = useState(false);
    
      const handleShowInfoModal = () => setShowInfoModal(true);
      const handleCloseInfoModal = () => setShowInfoModal(false);

return ( 
        <div className="near-miss-wrapper">
            <div className='title-container'>
                Near Misses
            </div>
            <InfoButton onClick={handleShowInfoModal}></InfoButton>
         {showInfoModal && <InfoModalMisses onClose={handleCloseInfoModal} />}
           <NearMissesTable />
        </div>
); 
}
export default NearMisses;