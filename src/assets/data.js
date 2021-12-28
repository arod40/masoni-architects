import im1 from './pictures/2017_AM_Potfolio_DiDa_page-0001.jpg';
import im2 from './pictures/2017_AM_Potfolio_DiDa_page-0002.jpg';
import im3 from './pictures/2017_AM_Potfolio_DiDa_page-0002 (1).jpg';
import im4 from './pictures/2017_AM_Potfolio_DiDa_page-0003.jpg';
import im5 from './pictures/2017_AM_Potfolio_DiDa_page-0003 (1).jpg';
import im6 from './pictures/2017_AM_Potfolio_DiDa_page-0017.jpg';

const data = {
  contacts: [
    {
      email: 'arch.alessandromasoni@gmail.com',
      linkedin: 'https://www.linkedin.com/in/alessandro-masoni-2a18b161',
      orcid: 'https://orcid.org/0000-0002-7572-712X',
    },
  ],
  homepage: {
    file: im1,
  },
  contactpage: {
    file: im6,
  },
  pages: {
    1: {
      file: im2,
      header: 'Consultancy for Elcimai Ingenierie',
      subheader:
        '"Maestro de Obra" for the extension of the Havana Club rum factory in San José de las Lajas',
      year: 2019,
      index: true,
      pages: [1, 2],
      thumbnail: im2,
    },
    2: {
      file: im3,
      index: false,
    },
    3: {
      file: im4,
      header: 'Women Centers',
      subheader:
        'Prototype: for 17 rural communities in Swaziland. Built 1st stage in Mambane and Lwandle',
      year: 2017,
      index: true,
      pages: [3, 4],
      thumbnail: im4,
    },
    4: {
      file: im5,
      index: false,
    },
  },
};

export default data;
