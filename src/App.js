import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import BrewTour from './BrewTour';
import NavBar from './NavBar';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Login';
import MainComponent from './MainComponent';
import Register from './Register';
import OtherMap from './OtherMap';
import Testing from './Testing';

class App extends Component {


  render() {

    return (

      <div style={{height: '950px'}}className="App">
        <NavBar />
        <Switch>

          <Route
          exact path='/login'
            render={(props) => <Login  {...props} />}
        />
          <Route exact path="/register" component={Register}/>
          <Route exact path="/" component={MainComponent}/>
          <Route exact path="/brewTour" component={BrewTour} />
          <Route exact path="/OtherMap" component={OtherMap} />
        </Switch>
      </div>
    );
  }
}

export default App;
