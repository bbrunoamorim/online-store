import React, { Component } from 'react';

export default class EvaluationForm extends Component {
  createRadioInput() {
    const LIMIT = 6;
    const radios = [];
    for (let index = 1; index < LIMIT; index += 1) {
      radios.push(
        <input
          type="radio"
          data-testid={ `${index}-rating` }
        />,
      );
    }
    return radios;
  }

  render() {
    return (
      <form>
        <h2>Avaliações</h2>
        <input
          type="email"
          data-testid="product-detail-email"
          placeholder="Email"
          required
        />
        { this.createRadioInput() }
        <textarea
          data-testid="product-detail-evaluation"
          placeholder="Mensagem (opcional)"
        />
        <button type="button" data-testid="submit-review-btn">Avaliar</button>
      </form>
    );
  }
}
