import s from './ImageCard.module.css';

const ImageCard = ({ item, toOpenModal }) => {
  const {
    alt_description,
    urls: { small },
  } = item;

  return (
    <div className={s.img}>
      <img
        onClick={() => {
          toOpenModal(item);
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
