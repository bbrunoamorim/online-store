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
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const {
        fullname,
        email,
        cpf,
        phone,
        cep,
        address,
        payment,
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
      <div className="checkout-container">
        { redirect && <Redirect to="/" /> }
        { conditionShowError && <p data-testid="error-msg">Campos inválidos</p> }
        <table>
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
        <form>
          <input
            data-testid="checkout-fullname"
            type="text"
            placeholder="Nome Completo"
            name="fullname"
            value={ fullname }
            onChange={ handleChange }
            required
          />
          <input
            data-testid="checkout-email"
            type="email"
            placeholder="Email"
            name="email"
            value={ email }
            onChange={ handleChange }
            required
          />
          <input
            data-testid="checkout-cpf"
            type="text"
            placeholder="CPF"
            name="cpf"
            value={ cpf }
            onChange={ handleChange }
            required
          />
          <input
            data-testid="checkout-phone"
            type="text"
            placeholder="Telefone"
            name="phone"
            value={ phone }
            onChange={ handleChange }
            required
          />
          <input
            data-testid="checkout-cep"
            type="text"
            placeholder="CEP"
            name="cep"
            value={ cep }
            onChange={ handleChange }
            required
          />
          <input
            data-testid="checkout-address"
            type="text"
            placeholder="Endereço"
            name="address"
            value={ address }
            onChange={ handleChange }
            required
          />
          <div>
            <input
              data-testid="ticket-payment"
              type="radio"
              value="Boleto"
              name="payment"
              onChange={ handleChange }
              required
            />
            {' Boleto '}
            <input
              onChange={ handleChange }
              data-testid="visa-payment"
              type="radio"
              value="Visa"
              name="payment"
              required
            />
            {' Visa '}
            <input
              data-testid="master-payment"
              type="radio"
              value="Master"
              name="payment"
              onChange={ handleChange }
              required
            />
            {' MasterCard '}
            <input
              onChange={ handleChange }
              data-testid="elo-payment"
              type="radio"
              value="Elo"
              name="payment"
              required
            />
            {' Elo '}
          </div>
          <input
            onClick={ handleSubmit }
            type="button"
            value="Submit"
            data-testid="checkout-btn"
          />
        </form>
      </div>
    );
  }
}
