import React from 'react';
import { Image } from '../../App.types';
import s from './ImageCard.module.css';
type ImageCardProps = {
  item: Image;
  openModal: (newItem: Image) => void;
};
const ImageCard: React.FC<ImageCardProps> = ({ item, openModal }) => {
  const {
    alt_description,
    urls: { small },
  } = item;

  return (
    <div className={s.img}>
      <img
        onClick={() => {
          openModal(item);
        }}
        src={small}
        alt={alt_description}
        width="360"
        height="152"
      />
    </div>
  );
};
export default ImageCard;
