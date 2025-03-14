import toast from 'react-hot-toast';
import s from './SearchBar.module.css';
import { TbPhotoSearch } from 'react-icons/tb';
import React, { ChangeEvent, FormEvent } from 'react';
type SearchBarProps = {
  onSearch: (newQuery: string) => void;
};
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const textElement = target.elements.namedItem(
      'text'
    ) as HTMLInputElement | null;

    if (!textElement) {
      toast('Text input element not found.');
      return;
    }
    const value = textElement.value;
    if (!value) {
      toast('Fill out the search form, please!!');
      return;
    }
    onSearch(value);
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
