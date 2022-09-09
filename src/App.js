import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import ProductsResult from './components/ProductsResult';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main />
          <ProductsResult />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
