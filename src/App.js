import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import Cart from './components/Cart';
import Item from './components/Item';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.addCartFunc = this.addCartFunc.bind(this);

    this.state = {
      cartItems: [],
    };
  }

  addCartFunc(receivedObj) {
    const obj = receivedObj;
    const { cartItems } = this.state;
    if (cartItems.length === 0) {
      obj.quantity = 1;
      this.setState({
        cartItems: [obj],
      });
    } else {
      const foundObj = cartItems.find((item) => item.id === receivedObj.id);
      if (foundObj) {
        const filteredList = cartItems.filter((item) => item.id !== foundObj.id);
        foundObj.quantity += 1;
        this.setState({
          cartItems: [...filteredList, foundObj],
        });
      } else {
        obj.quantity = 1;
        this.setState((prevState) => ({
          cartItems: [...prevState.cartItems, receivedObj],
        }));
      }
    }
  }

  render() {
    const { addCartFunc } = this;
    const { cartItems } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Main addCartFunc={ addCartFunc } />
          </Route>
          <Route exact path="/cart">
            <Cart cartItems={ cartItems } />
          </Route>
          <Route
            exact
            path="/item/:id"
            render={ (props) => <Item { ...props } addCartFunc={ addCartFunc } /> }
          />
          <Route
            path="*"
            render={ () => (
              <p>Not found</p>
            ) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
