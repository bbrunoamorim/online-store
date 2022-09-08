import React, { Component } from 'react';

export default class header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // value: '',
    };
  }

  render() {
    // const { value } = this.state;
    return (
      <header>
        <div className="col-3">
          <p>Store Logo</p>
        </div>
        <div className="col-6">
          <form>
            <label htmlFor="value">
              <input
                id="value"
                type="text"
              />
            </label>
            <button type="submit">
              Pesquisar
            </button>
          </form>
        </div>
        <div className="col-3">
          <p>Carrinho</p>
        </div>
      </header>
    );
  }
}
