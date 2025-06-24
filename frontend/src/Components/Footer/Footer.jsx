import "./Footer.css";
import Contactdetails from "./ContactDetails/ContactDetails";
import MobileMenuControls from "../MobileMenuControls/MobileMenuControls";
//small footer at the bottom of the page which shows my contact details
function Footer() {
  return (
    <footer className="footer-container">
      {" "}
      <div className="mobile-menu-controls">
        <MobileMenuControls />
      </div>
      <div className="footer-contactdetails">
        <Contactdetails />
      </div>
    </footer>
  );
}

export default Footer;
