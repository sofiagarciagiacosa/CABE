import "./Hero.css";
import logo from "../../assets/L.ROJO.png";

function Hero() {
  return (
    <section className="hero">
      <img src={logo} alt="Logo CABE" className="hero-image" />
    </section>
  );
}

export default Hero;
