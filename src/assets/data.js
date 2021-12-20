import im1 from './pictures/2017_AM_Potfolio_DiDa_page-0001.jpg';
import im2 from './pictures/2017_AM_Potfolio_DiDa_page-0002.jpg';
import im3 from './pictures/2017_AM_Potfolio_DiDa_page-0003.jpg';
import im17 from './pictures/2017_AM_Potfolio_DiDa_page-0017.jpg';

const data = {
  home: {
    file: im1,
  },
  contact: {
    file: im17,
  },
  pages: {
    1: {
      file: im2,
      header: 'Consultancy for Elcimai Ingenierie',
      subheader:
        '"Maestro de Obra" for the extension of the Havana Club rum factory in San José de las Lajas',
      year: 2019,
      index: true,
    },
    2: {
      file: im3,
      header: 'Women Centers',
      subheader:
        'Prototype: for 17 rural communities in Swaziland. Built 1st stage in Mambane and Lwandle',
      year: 2017,
      index: true,
    },
  },
};

export default data;
