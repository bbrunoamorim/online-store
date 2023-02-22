import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EvaluationCard extends Component {
  render() {
    const { email, text, rating } = this.props;

    return (
      <section
        className="mx-auto outline outline-1 rounded-md
        p-1 w-1/2 mb-4 shadow-lg bg-gray-50"
      >
        <p className="text-sm">{ email }</p>
        <p className="text-sm">{ rating }</p>
        <p className="text-sm">{ text }</p>
      </section>
    );
  }
}

EvaluationCard.propTypes = {
  email: PropTypes.string,
  text: PropTypes.string,
  rating: PropTypes.string,
}.isRequired;
