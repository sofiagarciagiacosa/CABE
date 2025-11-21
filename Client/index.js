import { renderNavbar } from "./components/navbar.js" ;

// --- Insertar NAVBAR dinámicamente ---
document
  .querySelector(".layout")
  .insertAdjacentHTML("afterbegin", renderNavbar("inicio"));
