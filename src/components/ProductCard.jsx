import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  render() {
    const {
      productName,
      productImage,
      productPrice,
      dataTestId,
    } = this.props;

    return (
      <div data-testid={ dataTestId }>
        <p>{ productName }</p>
        <img src={ productImage } alt={ productName } />
        <p>{ `R$ ${productPrice}` }</p>
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
