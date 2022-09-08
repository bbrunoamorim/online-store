import React, { Component } from 'react';
import Header from './Header';
import { getCategories } from '../services/api';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.ApiCaller = this.ApiCaller.bind(this);

    this.state = {
      list: [],
      categories: '',
    };
  }

  componentDidMount() {
    this.ApiCaller();
  }

  ApiCaller = () => {
    getCategories().then((data) => this.setState({ categories: data }));
  };

  render() {
    this.ApiCaller();
    const { list, categories } = this.state;
    console.log(categories);
    const hasItemOnList = list.length > 0;
    return (
      <>
        <Header />
        <div>
          { !hasItemOnList
          && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}
        </div>
        <div>
          { categories !== ''
        && categories.map((categoria) => (<input
          data-testid="category"
          value={ categoria.name }
          type="button"
          key={ categoria.id }
        />))}
        </div>
      </>
    );
  }
}
