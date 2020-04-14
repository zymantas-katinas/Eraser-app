import React, {useState, useRef, useEffect} from 'react';
import Nav from './components/Nav.jsx';
import Header from './components/Header.jsx';
import Gallery from './components/Gallery/Gallery.jsx';
import Draw from './components/Draw/Draw.jsx';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {

  const [pointerPos, setPointerPos] = useState([{x: 0, y: 0}])
    // define style for Pointer
  const pointerStyle = {
    top: pointerPos.y - 10 + "px", 
    left: pointerPos.x - 10 + "px", 
  }
    // define pointer position on mouseMove
  const handleMouseMove = (e) => {
    const x = e.clientX 
    const y = e.pageY
    setPointerPos({
      x, y
    })
  }
  useEffect(() => {
    if(window.location.pathname === "/draw") {
      a.current.style.cursor = "none"
    } else {
      a.current.style.cursor = "auto"
    }
  }, [window.location.pathname])
 
  const a = useRef();
  return (
    <Router>
      <div ref = {a} className = "app" onMouseMove ={handleMouseMove} >
      {window.location.pathname === "/draw" ? <div className ="pointer" style ={pointerStyle}></div> : null}
        <Nav />
          <Route path="/" exact component={Header} />
          <Route path="/draw" component={Draw} />
          <Route path="/gallery" component={Gallery} /> 
      </div>
    </Router>
  );
}

export default App;
