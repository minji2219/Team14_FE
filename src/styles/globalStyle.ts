import { createGlobalStyle } from 'styled-components';
import PaperlogyBold from '../fonts/PaperlogyBold.ttf';
import PaperlogyRegular from '../fonts/PaperlogyRegular.ttf';
import PaperlogyMedium from '../fonts/PaperlogyMedium.ttf';
import PaperlogyLight from '../fonts/PaperlogyLight.ttf';
import PaperlogyExtra from '../fonts/PaperlogyExtraBold.ttf';

export const Common = {
  colors: {
    primary: '#059770',
    primary05: 'rgba(5,151,112,.5)',
    primary08: 'rgba(5,151,112,.8)',
    yellow: '#F1CF06',
    yellowBg: '#F7F7F7',
    button2: '#73BEAA',
    button3: '#D9D9D9',
    lightGray: '#BBB',
    warning: '#DC0000',
    warning05: 'rgba(220,0,0,.5)',
    complete: '#4788FF',
    complete05: 'rgba(71,136,225,.5)',
  },
  zIndex: {
    common: 100,
    header: 9999,
    modal: 10000,
    dropdown: 1000,
  },
};

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'PaperlogyBold';
    src: local('PaperlogyBold');
    font-style: normal;
    src: url(${PaperlogyBold}) format('truetype');
  }

  @font-face {
    font-family: 'PaperlogyRegular';
    src: local('PaperlogyRegular');
    font-style: normal;
    src: url(${PaperlogyRegular}) format('truetype');
  }

  @font-face {
    font-family: 'PaperlogyMedium';
    src: local('PaperlogyMedium');
    font-style: normal;
    src: url(${PaperlogyMedium}) format('truetype');
  }

  @font-face {
    font-family: 'PaperlogyLight';
    src: local('PaperlogyLight');
    font-style: normal;
    src: url(${PaperlogyLight}) format('truetype');
  }

  @font-face {
    font-family: 'PaperlogyExtra';
    src: local('PaperlogyExtra');
    font-style: normal;
    src: url(${PaperlogyExtra}) format('truetype');
  }
`;
