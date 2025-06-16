import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import CustomButton from '../../CustomButton/CustomButton';
import { retrieveEventByID } from '../../../Scripts/retrieveEventByID';

//a popup which when called, uses a get request with the event data id to retrieve all the information about the event
function MapPopup( { show, onHide, eventData } ) {
    if (!eventData) return null; //just in case
    const [event, setEvent] = useState(null);

    useEffect(() => {
          if (show && eventData && eventData.id) {
    const fetchEvent = async () => {
      try {
        const fetchedEvent = await retrieveEventByID(eventData.id);
        setEvent(fetchedEvent);
      } catch (error) {
        console.error("Error fetching event:", error);
        setEvent(null);
      }
    };
    fetchEvent();
  } else {
    //when popup closed or no eventData, reset event state
    setEvent(null);
  }
}, [show, eventData]);

if (!event) return null;
//the modal should ideally have the title, description, date, sources, and categories of the event
    return (
        <>
        <Modal show={show} onHide={onHide} centered size="lg">
        <Modal.Header>
          <Modal.Title>{event ? event.title : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <div className="modal-body">
                <img src={`backup_space_pic.jpg`} alt={`test`} />
                <div className="modal-text">
                  <p>{event ? event.description : 'No description provided.'}</p>
                    <p>
                    <strong>Categories:</strong>{' '}
                        {event.categories && event.categories.length > 0 
                            ? event.categories.map(category => category.title).join(', ')
                            : 'None'
                        }
                    </p>              
                    <p>
                        <strong>Sources:</strong>{' '}
                        {event.sources && event.sources.length > 0
                        ? event.sources.map(src => (
                        <a key={src.id} href={src.url} target="_blank" rel="noopener noreferrer">
                        {src.id}
                        </a>
                        )).reduce((prev, curr) => [prev, ', ', curr])
                        : 'None'}
                    </p>
                    <p>
                        <strong>Date:</strong>{' '}
                        {event.geometries && event.geometries.length > 0
                        ? new Date(event.geometries[0].date).toLocaleString()
                        : 'No date available'}
                    </p>
                   
                </div>
              </div>
        </Modal.Body>
        <Modal.Footer>
          <CustomButton text="Close" onClick={onHide} />
        </Modal.Footer>
      </Modal>
        </>
    )
}
export default MapPopup;