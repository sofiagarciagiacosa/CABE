import { useRef } from "react";
import { useParams } from "react-router-dom";
import projects from "../../data/projects";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./Project.css";


function Project() {

  const { slug } = useParams();

  const project = projects.find(
    (project) => project.slug === slug
  );


  const horizontalRef = useRef(null);
  const verticalRef = useRef(null);


  /*
  =========================================================
  CAROUSEL BUTTONS
  =========================================================
  */

  const scrollCarousel = (ref, direction) => {

    if (!ref.current) return;

    const amount = ref.current.clientWidth * 0.85;

    ref.current.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });

  };


  /*
  =========================================================
  MOUSE DRAG
  =========================================================
  */

  const handleMouseDown = (ref, event) => {

    if (!ref.current) return;

    const carousel = ref.current;

    carousel.isDragging = true;
    carousel.startX = event.pageX - carousel.offsetLeft;
    carousel.scrollLeftStart = carousel.scrollLeft;

    carousel.classList.add("is-dragging");

  };


  const handleMouseMove = (ref, event) => {

    if (!ref.current || !ref.current.isDragging) return;

    event.preventDefault();

    const carousel = ref.current;

    const x = event.pageX - carousel.offsetLeft;
    const walk = (x - carousel.startX) * 1.2;

    carousel.scrollLeft =
      carousel.scrollLeftStart - walk;

  };


  const handleMouseUp = (ref) => {

    if (!ref.current) return;

    ref.current.isDragging = false;

    ref.current.classList.remove("is-dragging");

  };


  const handleMouseLeave = (ref) => {

    if (!ref.current) return;

    ref.current.isDragging = false;

    ref.current.classList.remove("is-dragging");

  };


  if (!project) {

    return (

      <main className="project-page">

        <div className="project-not-found">

          <h1>
            Proyecto no encontrado.
          </h1>

        </div>

      </main>

    );

  }


  return (

    <main className="project-page">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="project-hero">

        <div className="project-heading">

          <span className="project-label">
            PROYECTO /
          </span>

          <h1>
            {project.title}
          </h1>

        </div>

      </section>



      {/* =====================================================
          COVER
      ===================================================== */}

      <section className="project-cover">

        <img
          src={project.heroImage}
          alt={project.title}
          className="project-cover-image"
        />

      </section>



      {/* =====================================================
          CONTEXTO
      ===================================================== */}

      <section className="project-section">

        <aside className="project-section-label">
          CONTEXTO
        </aside>

        <div className="project-section-content">

          {project.context?.map((paragraph, index) => (

            <p key={index}>
              {paragraph}
            </p>

          ))}

        </div>

      </section>



      {/* =====================================================
          ESTRATEGIA
      ===================================================== */}

      <section className="project-section">

        <aside className="project-section-label">
          ESTRATEGIA
        </aside>

        <div className="project-section-content">

          {project.strategy?.map((paragraph, index) => (

            <p key={index}>
              {paragraph}
            </p>

          ))}

        </div>

      </section>



      {/* =====================================================
          LÍNEA DE PUNTOS
      ===================================================== */}

      <div className="project-dotted-line"></div>



      {/* =====================================================
          GALERÍA IDENTIDAD
      ===================================================== */}

      {project.gallery?.identity?.length > 0 && (

        <section className="project-gallery-horizontal">

          <div className="project-gallery-heading">

            <span className="project-section-label">
              IDENTIDAD
            </span>

            <span className="project-gallery-counter">
              {project.gallery.identity.length} piezas
            </span>

          </div>


          <div
            className="project-horizontal-wrapper"
          >

            <div
              className="project-horizontal-carousel"
              ref={horizontalRef}

              onMouseDown={(event) =>
                handleMouseDown(horizontalRef, event)
              }

              onMouseMove={(event) =>
                handleMouseMove(horizontalRef, event)
              }

              onMouseUp={() =>
                handleMouseUp(horizontalRef)
              }

              onMouseLeave={() =>
                handleMouseLeave(horizontalRef)
              }
            >

              {project.gallery.identity.map((item, index) => (

                <figure
                  className="project-horizontal-slide"
                  key={index}
                >

                  <div className="project-horizontal-image">

                    <img
                      src={item.image}
                      alt={`${project.title} — ${item.description}`}
                      draggable="false"
                    />

                  </div>


                  <figcaption>

                    <span className="project-slide-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span>
                      {item.description}
                    </span>

                  </figcaption>

                </figure>

              ))}

            </div>


            {/* FLECHAS */}

            <div className="project-carousel-controls">

              <button
                type="button"
                className="project-carousel-button"
                onClick={() =>
                  scrollCarousel(horizontalRef, "prev")
                }
                aria-label="Imagen anterior"
              >

                <i className="bi bi-arrow-left"></i>

              </button>


              <button
                type="button"
                className="project-carousel-button"
                onClick={() =>
                  scrollCarousel(horizontalRef, "next")
                }
                aria-label="Imagen siguiente"
              >

                <i className="bi bi-arrow-right"></i>

              </button>

            </div>

          </div>

        </section>

      )}



      {/* =====================================================
          GALERÍA APLICACIONES
      ===================================================== */}

      {project.gallery?.applications?.length > 0 && (

        <section className="project-gallery-vertical">

          <div className="project-gallery-heading">

            <span className="project-section-label">
              APLICACIONES
            </span>

            <span className="project-gallery-counter">
              {project.gallery.applications.length} piezas
            </span>

          </div>


          <div
            className="project-vertical-wrapper"
          >

            <div
              className="project-vertical-carousel"
              ref={verticalRef}

              onMouseDown={(event) =>
                handleMouseDown(verticalRef, event)
              }

              onMouseMove={(event) =>
                handleMouseMove(verticalRef, event)
              }

              onMouseUp={() =>
                handleMouseUp(verticalRef)
              }

              onMouseLeave={() =>
                handleMouseLeave(verticalRef)
              }
            >

              {project.gallery.applications.map((image, index) => (

                <div
                  className="project-vertical-slide"
                  key={index}
                >

                  <img
                    src={image}
                    alt={`${project.title} — aplicación ${index + 1}`}
                    draggable="false"
                  />

                </div>

              ))}

            </div>


            {/* FLECHAS */}

            <div className="project-carousel-controls">

              <button
                type="button"
                className="project-carousel-button"
                onClick={() =>
                  scrollCarousel(verticalRef, "prev")
                }
                aria-label="Imagen anterior"
              >

                <i className="bi bi-arrow-left"></i>

              </button>


              <button
                type="button"
                className="project-carousel-button"
                onClick={() =>
                  scrollCarousel(verticalRef, "next")
                }
                aria-label="Imagen siguiente"
              >

                <i className="bi bi-arrow-right"></i>

              </button>

            </div>

          </div>

        </section>

      )}



      {/* =====================================================
          INSTAGRAM
      ===================================================== */}

      {project.instagram && (

        <section className="project-instagram">

          <span className="project-section-label">
            INSTAGRAM
          </span>

          <a
            href={`https://instagram.com/${project.instagram.replace("@", "")}`}
            target="_blank"
            rel="noreferrer"
          >

            {project.instagram}

            <span className="instagram-arrow">
              ↗
            </span>

          </a>

        </section>

      )}



      {/* =====================================================
          LÍNEA DE PUNTOS
      ===================================================== */}

      <div className="project-dotted-line project-dotted-line-bottom"></div>



      {/* =====================================================
          CRÉDITOS
      ===================================================== */}

      <section className="project-credits">

        <div className="project-credits-heading">
          CRÉDITOS
        </div>


        <div className="project-credits-list">

          {project.credits?.map((credit, index) => (

            <div
              className="project-credit"
              key={index}
            >

              <span className="project-credit-role">
                {credit.role}
              </span>

              <span className="project-credit-person">
                {credit.person}
              </span>

            </div>

          ))}

        </div>

      </section>


    </main>

  );

}


export default Project;