import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../assets/icon.svg';
import './App.global.css';

const Hello = () => {
  return (
    <>
     {/* <div>
       <div className="Hello">
         <img width="200px" alt="icon" src={icon} />
       </div>
       <h1>electron-react-boilerplate</h1>
       <div className="Hello">
         <a
           href="https://electron-react-boilerplate.js.org/"
           target="_blank"
           rel="noreferrer"
         >
           <button type="button">
             <span role="img" aria-label="books">
               📚
             </span>
             Read our docs
           </button>
         </a>
         <a
           href="https://github.com/sponsors/electron-react-boilerplate"
           target="_blank"
           rel="noreferrer"
         >
           <button type="button">
             <span role="img" aria-label="books">
               🙏
             </span>
             Donate
           </button>
         </a>
       </div>
     </div> */}
    <p id="title">FFmpeg Generator - Converting M3U8 to Command</p>
    <div id="content">
      <input type="text" id="url"></input>
      <button type="button" id="convertBtn">변환</button>
    </div>

    <div id="all"></div>
    <div id="hour"></div>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
