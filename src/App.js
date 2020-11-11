//import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import {Uploader} from './Uploader/Uploader'
import {NavBar} from './NavBar/NavBar'
import {Template} from './Templates/Templates'

function App() {
  return (
    <div className="App">
      <header>
        <link rel="preconnect"
        href="https://fonts.googleapis.com"
        crossorigin />
        <link rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css?family=Montserrat:400,900,600&display=swap" />
        <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Montserrat:400,900,600&display=swap"
        />
        <link rel="preconnect"
        href="https://cdnjs.cloudflare.com"
        crossorigin />
        <link rel="preload"
        as="style"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </header>
      <NavBar/>
      <Uploader></Uploader>
    </div>
  );
}

export default App;
