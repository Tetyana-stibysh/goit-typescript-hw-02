import toast from 'react-hot-toast';
import s from './SearchBar.module.css';
import { TbPhotoSearch } from 'react-icons/tb';

const SearchBar = ({ onSearch }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const { value } = e.target.elements.text;
    if (!value) {
      toast('Fill out the search form, please!!');
      return;
    }
    onSearch(value);
    // e.target.reset();
  };

  return (
    <header className={s.header}>
      <form className={s.wrapper} onSubmit={handleSubmit}>
        <button className={s.button} type="submit">
          <TbPhotoSearch className={s.icon} />
        </button>
        <input
          className={s.input}
          name="text"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
export default SearchBar;
