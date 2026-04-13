import "./CTA.css";

function CTA({ href = "/contacto", children = "CONTACTANOS" }) {
  return (
    <a href={href} className="connect__cta">
      {children}
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
  );
}

export default CTA;
