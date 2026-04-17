import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layout/DashboardLayout.jsx";
import ProjectsPage from "./pages/projects/ProjectsPage.jsx";
import ProjectPage from "./pages/projects/ProjectPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* APP PROTEGIDA */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<h1>Inicio</h1>} />
          <Route path="proyectos" element={<ProjectsPage />} />
          <Route path="proyectos/:id" element={<ProjectPage />} />
          <Route path="clientes" element={<h1>Clientes</h1>} />
          <Route path="formularios" element={<h1>Formularios</h1>} />
          <Route path="estadisticas" element={<h1>Estadísticas</h1>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;