import React from "react";
import './App.css';

import {BrowserRouter as Router, NavLink, Route, Redirect, Switch} from 'react-router-dom';
import Auth from "./pages/Auth/Auth";
import Calendar from "./pages/Calendar/Calendar";

export default function App() {
  
  state = {
    userId: localStorage.getItem('userId'),
    token: localStorage.getItem('token'),
  }
  login = (token, userId, tokenExpiration) => {
    localStorage.setItem('userId',userId);
    localStorage.setItem('token',token);
    this.setState({userId: localStorage.getItem('userId'), token:localStorage.getItem('token')});
  }

  logout = () => {
    localStorage.clear();
    this.setState({userId: null, token: null})
  }
  return (
    <div className="App">
        <Router>
          <Switch>
            <Redirect to='/auth' from='/' exact/>
            <Route path='/auth' component={Auth}/>
            <Route path='/calendar' component={Calendar}/>
          </Switch>
        </Router>
    </div>
  );
}