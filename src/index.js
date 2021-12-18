import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyles from './styles/GlobalStyle';
import Typography from './styles/Typography';

ReactDOM.render(
  <>
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <GlobalStyles />
    <Typography />
    <App />
  </>,
  document.getElementById('root')
);
