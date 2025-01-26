import toast, { Toaster } from 'react-hot-toast';
import s from './SearchBar.module.css';
import { TbPhotoSearch } from 'react-icons/tb';

const SearchBar = ({ onSearch }) => {
  const handelSubmit = e => {
    e.preventDefault();
    const { value } = e.target.elements.text;
    onSearch(value);
    e.target.reset();
  };

  const notify = e => {
    if (!e.currentTarget.nextSibling.value) {
      toast('Fill out the search form, please!!');
    }
  };
  return (
    <header className={s.header}>
      <form className={s.wrapper} onSubmit={handelSubmit}>
        <button className={s.button} type="submit" onClick={notify}>
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
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            removeDelay: 1000,
            style: {
              background: '#c8c0c0',
              color: '#cb2323',
              fontWeight: ' 600',
            },
          }}
        />
      </form>
    </header>
  );
};
export default SearchBar;
