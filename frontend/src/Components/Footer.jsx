import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Footer.css'
import React from 'react';
import './Footer.css'; // optional for styling
import Contactdetails from './Contactdetails';

function Footer() {
  return (
    <footer className="footer-container">
  
        <div className="footer-contactdetails">
        <Contactdetails />
      </div>
    </footer>
  );
}

export default Footer;