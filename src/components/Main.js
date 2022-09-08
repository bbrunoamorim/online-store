import React, { Component } from 'react';
import Header from './Header';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  render() {
    const { list } = this.state;
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
      </>
    );
  }
}
