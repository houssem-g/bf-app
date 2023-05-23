// https://codingthesmartway.com/modern-react-from-the-beginning-ep2-starting-with-react-components-jsx/
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "./navigation/RouterConfig";
import "./styles/header.module.css"
import './App.css';
import  "./styles/generalData.module.css"

// import "./static/images/*"

const App = () => {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <RouterConfig />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

