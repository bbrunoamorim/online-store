import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';

export default class Header extends Component {
  render() {
    const { queryInput, handleClick, handleChange, cartQuantity } = this.props;

    return (
      <header
        className="flex p-3 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-300
        items-center justify-around text-white font-medium mb-2"
      >
        <div>
          <img src="/images/logo.png" alt="logo" className="w-10 ml-3" />
          <p className="font-phudu mr-3">Online Store</p>
        </div>
        <div>
          <form>
            <label htmlFor="value">
              <input
                id="value"
                type="text"
                name="queryInput"
                value={ queryInput }
                onChange={ handleChange }
                placeholder="Digite um termo para pesquisa"
                className="text-sm text-center p-1 rounded-lg shadow-md md:w-96"
              />
            </label>
            <button
              type="button"
              id="query-button"
              onClick={ handleClick }
            >
              <AiOutlineSearch className="inline ml-2 text-2xl" />
            </button>
          </form>
        </div>
        <div>
          <Link
            to="/cart"
          >
            <AiOutlineShoppingCart className="inline text-3xl" />
            <span
              className="absolute top-4 right-5 text-sm"
            >
              { cartQuantity }
            </span>
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
  cartQuantity: PropTypes.number.isRequired,
};
