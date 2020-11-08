//import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import {Uploader} from './Uploader/Uploader'
import {NavBar} from './NavBar/NavBar'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Uploader/>
    </div>
  );
}

export default App;
