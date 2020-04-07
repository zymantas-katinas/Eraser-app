import React, {useState, useEffect, useRef} from 'react';
import Nav from './components/Nav.jsx';
import Header from './components/Header.jsx';
import Gallery from './components/Gallery.jsx';
import Draw from './components/Draw.jsx'

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
