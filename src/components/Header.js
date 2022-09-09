import React, { Component } from 'react';

export default class header extends Component {
  render() {
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
            <button
              type="submit"
            >
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
