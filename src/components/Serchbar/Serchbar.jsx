import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Serchbar.module.css';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(event, query);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.buttonlabel}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          placeholder="Search images and photos"
          onChange={event => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
