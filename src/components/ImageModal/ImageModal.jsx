import s from './ImageModal.module.css';
import { formatDistanceToNow } from 'date-fns';
import Modal from 'react-modal';
Modal.setAppElement('#root');
const ImageModal = ({ image, closeModal, isOpen }) => {
  const {
    alt_description,
    user: { name },
    created_at,
    urls: { regular },
  } = image;
  const result = formatDistanceToNow(new Date(created_at));
  const handleClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <div className={s.overlay} onClick={handleClick}>
        <div className={s.modal}>
          <img
            className={s.img}
            src={regular}
            alt={alt_description}
            width="960"
            height="460"
          />
          <ul className={s.wrapper}>
            <li className={s.item}>
              {!alt_description ? (
                'Beautiful photo'
              ) : (
                <p className={s.text}>{alt_description}</p>
              )}
            </li>
            <li className={s.item}>
              <p className={s.text}>author: {name}</p>
            </li>
            <li className={s.item}>
              <p className={s.text}>Created {result} ago</p>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};
export default ImageModal;
