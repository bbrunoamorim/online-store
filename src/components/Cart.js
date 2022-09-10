import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    const { cartItems } = this.props;
    this.setState({ list: cartItems });
  }

  render() {
    const { list } = this.state;
    const hasItemOnList = list.length > 0;
    return (
      <div>
        <div className="cart-header">
          <Link to="/">Voltar</Link>
        </div>
        { !hasItemOnList ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) : (
          <div>
            {
              list.map((item) => (
                <div key={ item.id }>
                  <p data-testid="shopping-cart-product-name">{item.name}</p>
                  <p>{item.price}</p>
                  <p data-testid="shopping-cart-product-quantity">{item.quantity}</p>
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
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.string,
  })).isRequired,
};
