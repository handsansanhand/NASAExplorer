import "./Footer.css";
import Contactdetails from "./Contactdetails/Contactdetails";

//small footer at the bottom of the page which shows my contact details
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
