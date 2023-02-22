import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductCard extends Component {
  render() {
    const {
      productName,
      productImage,
      productPrice,
      productId,
      addCartFunc,
      productShip,
      availableQuantity,
    } = this.props;
    const obj = {
      name: productName,
      image: productImage,
      price: productPrice,
      availableQuantity,
      id: productId,
      shipping: productShip,
    };

    const linkItem = `/item/${productId}`;
    return (
      <div
        className="flex-col text-center px-4 mb-5 mx-3 shadow-lg rounded-lg
        bg-white w-60 h-60 hover:shadow-2xl transition-shadow"
      >
        <Link to={ linkItem }>
          <div>
            <p className="font-medium text-sm my-3 truncate">{ productName }</p>
            <img src={ productImage } alt={ productName } className="inline w-18" />
            <p className="my-2">{ `R$ ${productPrice}` }</p>
            {
              productShip === true
                ? (
                  <p className="text-sm text-green-700 font-semibold">Frete Grátis</p>
                )
                : null
            }
          </div>
        </Link>
        <button
          type="button"
          onClick={ () => addCartFunc(obj) }
          className="text-sm text-blue-500 font-medium
          hover:text-blue-600 hover:font-semibold"
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
  productId: PropTypes.string.isRequired,
  addCartFunc: PropTypes.func.isRequired,
  productShip: PropTypes.bool.isRequired,
  availableQuantity: PropTypes.number.isRequired,
};
