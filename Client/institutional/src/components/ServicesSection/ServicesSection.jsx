import "./ServicesSection.css";

function ServicesSection() {
  return (
    <section className="services">
      <div className="services-line top"></div>

      <div className="services-container">
        {/* IZQUIERDA */}
        <div className="services-left">
            <div className="services-left-inner">
                <h2>QUE HACEMOS</h2>
                <p>
                Trabajamos desde la estrategia, el concepto y la creatividad,
                acompañando a marcas, emprendimientos y profesionales en la
                construcción y evolución de su identidad y comunicación.
                </p>
            </div>
        </div>


        {/* DERECHA */}
        <div className="services-right">
          <div className="service-item"><span>01</span> Branding – Estrategia de Marca</div>
          <div className="service-item"><span>02</span> Identidad Visual – Diseño de Marca</div>
          <div className="service-item"><span>03</span> Estrategia de Redes Sociales – Comunicación Digital</div>
          <div className="service-item"><span>04</span> Aplicaciones – Piezas Gráficas Adicionales</div>
          <div className="service-item"><span>05</span> Paquetes / Combos</div>
          <div className="service-item"><span>06</span> Producción + Dirección Creativa</div>
          <div className="service-item"><span>07</span> Creación de Contenido</div>
        </div>
      </div>

      <div className="services-line bottom"></div>
    </section>
  );
}

export default ServicesSection;
