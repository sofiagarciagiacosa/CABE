import "./ConnectSection.css";

function ConnectSection() {
  return (
    <section className="connect">
      <div className="connect__content">

        <h2 className="connect__title">
          Creemos algo increíble juntos.
        </h2>

        <a href="/contacto" className="connect__cta">
          CONTACTANOS
          <span className="connect__arrow">
            <svg viewBox="0 0 24 24" fill="none" className="arrow-icon">
              <path
                d="M5 12H19M19 12L13 6M19 12L13 18"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>

      </div>
    </section>
  );
}

export default ConnectSection;

