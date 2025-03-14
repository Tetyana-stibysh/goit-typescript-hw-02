import s from './ImageModal.module.css';
import { formatDistanceToNow } from '../../../node_modules/date-fns/formatDistanceToNow';
import Modal from 'react-modal';
import { Image } from '../../App.types';
import React, { MouseEvent } from 'react';
Modal.setAppElement('#root');
type ImageModalProps = {
  image: Image | null;
  isOpen: boolean;
  closeModal: () => void;
};
const ImageModal: React.FC<ImageModalProps> = ({
  image,
  closeModal,
  isOpen,
}) => {
  if (!image || !image.created_at) {
    return;
  }
  const result = formatDistanceToNow(new Date(image?.created_at));
  const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
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
            src={image?.urls.regular}
            alt={image?.alt_description}
            width="960"
            height="460"
          />
          <ul className={s.wrapper}>
            <li className={s.item}>
              {!image?.alt_description ? (
                'Beautiful photo'
              ) : (
                <p className={s.text}>{image?.alt_description}</p>
              )}
            </li>
            <li className={s.item}>
              <p className={s.text}>author: {image?.user.name}</p>
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
