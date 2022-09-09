import React, { Component } from 'react';
import ProductCard from './ProductCard';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default class ProductsResult extends Component {
  state = {
    queryInput: '',
    searchedProducts: [],
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { queryInput } = this.state;
    const data = await getProductsFromCategoryAndQuery('', queryInput);
    this.setState({ searchedProducts: data.results });
  };

  render() {
    const { queryInput, searchedProducts } = this.state;
    return (
      <div>
        <input
          type="text"
          name="queryInput"
          data-testid="query-input"
          value={ queryInput }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleClick }
        >
          Buscar
        </button>
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
