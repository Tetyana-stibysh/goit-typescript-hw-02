import s from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ handleClick }) => {
  return (
    <button className={s.load} onClick={handleClick}>
      Load more
    </button>
  );
};
export default LoadMoreBtn;
