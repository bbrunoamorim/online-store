import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    const products = localStorage.getItem('cartItems');
    const parsedProducts = JSON.parse(products);
    this.setState({ list: parsedProducts });
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

            }
          </div>
        ) }
      </div>
    );
  }
}
