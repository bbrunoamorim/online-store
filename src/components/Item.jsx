import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import EvaluationForm from './EvaluationForm';

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
    const { addCartFunc } = this.props;
    const { data, attributes } = this.state;
    const { title, price, thumbnail, id } = data;
    const { match: { params } } = this.props;
    const obj = {
      name: title,
      image: thumbnail,
      price,
      id,
    };
    return (
      <section
        className="flex-col mx-auto mt-4 text-center px-2 py-5"
      >
        <div
          className="mb-5 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-300
          p-1 rounded-md text-white font-medium
          hover:font-semibold hover:bg-blue-400 transition-colors
          duration-200 cursor-pointer w-2/3 mx-auto"
        >
          <Link to="/">Voltar</Link>
        </div>
        <div>
          <p className="font-medium text-lg my-5">{ title }</p>
          <img src={ thumbnail } alt={ title } className="inline w-32 h-32" />
          <p className="font-medium my-3">{ `R$ ${price}` }</p>
          <ol className="divide-y-2 w-2/3 mx-auto">
            {
              attributes.map((each) => (
                <li
                  key={ each.id }
                  className="text-sm my-2"
                >
                  { `${each.name}: ${each.value_name}` }
                </li>
              ))
            }
          </ol>
          <button
            onClick={ () => addCartFunc(obj) }
            type="button"
            className="text-sm hover:font-medium my-4"
          >
            Adicionar ao Carrinho
          </button>
          <div
            className="mb-5 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-300
            p-1 rounded-md text-white font-medium
            hover:font-semibold hover:bg-blue-400 transition-colors
            duration-200 cursor-pointer w-2/3 mx-auto"
          >
            <Link
              to="/cart"
            >
              Ver Carrinho
            </Link>
          </div>
        </div>
        <EvaluationForm productId={ params.id } />
      </section>
    );
  }
}

Item.propTypes = {
  addCartFunc: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
