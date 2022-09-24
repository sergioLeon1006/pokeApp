import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,

} from "react-router-dom";
import { Login,Home,Pokemon,Favorites,Draw } from './components';

function App() {
  const loginValidation = window.localStorage.getItem('session');

  return (
    
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/pokemon/:pokemonId" element={<Pokemon/>} />
        <Route path="/pokemon" element={<Home/>} />
        <Route path="/favorites" element={<Favorites/>} />
        <Route path="/draw" element={<Draw/>} />
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<Home/>} />
      </Routes>
    </Router>
    
  );
}

export default App;
