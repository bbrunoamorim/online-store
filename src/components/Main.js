import React, { Component } from 'react';
import Header from './Header';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import ProductsResult from './ProductsResult';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.apiCaller = this.apiCaller.bind(this);

    this.state = {
      list: [],
      categories: [],
      queryInput: '',
      searchedProducts: [],
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

  handleClick = async () => {
    const { queryInput } = this.state;
    const data = await getProductsFromCategoryAndQuery('', queryInput);
    this.setState({ searchedProducts: data.results });
  };

  apiCaller = () => {
    getCategories().then((data) => this.setState({ categories: data }));
  };

  render() {
    const { list, categories, searchedProducts, queryInput } = this.state;
    // console.log(categories);
    const hasItemOnList = list.length > 0;
    return (
      <>
        <Header
          handleChange={ this.handleChange }
          handleClick={ this.handleClick }
          queryInput={ queryInput }
        />
        <div>
          { !hasItemOnList
          && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}
        </div>
        <div>
          { categories !== []
        && categories.map((categoria) => (<input
          data-testid="category"
          value={ categoria.name }
          type="button"
          key={ categoria.id }
        />))}
        </div>
        <ProductsResult
          searchedProducts={ searchedProducts }
        />
      </>
    );
  }
}
