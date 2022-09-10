import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

export default class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      attributes: [],
    };
  }

  componentDidMount() {
    const { props } = this;
    const { params } = props.match;
    const { id } = params;
    const getInfoProduct = async () => {
      const data = await getProductById(id);
      this.setState({
        data,
        attributes: data.attributes,
      });
    };

    getInfoProduct();
  }

  render() {
    const { data, attributes } = this.state;
    const { title, price, thumbnail } = data;
    return (
      <div className="info-item-container">
        <p data-testid="product-detail-name">{title}</p>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <p data-testid="product-detail-price">{price}</p>
        <ol>
          { attributes.map((each) => (
            <li key={ each.id }>{`${each.name}: ${each.value_name}`}</li>
          )) }
        </ol>
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          Adicionar ao carrinho
        </Link>
      </div>
    );
  }
}

Item.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
