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
    submitted: false,
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
    this.setState({ [name]: value, submitted: false });
    // console.log(target);
  };

  handleFormSubmit = () => {
    const { email, rating, text, evaluations } = this.state;
    const { productId } = this.props;
    const MAX_RATING = 5;
    const emailCheck = email.includes('@');
    this.setState({ submitted: true });
    // console.log(target);
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
          key={ rating }
          type="radio"
          name="rating"
          value={ rating }
          onChange={ this.handleChange }
          required
          className="mx-1 accent-purple-600"
        />,
      );
    }
    return radios;
  }

  render() {
    const { email, text, evaluations, formValidation, submitted } = this.state;

    return (
      <div>
        <form className="flex-col">
          <h2 className="my-4 font-medium">Faça a sua avaliação sobre o produto</h2>
          <fieldset>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={ email }
              onChange={ this.handleChange }
              required
              className="px-2 py-1 outline outline-2 outline-blue-500 rounded-md"
            />
          </fieldset>
          <fieldset>
            <input
              name="text"
              placeholder="Mensagem (opcional)"
              value={ text }
              onChange={ this.handleChange }
              className="px-2 py-1 outline outline-2 outline-blue-500 rounded-md mt-2"
            />
          </fieldset>
          <fieldset className="my-3">
            { this.createRadioInput() }
          </fieldset>
          <button
            type="button"
            onClick={ this.handleFormSubmit }
            className="mb-5 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-300
            p-1 rounded-md text-white font-medium
            hover:font-semibold hover:bg-blue-400 transition-colors
            duration-200 cursor-pointer w-1/2 mx-auto"
          >
            Avaliar
          </button>
        </form>
        {
          submitted && !formValidation && <p>Campos inválidos</p>
        }
        {
          evaluations !== []
            ? (
              evaluations.map((evaluation, index) => (
                <EvaluationCard
                  key={ index }
                  email={ evaluation.email }
                  rating={ evaluation.rating }
                  text={ evaluation.text }
                />
              )))
            : null
        }
      </div>
    );
  }
}

EvaluationForm.propTypes = {
  productId: PropTypes.string.isRequired,
};
