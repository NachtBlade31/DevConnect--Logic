import React, { useEffect } from 'react';
import './App.css';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Alert from "./components/layout/Alert";
import { loadUser } from './actions/auth';
//REDUX
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
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
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </Router>
    </Provider>
  </div>
}
export default App;
