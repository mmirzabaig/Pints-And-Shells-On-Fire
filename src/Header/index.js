import React from 'react';
import { Header } from 'semantic-ui-react';
import BrewTour from '../BrewTour';
import './Header.css';
import { Link } from 'react-router-dom';
import MenuExampleInvertedSecondary from '../Navbar';



const HeaderApp = () => {

  return (
    <Header>
      <MenuExampleInvertedSecondary />
    </Header>
    )
}

export default HeaderApp;
