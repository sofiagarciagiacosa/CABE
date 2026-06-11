import "./Footer.css";
import logo from "../../assets/ISOLOGO.png";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer__bg-text">
        CABE
      </div>

      <div className="footer__top">

        <img
          src={logo}
          alt="CABE Agencia Boutique"
          className="footer__logo"
        />

        <div className="footer__socials">
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
          <a href="#">LinkedIn</a>
        </div>

      </div>

      <div className="footer__line"></div>

      <div className="footer__bottom">
        <span>
          © {new Date().getFullYear()} CABE
        </span>
      </div>

    </footer>
  );
}

export default Footer;