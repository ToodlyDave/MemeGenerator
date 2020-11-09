//import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import {Uploader} from './Uploader/Uploader'
import {NavBar} from './NavBar/NavBar'
import {Template} from './Templates/Templates'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Uploader></Uploader>
    </div>
  );
}

export default App;
