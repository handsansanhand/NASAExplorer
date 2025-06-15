import React from 'react';
import { Modal } from 'react-bootstrap';
import CustomButton from './CustomButton';

function MapPopup( { show, onHide, eventData } ) {
      if (!eventData) return null; //just in case
    return (
        <>
        <Modal show={show} onHide={onHide} centered size="lg">
        <Modal.Header>
          <Modal.Title>test</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <div className="modal-body">
                <img src={`backup_space_pic.jpg`} alt={`test`} />
                <div className="modal-text">
                  <p>{`desc`}</p>
                  <div className="author"></div>
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