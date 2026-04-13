import "./Footer.css";
import logo from "../../assets/ISOLOGO.png"; 

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        
        <div className="footer__left">
          <img src={logo} alt="CABE Agencia Boutique" className="footer__logo" />
        </div>

        <div className="footer__right">
          <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="#" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>

      </div>

      <div className="footer__bottom">
        © {new Date().getFullYear()} CABE Agencia Boutique
      </div>
    </footer>
  );
}

export default Footer;
