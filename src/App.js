import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import Cart from './components/Cart';
import Item from './components/Item';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route
          exact
          path="/item/:id"
          render={ (props) => <Item { ...props } /> }
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

export default App;
