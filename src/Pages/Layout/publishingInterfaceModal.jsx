import React, { useState } from 'react';
import Modal from './Modal';
import PublishingInterface from './PublishingInterface';

const PublishingInterfaceModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
      >
        Open Publishing Interface
      </button>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <PublishingInterface />
        </Modal>
      )}
    </div>
  );
};

export default PublishingInterfaceModal;
