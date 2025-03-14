import React from 'react';
import { Image } from '../../App.types';
import ImageCard from '../ImageCard/ImageCard';
import s from './ImageGallery.module.css';
type ImageGalleryProps = {
  openModal: (newItem: Image) => void;
  arr: Image[];
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ arr, openModal }) => {
  return (
    <ul className={s.gallery}>
      {arr.map(item => (
        <li key={item.id} className={s.item}>
          <ImageCard openModal={openModal} item={item} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
