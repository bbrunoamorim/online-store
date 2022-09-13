import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductCard extends Component {
  render() {
    const {
      productName,
      productImage,
      productPrice,
      dataTestId,
      productId,
      addCartFunc,
      productShip,
    } = this.props;
    const obj = {
      name: productName,
      image: productImage,
      price: productPrice,
      id: productId,
      shipping: productShip,
    };

    const linkItem = `/item/${productId}`;
    return (
      <div className="main-card-item" data-testid={ dataTestId }>
        <Link to={ linkItem } data-testid="product-detail-link">
          <div>
            <p>{ productName }</p>
            <img src={ productImage } alt={ productName } />
            <p>{ `R$ ${productPrice}` }</p>
            { productShip === true
              ? <p data-testid="free-shipping">Frete Gratis</p> : null}
          </div>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => addCartFunc(obj) }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  productName: PropTypes.string.isRequired,
  productImage: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  dataTestId: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
  addCartFunc: PropTypes.func.isRequired,
  productShip: PropTypes.bool.isRequired,
};
