import PropTypes from 'prop-types';
import s from './Searchbar.module.css';
import icons from '../../assets/icons/script.svg';
import { useState, memo } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <header>
      <form className={s.searchForm} id="search-form" onSubmit={handleSubmit}>
        <button type="submit" className={s.searchBtn}>
          <svg className={s.searchIcon} width="20" height="20">
            <use href={`${icons}#icon-search`}></use>
          </svg>
        </button>
        <input
          type="text"
          name="searchQuery"
          autoComplete="off"
          placeholder="Search images..."
          className={s.searchInput}
          onChange={e => setInput(e.target.value)}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default memo(Searchbar);
