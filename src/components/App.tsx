import React, { Component } from 'react';
import './App.sass';
import Popular from './Popular';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NavBar from './Nav'
import Home from './Home'
import Battle from './Battle'
import Results from "./Battle/Results";



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <NavBar/>
          <Switch>
            <Route exact path='/TwitterBattle' component={Home} />
            <Route exact path='/TwitterBattle/battle' component={Battle} />
            <Route path='/TwitterBattle/battle/results' component={Results} />
            <Route path='/TwitterBattle/popular' component={Popular} />
            <Route render={() => <p>Not Found</p>} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
