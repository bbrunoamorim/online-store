import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EvaluationCard from './EvaluationCard';

export default class EvaluationForm extends Component {
  state = {
    email: '',
    rating: '',
    text: '',
    formValidation: false,
    evaluations: [],
  };

  componentDidMount() {
    const { productId } = this.props;
    const prevEvaluations = JSON.parse(localStorage.getItem(productId));
    if (prevEvaluations) {
      this.setState({ evaluations: prevEvaluations });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = () => {
    const { email, rating, text, evaluations } = this.state;
    const { productId } = this.props;
    const MAX_RATING = 5;
    const emailCheck = email.includes('@');
    if (emailCheck && email.length > 0
      && Number(rating) > 0 && Number(rating) <= MAX_RATING) {
      this.setState({ formValidation: true });
      const obj = {
        email,
        rating,
        text,
      };
      this.setState((prevState) => ({
        evaluations: [...prevState.evaluations, obj],
      }));
      this.setState({
        email: '',
        rating: '',
        text: '',
      });
      localStorage.setItem(productId, JSON.stringify(evaluations));
    } else {
      this.setState({
        formValidation: false,
      });
    }
  };

  createRadioInput() {
    const LIMIT = 6;
    const radios = [];
    for (let rating = 1; rating < LIMIT; rating += 1) {
      radios.push(
        <input
          type="radio"
          data-testid={ `${rating}-rating` }
          name="rating"
          value={ rating }
          onChange={ this.handleChange }
          required
        />,
      );
    }
    return radios;
  }

  render() {
    const { email, text, evaluations, formValidation } = this.state;

    return (
      <>
        <form>
          <h2>Avaliações</h2>
          <input
            type="email"
            data-testid="product-detail-email"
            name="email"
            placeholder="Email"
            value={ email }
            onChange={ this.handleChange }
            required
          />
          { this.createRadioInput() }
          <textarea
            data-testid="product-detail-evaluation"
            name="text"
            placeholder="Mensagem (opcional)"
            value={ text }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.handleFormSubmit }
          >
            Avaliar
          </button>
        </form>
        {
          !formValidation && <p data-testid="error-msg">Campos inválidos</p>
        }
        {
          evaluations.map((evaluation, index) => (
            <EvaluationCard
              key={ index }
              email={ evaluation.email }
              rating={ evaluation.rating }
              text={ evaluation.text }
            />
          ))
        }
      </>
    );
  }
}

EvaluationForm.propTypes = {
  productId: PropTypes.string.isRequired,
};
