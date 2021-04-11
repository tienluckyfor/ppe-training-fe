// import logo from './logo.svg';
// import './App.css';
import './assets/css/dist/tailwind.css';
import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import RegisterUser from './pages/users/RegisterUser';
import LoginUser from './pages/users/LoginUser';
import ForgotPassword from './pages/users/ForgotPassword';
import CreatePost from './pages/posts/CreatePost'
import ListPost from './pages/posts/ListPost'
import EditPost from './pages/posts/EditPost'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={'/EditPost/:post_id'}
          component={EditPost}
        />
        <Route
          exact
          path={'/ListPost'}
          component={ListPost}
        />
        <Route
          exact
          path={'/CreatePost'}
          component={CreatePost}
        />
        <Route
          exact
          path={'/RegisterUser'}
          component={RegisterUser}
        />
        <Route
          exact
          path={'/LoginUser'}
          component={LoginUser}
        />
        <Route
          exact
          path={'/ForgotPassword'}
          component={ForgotPassword}
        />
        <Route
          exact
          path={'/'}
          render={() => <Redirect to="/RegisterUser" />}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
