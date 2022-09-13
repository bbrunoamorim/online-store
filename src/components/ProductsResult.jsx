import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

export default class ProductsResult extends Component {
  render() {
    const { searchedProducts, startSearch, addCartFunc } = this.props;
    return (
      <div className="products-result-container">
        {
          searchedProducts.length === 0 && startSearch ? (
            <p>Nenhum produto foi encontrado</p>
          ) : searchedProducts.map((product) => (
            <ProductCard
              key={ product.id }
              productName={ product.title }
              productImage={ product.thumbnail }
              productPrice={ product.price }
              productId={ product.id }
              dataTestId="product"
              addCartFunc={ addCartFunc }
              productShip={ product.shipping.free_shipping }
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
  startSearch: PropTypes.bool.isRequired,
  addCartFunc: PropTypes.func.isRequired,
};
