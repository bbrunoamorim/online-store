import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {
      productName,
      productImage,
      productPrice,
      productId,
    } = this.props;

    const prevObj = localStorage.getItem('cartItems');
    let parsedPrevObj = [];
    const obj = { productImage, productName, productPrice, productId };
    let isRepeated = [];

    if (prevObj) {
      parsedPrevObj = JSON.parse(prevObj);
      isRepeated = parsedPrevObj.find((object) => object.productId === obj.productId);
    }
    // console.log(isRepeated);
    if (!isRepeated) {
      // console.log('isRepeated');
      obj.quantity = 1;
      const fullObj = [...parsedPrevObj, obj];
      const fullStringObj = JSON.stringify(fullObj);
      localStorage.setItem('cartItems', fullStringObj);
    } else {
      // console.log('else');
      const filteredObj = parsedPrevObj.filter((object) => {
        const { productId: id } = object;
        return id !== isRepeated.productId;
      });
      isRepeated.quantity += 1;
      const fullObj = [...filteredObj, isRepeated];
      const fullStringObj = JSON.stringify(fullObj);
      localStorage.setItem('cartItems', fullStringObj);
      console.log(fullStringObj);
    }
  }

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
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ this.handleClick }
        >
          Adicionar ao carrinho
        </button>
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
