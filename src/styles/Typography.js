import { createGlobalStyle } from 'styled-components';
import OpenSansCondensedLight from '../assets/fonts/OpenSansCondensed-Light.ttf';
import DancingScriptRegular from '../assets/fonts/DancingScript-Regular.ttf';

const Typography = createGlobalStyle`
  @font-face {
    font-family: 'Open Sans Condensed';
    src: url(${OpenSansCondensedLight});
    font-style: normal;
  }
  @font-face {
    font-family: 'Dancing Script';
    src: url(${DancingScriptRegular});
    font-style: normal;
  }
  html{
    font-family: var(--typo-text);
    color: var(--black);
  }
  *{
    font-family: var(--typo-text);
    color: var(--black);
  }
  h1,h2,h3,h4,h5,h6{
    font-family: var(--typo-main);
  }
`;

export default Typography;
