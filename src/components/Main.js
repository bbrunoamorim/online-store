import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import ProductsResult from './ProductsResult';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.apiCaller = this.apiCaller.bind(this);

    this.state = {
      categories: [],
      queryInput: '',
      searchedProducts: [],
      startSearch: false,
    };
  }

  componentDidMount() {
    this.apiCaller();
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({ [name]: value });
  };

  handleClick = async ({ target }) => {
    this.setState({ startSearch: true });
    if (target.id === 'query-button') {
      const { queryInput } = this.state;
      const data = await getProductsFromCategoryAndQuery('', queryInput);
      this.setState({ searchedProducts: data.results });
      // console.log(data.results);
    } else {
      const data = await getProductsFromCategoryAndQuery(target.id);
      // console.log(target.id);
      this.setState({ searchedProducts: data.results });
    }
  };

  apiCaller = () => {
    getCategories().then((data) => this.setState({ categories: data }));
  };

  render() {
    const { categories, searchedProducts, queryInput, startSearch } = this.state;
    const { addCartFunc } = this.props;
    const hasItemOnList = searchedProducts.length > 0;
    return (
      <>
        <Header
          handleChange={ this.handleChange }
          handleClick={ this.handleClick }
          queryInput={ queryInput }
        />
        <div className="initial-message-container">
          { !hasItemOnList
          && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}
        </div>
        <div className="main-content">

          <div className="categories-container">
            { categories !== []
        && categories.map((categoria) => (<input
          data-testid="category"
          value={ categoria.name }
          type="button"
          id={ categoria.id }
          key={ categoria.id }
          onClick={ this.handleClick }
        />))}
          </div>
          <ProductsResult
            addCartFunc={ addCartFunc }
            startSearch={ startSearch }
            searchedProducts={ searchedProducts }
          />
        </div>
      </>
    );
  }
}

Main.propTypes = {
  addCartFunc: PropTypes.func.isRequired,
};
