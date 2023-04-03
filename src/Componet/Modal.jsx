import React, { useState } from 'react';

function Modal({ showModal, onClose, onExtraButtonClick }) {
  const [isOpen, setIsOpen] = useState(showModal);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleExtraButtonClick = () => {
    onExtraButtonClick();
  };

  return (
    <div className={`modal ${isOpen ? 'is-open' : ''}`}>
      <div className="modal-content">
        <button className="close-button" onClick={handleClose}>
          X
        </button>
        <h2>Modal Title</h2>
        <p>Modal content goes here.</p>
        <button className="extra-button" onClick={handleExtraButtonClick}>
          Extra Button
        </button>
      </div>
    </div>
  );
}

export default Modal;
