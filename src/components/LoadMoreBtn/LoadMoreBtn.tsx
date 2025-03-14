import React from 'react';
import s from './LoadMoreBtn.module.css';
type LoadMoreBtnProps = {
  handleClick: () => void;
};
const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ handleClick }) => {
  return (
    <button className={s.load} onClick={handleClick}>
      Load more
    </button>
  );
};
export default LoadMoreBtn;
