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
        <div className="cart-header">
          <Link to="/">Voltar</Link>
          <Link to="/checkout" data-testid="checkout-products">
            Ir para o checkout
          </Link>
        </div>
        { !hasItemOnList ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) : (
          <div className="cart-container">
            {
              list.map((item) => (
                <div className="cart-item" key={ item.id }>
                  <button
                    type="button"
                    data-testid="remove-product"
                    className="item-remove"
                    onClick={ () => {
                      removeItem(item);
                      updateWithLocal();
                    } }
                  >
                    Remove
                  </button>
                  <p
                    className="item-name"
                    data-testid="shopping-cart-product-name"
                  >
                    {item.name}
                  </p>
                  <p className="item-price">{item.price}</p>
                  <button
                    type="button"
                    data-testid="product-decrease-quantity"
                    onClick={ () => {
                      changeQuantity('minus', item.id);
                      updateWithLocal();
                    } }
                  >
                    -
                  </button>
                  <p
                    className="item-quantity"
                    data-testid="shopping-cart-product-quantity"
                  >
                    {item.quantity}
                  </p>
                  <button
                    type="button"
                    data-testid="product-increase-quantity"
                    onClick={ () => {
                      changeQuantity('plus', item.id);
                      updateWithLocal();
                    } }
                  >
                    +
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
