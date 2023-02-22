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
    } else {
      const data = await getProductsFromCategoryAndQuery(target.id);
      this.setState({ searchedProducts: data.results });
    }
  };

  apiCaller = () => {
    getCategories().then((data) => this.setState({ categories: data }));
  };

  render() {
    const { categories, searchedProducts, queryInput, startSearch } = this.state;
    const { addCartFunc, cartQuantity } = this.props;
    return (
      <div className="bg-gray-100 min-h-screen">
        <Header
          handleChange={ this.handleChange }
          handleClick={ this.handleClick }
          queryInput={ queryInput }
          cartQuantity={ cartQuantity }
        />
        <section className="p-1">
          <div className="group overflow-hidden float-left ml-5">
            <button
              type="button"
              className="px-3 bg-blue-400 rounded-md hover:font-medium
              hover:bg-blue-500 text-sm transition-colors duration-200"
            >
              Selecione a categoria
              <img src="/images/caret-down.svg" alt="arrow-down" className="inline" />
            </button>
            {
              categories !== []
                ? (
                  <div>
                    {
                      categories.map((categoria) => (
                        <input
                          value={ categoria.name }
                          type="button"
                          id={ categoria.id }
                          key={ categoria.id }
                          onClick={ this.handleClick }
                          className="hidden group-hover:block cursor-pointer bg-blue-300
                          w-full p-1 my-1 rounded-md hover:font-medium text-xs
                          hover:bg-blue-400 transition-colors duration-200"
                        />))
                    }
                  </div>
                )
                : null
            }
          </div>
          <ProductsResult
            addCartFunc={ addCartFunc }
            startSearch={ startSearch }
            searchedProducts={ searchedProducts }
          />
        </section>
      </div>
    );
  }
}

Main.propTypes = {
  addCartFunc: PropTypes.func.isRequired,
  cartQuantity: PropTypes.number.isRequired,
};
