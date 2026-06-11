import "./ConnectSection.css";

function ConnectSection() {
  return (
    <section className="connect">

      <div className="connect__line"></div>

      <div className="connect__content">

        <div className="connect__left">
          <span className="connect__label">
            LET'S CONNECT
          </span>

          <div className="connect__heading">
            <span className="connect__star connect__star-1">
              ✦
            </span>

            <h2 className="connect__title">
              Creemos algo <br />
              increíble juntos.
            </h2>

            <span className="connect__star connect__star-2">
              ✦
            </span>
          </div>
        </div>

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