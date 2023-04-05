import s from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ image, closeModal }) => {

  const handleCloseModalByEscape = useCallback(
    e => {
      if (e.code === 'Escape') {
        console.log('Escape' + Date.now());
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleCloseModalByEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleCloseModalByEscape);
      document.body.style.overflow = '';
    };
  }, [handleCloseModalByEscape]);

  const handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div className={s.backdrop} onClick={handleCloseModal}>
      <img src={image} className={s.image} alt="" />
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};

export default Modal;
