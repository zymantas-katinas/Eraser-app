import React, {useState, useEffect, useRef} from 'react';
import Nav from './components/Nav';
import Header from './components/Header';
import Gallery from './components/Gallery';
import Draw from './components/Draw'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
 
function App() {

  return (
    <Router>
      <div className = "app" >
        <Nav />
        <Header />
        <Route path="/draw" component={Draw} />
        <Route path="/gallery" component={Gallery} />
      </div>
    </Router>
  );
}

export default App;
