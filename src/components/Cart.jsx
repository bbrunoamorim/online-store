import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.updateWithLocal = this.updateWithLocal.bind(this);

    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    this.updateWithLocal();
  }

  updateWithLocal() {
    const storageList = JSON.parse(localStorage.getItem('cartItems'));
    this.setState({
      list: storageList,
    });
  }

  render() {
    const { updateWithLocal } = this;
    const { list } = this.state;
    const { changeQuantity, removeItem } = this.props;
    const hasItemOnList = list;
    return (
      <div>
        <div className="flex justify-between items-center py-4 px-8">
          <Link
            to="/"
            className="mb-5 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-300 p-1
            rounded-md text-white font-medium hover:font-semibold hover:bg-blue-400
            transition-colors duration-200 cursor-pointer w-1/4 text-center text-sm"
          >
            Voltar
          </Link>
          <h2 className="text-xl">Seu Carrinho</h2>
          <Link
            to="/checkout"
            className="mb-5 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-300 p-1
            rounded-md text-white font-medium hover:font-semibold hover:bg-blue-400
            transition-colors duration-200 cursor-pointer w-1/4 text-center text-sm"
          >
            Ir para o checkout
          </Link>
        </div>
        { !hasItemOnList ? (
          <p>Seu carrinho está vazio</p>
        ) : (
          <div>
            {
              list.map((item) => (
                <div
                  key={ item.id }
                  className="flex flex-wrap justify-between items-center outline outline-1
                  px-4 rounded-md shadow-lg w-2/3 mx-auto my-7 h-24"
                >
                  <p className="truncate text-xs">
                    { item.name }
                  </p>
                  <p className="text-sm">{ `R$: ${item.price}` }</p>
                  <div className="flex">
                    <button
                      type="button"
                      onClick={ () => {
                        changeQuantity('plus', item.id);
                        updateWithLocal();
                      } }
                      className="hover:font-semibold"
                    >
                      +
                    </button>
                    <p className="mx-3 font-medium">
                      { item.quantity }
                    </p>
                    <button
                      type="button"
                      onClick={ () => {
                        changeQuantity('minus', item.id);
                        updateWithLocal();
                      } }
                      className="hover:font-semibold"
                    >
                      -
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={ () => {
                      removeItem(item);
                      updateWithLocal();
                    } }
                    className="text-sm text-red-600 hover:font-medium"
                  >
                    Remover
                  </button>
                </div>
              ))
            }
          </div>
        ) }
      </div>
    );
  }
}

Cart.propTypes = {
  changeQuantity: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};
