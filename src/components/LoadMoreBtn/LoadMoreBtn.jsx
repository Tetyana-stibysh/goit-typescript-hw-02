import s from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ handelClick }) => {
  return (
    <button className={s.load} onClick={handelClick}>
      Load more
    </button>
  );
};
export default LoadMoreBtn;
