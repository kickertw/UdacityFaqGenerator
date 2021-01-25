import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import MainTable from './components/MainTable';
import FaqItem from './components/FaqItem';
import Login from './components/Login';
import TinyMceTest from './components/TinyMceTest';

import './App.css';

function App() {
  const [user, setUser] = useState({ userInfo: null});
  document.title = 'Udacity AMA Transcripts - Phase 1 - AI for Business';

  return (
    <Router>
      <div>
        <h1 className="main-header">Udacity AMA Transcripts</h1>
      </div>
      <Switch>
        <Route exact path="/">
          <MainTable user={user} />
        </Route>
        <Route path="/login">
          <Login user={user} setUser={setUser} />
        </Route>
        <Route path="/item/:id?">
          <FaqItem user={user} />
        </Route>
        <Route path="/test">
          <TinyMceTest />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
