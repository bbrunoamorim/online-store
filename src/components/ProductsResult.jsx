import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

export default class ProductsResult extends Component {
  render() {
    const { searchedProducts } = this.props;
    return (
      <div>
        {
          searchedProducts.length === 0 ? (
            <p>Nenhum produto foi encontrado</p>
          ) : searchedProducts.map((product) => (
            <ProductCard
              key={ product.id }
              productName={ product.title }
              productImage={ product.thumbnail }
              productPrice={ product.price }
              dataTestId="product"
            />
          ))
        }
      </div>
    );
  }
}

ProductsResult.propTypes = {
  searchedProducts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
  })).isRequired,
};
