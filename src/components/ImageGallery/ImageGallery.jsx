import ImageCard from '../ImageCard/ImageCard';
import s from './ImageGallery.module.css';

const ImageGallery = ({ arr, toOpenModal }) => {
  return (
    <ul className={s.gallery}>
      {arr.map(item => (
        <li key={item.id} className={s.item}>
          <ImageCard toOpenModal={toOpenModal} item={item} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
