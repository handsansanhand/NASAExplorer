import './Contactdetails.css'

import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { FaSquarePhone } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
/*
implementation of contact details, should have:
Email
Phone
Linkedin
Github?
*/
function Contactdetails() {
    return (
       <div className="d-flex align-items-center contact-details">
        
                <a
        href="mailto:jack.kazco@yahoo.ie"
        target="_blank"      // open in new tab
        rel="noopener noreferrer"  // security best practice
        aria-label="E-Mail"
         title="E-Mail"
         className="me-3 no-style-link"
        >
        <MdEmail size={48}  />
        </a>
        
        <a
        href="https://www.linkedin.com/in/jack-wright-018b52289/"
        target="_blank"      // open in new tab
        rel="noopener noreferrer"  // security best practice
        aria-label="LinkedIn Link"
         title="LinkedIn"
         className="me-3 no-style-link"
        >
        <FaLinkedin size={48} />
        </a>
                <a
        href="tel:+3530851593979"
        target="_blank"      // open in new tab
        rel="noopener noreferrer"  // security best practice
        aria-label="Phone Link"
         title="Mobile Phone"
         className="me-3 no-style-link"
        >
        <FaSquarePhone size={48}  />
        </a>
        
        <a
        href="https://github.com/handsansanhand"
        target="_blank"      // open in new tab
        rel="noopener noreferrer"  // security best practice
        aria-label="GitHub Link"
         title="GitHub"
         className="me-3 no-style-link"
        >
        <FaGithubSquare size={48}  />    
        </a>
        
    </div>
    ); 
}

export default Contactdetails;