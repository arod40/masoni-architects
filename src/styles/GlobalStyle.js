import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  :root{
    --gray-1: #BCB4B4;
    --white : white;
    --black: black;
    --ivory: ivory;
    --typo-main: Helvetica, Arial, sans-serif;
    --typo-text: Courier, sans-serif;
  }
  html{
    font-size: 10px;
    font-family: var(---typo-text);
    background-color: var(--gray-1);
  }
  ul,li{
    list-style: none;
  }
  a{
    text-decoration: none;
  }
  button{
    outline: none
  }
  img{
    pointer-events: none;
  }
`;
export default GlobalStyles;
