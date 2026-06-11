import { useEffect } from "react";
import "./Services.css";
import Footer from "../../components/Footer/Footer";

// imágenes (después las reemplazás)
import placeholderImg from "../../assets/placeholder.webp";

const services = [
  {
    id: "estrategia",
    number: "01",
    image: placeholderImg,
    title: "Estrategia y construcción de marca",
    text:
      "Trabajamos en la base de todo proyecto: su identidad. Definimos propósito, posicionamiento y dirección comunicacional para que cada marca tenga claridad sobre quién es, qué dice y hacia dónde va."
  },
  {
    id: "branding",
    number: "02",
    image: placeholderImg,
    title: "Branding y desarrollo visual",
    text:
      "Traducimos la estrategia en una identidad tangible. Diseñamos sistemas visuales con coherencia y personalidad, pensados para sostenerse en el tiempo y adaptarse a distintos contextos sin perder su esencia."
  },
  {
    id: "contenido",
    number: "03",
    image: placeholderImg,
    title: "Creación de contenido",
    text:
      "Desarrollamos contenido que conecta, no que rellena. Pensamos cada pieza desde la estrategia, la estética y el mensaje, para construir comunicación que tenga dirección y genere vínculo real con la audiencia."
  },
  {
    id: "direccion-creativa",
    number: "04",
    image: placeholderImg,
    title: "Dirección creativa y producción",
    text:
      "Conceptualizamos y llevamos adelante producciones de principio a fin. Armamos equipos a medida para cada proyecto, coordinando cada etapa con criterio y cuidado por el detalle."
  },
  {
    id: "consultoria",
    number: "05",
    image: placeholderImg,
    title: "Acompañamiento y consultoría",
    text:
      "Pensado para marcas en etapa inicial o en proceso de ordenarse. Trabajamos de manera personalizada, 1:1, para ayudarte a construir y hacer crecer tu marca paso a paso."
  }
];

function Services() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");

    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);

        if (element) {
          const navbarHeight = 90;

          const y =
            element.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight;

          window.scrollTo({
            top: y,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  }, []);
  useEffect(() => {
    const closingTitle =
      document.querySelector(".closing-title-wrap");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          closingTitle.classList.add("visible");
        }
      },
      { threshold: 0.55 }
    );

    if (closingTitle) {
      observer.observe(closingTitle);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <main className="services-page">

      {/* HERO */}
      <section className="services-hero">

        <span className="services-page-label">
          WHAT WE DO
        </span>

        <h1>
          Qué <br />
          hacemos
        </h1>

        <p className="services-intro">
          Construimos marcas con estrategia,
          sensibilidad y dirección creativa.
          Cada proyecto requiere una mirada distinta,
          por eso no trabajamos desde fórmulas.
        </p>

      </section>

      {/* SERVICES */}
      <section className="services-list">

        {services.map((service) => (
          <article
            id={service.id}
            className="service-block"
            key={service.id}
          >

            <div className="service-image-wrap">

              <img
                src={service.image}
                alt={service.title}
                className="service-image"
              />

            </div>

            <div className="service-content">

              <div className="service-top">

                <span className="service-number">
                  {service.number}
                </span>


              </div>

              <h2>
                {service.title}

                
              </h2>

              <p>
                {service.text}
              </p>

            </div>

          </article>
        ))}

      </section>

      {/* CIERRE */}
      <section className="services-closing">

        <span className="services-page-label">
          OUR APPROACH
        </span>

        <div className="closing-text">

          <div className="closing-title-wrap">

            <p className="closing-main reveal-line ">
              No trabajamos en serie.
            </p>

            <span className="closing-star">
              ✦
            </span>

          </div>

          <p>
            Cada proyecto es distinto,
            y por eso cada proceso también lo es.
          </p>

          <p className="closing-muted">
            Elegimos involucrarnos donde
            podemos aportar valor real.
          </p>

        </div>

      </section>

      <Footer />

    </main>
  );
}

export default Services;