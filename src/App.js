import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';

// home component
import HomePage from './pages/HomePage/HomePage';
import userService from './utils/userService';

import ViewSong from './components/ViewSong/ViewSong';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };  
  }

  handleSignup = () => {
    this.setState({user: userService.getUser()})
  }

  componentDidMount() {
    let user = userService.getUser();
    this.setState({user});
  }

  handleLogout = () => {
    userService.logout();
    this.setState({user: null});
  }

  handleStore = () => {

    this.setState({user: null});
  }

  render() {
    return (
      <React.Fragment>
        <div>
            <NavBar user={this.state.user} handleLogout={this.handleLogout} />
        </div>

        <Switch>
          <Route exact path="/" render={
            () => <HomePage />
          }>
          </Route>
          
          <Route exact path="/login">
            <LoginPage />
          </Route>

          <Route exact path="/signup" render={
            (props) => <SignupPage {...props} handleSignup={this.handleSignup} />
          } />

          <Route exact path="/songs/:song_id" render={
            (props) => <ViewSong {...props} />
          } />

        </Switch>
      </React.Fragment>
    );
  }
}

export default App;


