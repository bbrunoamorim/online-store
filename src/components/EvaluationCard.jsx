import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EvaluationCard extends Component {
  render() {
    const { email, text, rating } = this.props;

    return (
      <section>
        <p data-testid="review-card-email">{ email }</p>
        <p data-testid="review-card-rating">{ rating }</p>
        <p data-testid="review-card-evaluation">{ text }</p>
      </section>
    );
  }
}

EvaluationCard.propTypes = {
  email: PropTypes.string,
  text: PropTypes.string,
  rating: PropTypes.string,
}.isRequired;
