export function renderNavbar(activePage) {
  return `
        <nav class="sidebar d-flex flex-column p-3 pe-0">
            <div class="user-icon mb-4">
                <i class="bi bi-person-circle ps-3 mt-4"></i>
            </div>

            <ul class="nav flex-column" id="sidebarMenu">
                <li class="nav-item">
                    <a class="nav-link ${
                      activePage === "inicio" ? "active" : ""
                    }" href="../main.html">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link ${
                      activePage === "proyectos" ? "active" : ""
                    }" href="proyectos.html">Proyectos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link ${
                      activePage === "clientes" ? "active" : ""
                    }" href="../clientes.html">Clientes</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link ${
                      activePage === "formularios" ? "active" : ""
                    }" href="../formularios.html">Formularios</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link ${
                      activePage === "estadisticas" ? "active" : ""
                    }" href="../estadisticas.html">Estadísticas</a>
                </li>

                <li class="nav-item mt-auto">
                    <a class="nav-link logout" href="../../index.html">Cerrar sesión</a>
                </li>
            </ul>
        </nav>
    `;
}
