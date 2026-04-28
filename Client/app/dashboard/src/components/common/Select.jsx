import { useState, useRef, useEffect } from "react";

function Select({ options, value, onChange, placeholder = "Seleccionar" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = options.find((opt) => opt._id === value);

  // cerrar click afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="select-container" ref={ref}>
      <div
        className="select-trigger"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        <span>{selected ? selected.nombre : placeholder}</span>

        <i className={`bi bi-chevron-down ${open ? "rotate" : ""}`} />
      </div>

      {open && (
        <div className="select-dropdown">
          {options.map((opt) => (
            <div
              key={opt._id}
              className="select-option"
              onClick={() => {
                onChange(opt._id);
                setOpen(false);
              }}
            >
              {opt.nombre}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Select;