import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

export default class ProductsResult extends Component {
  render() {
    const { searchedProducts, startSearch, addCartFunc } = this.props;
    return (
      <div className="flex flex-wrap items-center justify-center">
        {
          searchedProducts.length === 0
            && startSearch
            ? (
              <p
                className="text-xl font-medium text-gray-700 mt-7"
              >
                Nenhum produto foi encontrado
              </p>
            )
            : (
              searchedProducts.map((product) => (
                <ProductCard
                  key={ product.id }
                  availableQuantity={ product.available_quantity }
                  productName={ product.title }
                  productImage={ product.thumbnail }
                  productPrice={ product.price }
                  productId={ product.id }
                  addCartFunc={ addCartFunc }
                  productShip={ product.shipping.free_shipping }
                />
              ))
            )
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
