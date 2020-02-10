import React, { useEffect } from 'react';
import './App.css';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './components/routing/Routes';
//REDUX
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {

  useEffect(() => {
    //we add empty square braket too make it run only once, if the 
    //square bracket is nt there , it will run looplessly
    store.dispatch(loadUser());
  }, []);
  return <div>
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  </div>
}
export default App;
