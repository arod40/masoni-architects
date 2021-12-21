import { createGlobalStyle } from 'styled-components';

const Typography = createGlobalStyle`
  html{
    font-family: var(--typo-text);
    color: var(--black);
  }
  *{
    font-family: var(--typo-text);
  }
  h1,h2,h3,h4,h5,h6{
    font-family: var(--typo-main);
  }
`;

export default Typography;
