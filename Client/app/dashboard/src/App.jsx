import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layout/DashboardLayout.jsx";
import ProjectsPage from "./pages/projects/ProjectsPage.jsx";
import ProjectPage from "./pages/projects/ProjectPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<PublicRoute>
          <LoginPage />
        </PublicRoute>} />

        {/* APP PROTEGIDA */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<div />} />
          <Route path="proyectos" element={<ProjectsPage />} />
          <Route path="proyectos/:id" element={<ProjectPage />} />
          <Route path="clientes" element={<div />} />
          <Route path="formularios" element={<div />} />
          <Route path="estadisticas" element={<div />} />
          <Route path="perfil" element={<ProfilePage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;