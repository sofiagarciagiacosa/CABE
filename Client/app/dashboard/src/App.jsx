import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layout/DashboardLayout.jsx";
import ProjectsPage from "./pages/projects/ProjectsPage.jsx";
import ProjectPage from "./pages/projects/ProjectPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import EditProfilePage from "./components/profile/EditProfilePage.jsx";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage.jsx";
import ClientesPage from "./pages/clients/ClientsPage.jsx";
import ClientPage from "./pages/clients/ClientPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<PublicRoute>
          <LoginPage />
        </PublicRoute>} />
        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPasswordPage />
            </PublicRoute>
          }
        />
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
          <Route path="clientes" element={<ClientesPage />} />
          <Route path="clientes/:id" element={<ClientPage />} />
          <Route path="formularios" element={<div />} />
          <Route path="estadisticas" element={<div />} />
          <Route path="perfil">
            <Route index element={<ProfilePage />} />
            <Route path="editar" element={<EditProfilePage />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;