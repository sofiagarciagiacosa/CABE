import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import ProjectsPage from "./pages/projects/ProjectsPage.jsx";
import ProjectPage from "./pages/projects/ProjectPage.jsx";


function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<h1>Inicio</h1>} />
          <Route path="/proyectos" element={<ProjectsPage />} />
          <Route path="/proyectos/:id" element={<ProjectPage />} />
          <Route path="/clientes" element={<h1>Clientes</h1>} />
          <Route path="/formularios" element={<h1>Formularios</h1>} />
          <Route path="/estadisticas" element={<h1>Estadísticas</h1>} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;