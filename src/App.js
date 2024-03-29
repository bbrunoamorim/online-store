import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import Main from './components/Main';
import Cart from './components/Cart';
import Item from './components/Item';
import Checkout from './components/Checkout';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.addCartFunc = this.addCartFunc.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.quantityItemIncrease = this.quantityItemIncrease.bind(this);
    this.quantityItemDecrease = this.quantityItemDecrease.bind(this);
    this.updateCartQuantity = this.updateCartQuantity.bind(this);

    this.state = {
      cartItems: [],
      cartQuantity: 0,
    };
  }

  componentDidMount() {
    const storageList = JSON.parse(localStorage.getItem('cartItems'));
    if (storageList) {
      this.setState({
        cartItems: storageList,
      }, this.updateCartQuantity());
    }
  }

  updateCartQuantity() {
    const storageList = JSON.parse(localStorage.getItem('cartItems'));
    if (storageList) {
      const totalQuantity = storageList.map((item) => item.quantity)
        .reduce((acc, curr) => acc + curr);
      this.setState({ cartQuantity: totalQuantity });
    }
  }

  addCartFunc(receivedObj) {
    const obj = receivedObj;
    const { cartItems } = this.state;
    if (cartItems.length === 0) {
      obj.quantity = 1;
      this.setState({
        cartItems: [obj],
      }, this.updateLocalStorage([obj]));
    } else {
      const foundObj = cartItems.find((item) => item.id === receivedObj.id);
      if (foundObj) {
        const filteredList = cartItems.filter((item) => item.id !== foundObj.id);
        foundObj.quantity += 1;
        this.setState({
          cartItems: [...filteredList, foundObj],
        }, this.updateLocalStorage([...filteredList, foundObj]));
      } else {
        obj.quantity = 1;
        this.setState((prevState) => {
          this.updateLocalStorage([...prevState.cartItems, receivedObj]);
          return ({
            cartItems: [...prevState.cartItems, receivedObj],
          });
        });
      }
    }
  }

  updateLocalStorage(receivedList) {
    localStorage.setItem('cartItems', JSON.stringify(receivedList));
    this.updateCartQuantity();
  }

  quantityItemIncrease(item) {
    const { cartItems } = this.state;
    console.log(item);
    const filteredList = cartItems.filter((each) => each.id !== item.id);
    if (item.quantity < item.availableQuantity) {
      item.quantity += 1;
    }
    this.setState({
      cartItems: [...filteredList, item],
    }, this.updateLocalStorage([...filteredList, item]));
  }

  quantityItemDecrease(item) {
    if (item.quantity !== 1) {
      const { cartItems } = this.state;
      const filteredList = cartItems.filter((each) => each.id !== item.id);
      item.quantity -= 1;
      this.setState({
        cartItems: [...filteredList, item],
      }, this.updateLocalStorage([...filteredList, item]));
    }
  }

  changeQuantity(type, id) {
    const { cartItems } = this.state;
    const foundItem = cartItems.find((item) => item.id === id);
    if (type === 'plus') this.quantityItemIncrease(foundItem);
    if (type === 'minus') this.quantityItemDecrease(foundItem);
  }

  removeItem(item) {
    const { cartItems } = this.state;
    const filteredList = cartItems.filter((each) => each.id !== item.id);
    this.setState({
      cartItems: [...filteredList],
    }, this.updateLocalStorage([...filteredList]));
  }

  render() {
    const { addCartFunc, changeQuantity, removeItem } = this;
    const { cartItems, cartQuantity } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Main addCartFunc={ addCartFunc } cartQuantity={ cartQuantity } />
          </Route>
          <Route exact path="/cart">
            <Cart
              cartItems={ cartItems }
              changeQuantity={ changeQuantity }
              removeItem={ removeItem }
            />
          </Route>
          <Route
            exact
            path="/item/:id"
            render={ (props) => (<Item
              { ...props }
              addCartFunc={ addCartFunc }
              cartQuantity={ cartQuantity }
            />) }
          />
          <Route path="/checkout">
            <Checkout />
          </Route>
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
