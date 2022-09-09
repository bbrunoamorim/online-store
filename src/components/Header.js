import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Header extends Component {
  render() {
    const { queryInput, handleClick, handleChange } = this.props;

    return (
      <header>
        <div className="col-3">
          <p>Store Logo</p>
        </div>
        <div className="col-6">
          <form>
            <label htmlFor="value">
              <input
                id="value"
                type="text"
                name="queryInput"
                data-testid="query-input"
                value={ queryInput }
                onChange={ handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="query-button"
              onClick={ handleClick }
            >
              Pesquisar
            </button>
          </form>
        </div>
        <div className="col-3">
          <Link
            to="/cart"
            data-testid="shopping-cart-button"
          >
            Carrinho
          </Link>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  queryInput: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};
