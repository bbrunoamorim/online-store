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
    } = this.props;
    const linkItem = `/item/${productId}`;
    return (
      <div className="main-card-item" data-testid={ dataTestId }>
        <Link to={ linkItem } data-testid="product-detail-link">
          <div>
            <p>{ productName }</p>
            <img src={ productImage } alt={ productName } />
            <p>{ `R$ ${productPrice}` }</p>
          </div>
        </Link>
        <button type="button">Adicionar ao carrinho</button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  productName: PropTypes.string,
  productImage: PropTypes.string,
  productPrice: PropTypes.string,
  dataTestId: PropTypes.string,
}.isRequired;
