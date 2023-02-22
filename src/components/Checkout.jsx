import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Checkout extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      items: [],
      fullname: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      payment: '',
      validForm: false,
      enableShowError: false,
      redirect: false,
    };
  }

  componentDidMount() {
    const items = localStorage.getItem('cartItems');
    const parsedItems = JSON.parse(items);
    this.setState({
      items: parsedItems,
    });
  }

  handleSubmit() {
    const { validForm } = this.state;
    this.setState({
      enableShowError: true,
    });
    if (validForm) {
      localStorage.removeItem('cartItems');
      this.setState({
        redirect: true,
      });
    }
  }

  handleChange({ target }) {
    this.setState({ enableShowError: false });
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const {
        fullname,
        email,
        cpf,
        phone,
        address,
        payment,
        cep,
      } = this.state;
      const condition = fullname !== ''
        && email !== ''
        && cpf !== '' && phone !== '' && cep !== '' && address !== '' && payment !== '';
      this.setState({ validForm: condition });
    });
  }

  render() {
    const {
      items,
      fullname,
      email,
      cpf,
      phone,
      cep,
      address,
      enableShowError,
      validForm,
      redirect,
    } = this.state;
    const hasItemOnList = items;
    const { handleSubmit, handleChange } = this;
    const conditionShowError = !validForm && enableShowError;
    return (
      <div className="p-5 w-2/3 mx-auto">
        <h1 className="text-center text-4xl mb-8">Checkout</h1>
        { redirect && <Redirect to="/" /> }
        <table className="table-auto mx-auto text-sm text-center w-2/3">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {
              hasItemOnList && (
                items.map((item) => {
                  const { name, quantity, price, id } = item;
                  return (
                    <tr key={ id }>
                      <td>{ name }</td>
                      <td>{ quantity }</td>
                      <td>{ price }</td>
                    </tr>
                  );
                })
              )
            }
          </tbody>
        </table>
        <form className="my-10 mx-auto flex-col">
          <fieldset>
            <input
              type="text"
              placeholder="Nome Completo"
              name="fullname"
              value={ fullname }
              onChange={ handleChange }
              required
              className="w-full p-1 border border-1 rounded-md mb-2 border-blue-200"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={ email }
              onChange={ handleChange }
              required
              className="w-full p-1 border border-1 rounded-md mb-2 border-blue-200"
            />
          </fieldset>
          <input
            type="text"
            placeholder="CPF"
            name="cpf"
            value={ cpf }
            onChange={ handleChange }
            required
            className="w-full p-1 border border-1 rounded-md mb-2 border-blue-200"
          />
          <input
            type="text"
            placeholder="Telefone"
            name="phone"
            value={ phone }
            onChange={ handleChange }
            required
            className="w-full p-1 border border-1 rounded-md mb-2 border-blue-200"
          />
          <input
            type="text"
            placeholder="CEP"
            name="cep"
            value={ cep }
            onChange={ handleChange }
            required
            className="w-full p-1 border border-1 rounded-md mb-2 border-blue-200"
          />
          <input
            type="text"
            placeholder="Endereço"
            name="address"
            value={ address }
            onChange={ handleChange }
            required
            className="w-full p-1 border border-1 rounded-md mb-2 border-blue-200"
          />
          <div className="flex justify-evenly my-6">
            <input
              type="radio"
              value="Boleto"
              name="payment"
              onChange={ handleChange }
              required
              className="accent-purple-600"
            />
            { ' Boleto ' }
            <input
              onChange={ handleChange }
              type="radio"
              value="Visa"
              name="payment"
              required
              className="accent-purple-600"
            />
            { ' Visa ' }
            <input
              type="radio"
              value="Master"
              name="payment"
              onChange={ handleChange }
              required
              className="accent-purple-600"
            />
            { ' MasterCard ' }
            <input
              onChange={ handleChange }
              type="radio"
              value="Elo"
              name="payment"
              required
              className="accent-purple-600"
            />
            { ' Elo ' }
          </div>
          <input
            onClick={ handleSubmit }
            type="button"
            value="Submit"
            className="mb-2 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-300
            p-1 rounded-md text-white font-medium hover:font-semibold hover:bg-blue-400
            transition-colors duration-200 cursor-pointer mx-auto w-1/2"
          />
        </form>
        {
          conditionShowError
            ? (
              <p className="text-red-500 font-semibold text-center animate-bounce">
                Campos inválidos
              </p>
            )
            : null
        }
      </div>
    );
  }
}
