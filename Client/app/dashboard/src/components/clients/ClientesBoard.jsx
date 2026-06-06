import {
  useEffect,
  useRef,
  useState,
} from "react";

import ClienteBoardCard
from "./ClienteBoardCard";

function ClientesBoard() {

  const [clientes, setClientes] =
    useState([]);

  // =========================
  // DRAG SCROLL
  // =========================

  const boardRef =
    useRef(null);

  const [isDragging,
    setIsDragging] =
    useState(false);

  const [startX,
    setStartX] =
    useState(0);

  const [scrollLeft,
    setScrollLeft] =
    useState(0);

  // =========================
  // FETCH CLIENTES
  // =========================

  useEffect(() => {

    const fetchClientes =
      async () => {

      try {

        const res =
          await fetch(
            "http://localhost:3000/cliente"
          );

        const data =
          await res.json();

        setClientes(data);

      } catch (error) {

        console.error(
          "Error cargando clientes:",
          error
        );
      }
    };

    fetchClientes();

  }, []);

  // =========================
  // ESTADOS
  // =========================

  const estados = [
    "Prospecto",
    "Contactado",
    "Cliente Activo",
    "Proyecto en Pausa",
    "Finalizado",
    "Archivado",
  ];

  // =========================
  // DRAG FUNCTIONS
  // =========================

  const handleMouseDown = (
    e
  ) => {

    setIsDragging(true);

    const board =
      boardRef.current;

    setStartX(
      e.pageX -
      board.offsetLeft
    );

    setScrollLeft(
      board.scrollLeft
    );
  };

  const handleMouseMove = (
    e
  ) => {

    if (!isDragging) return;

    e.preventDefault();

    const board =
      boardRef.current;

    const x =
      e.pageX -
      board.offsetLeft;

    const walk =
      (x - startX) * 1.5;

    board.scrollLeft =
      scrollLeft - walk;
  };

  const handleMouseUp =
    () => {

    setIsDragging(false);
  };

  // =========================
  // RENDER
  // =========================

  return (
    <div
      ref={boardRef}
      className={`clientes-board ${
        isDragging
          ? "dragging"
          : ""
      }`}
      onMouseDown={
        handleMouseDown
      }
      onMouseMove={
        handleMouseMove
      }
      onMouseUp={
        handleMouseUp
      }
      onMouseLeave={
        handleMouseUp
      }
    >

      {estados.map(
        (estado) => {

        const clientesEstado =
          clientes.filter(
            (cliente) =>
              cliente.estado ===
              estado
          );

        return (
          <div
            key={estado}
            className="cliente-board-column"
          >

            {/* HEADER */}

            <div className="cliente-column-header">

              <h3>
                {estado}
              </h3>

              <span>
                {
                  clientesEstado.length
                }
              </span>

            </div>

            {/* CARDS */}

            <div className="cliente-column-cards">

              {clientesEstado.map(
                (cliente) => (

                  <ClienteBoardCard
                    key={
                      cliente._id
                    }
                    cliente={
                      cliente
                    }
                  />

                )
              )}

            </div>

          </div>
        );
      })}

    </div>
  );
}

export default ClientesBoard;