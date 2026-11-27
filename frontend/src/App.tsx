import { Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Home from "./pages/user/beranda";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import DietPlanSelectionPage from "./pages/user/diagnosis";
import AdminDashboardPage from "./pages/admin/dashboard";
import ProblemManagementPage from "./pages/admin/problems";
import RulesAndFactsPage from "./pages/admin/rules";
import AdminReportsPage from "./pages/admin/reports";
import AdminSettingsPage from "./pages/admin/settings";
import DiagnosingQAPage from "./pages/user/diagnosis/questions";
import AboutUsPage from "./pages/user/about";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import CategoriesPage from "./pages/admin/categories";
import AdminRoute from "./routes/AdminRoute";

export default function App() {
  return (
    <SnackbarProvider
      autoHideDuration={3000}
      dense={true}
      maxSnack={3}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <AuthProvider>
        <Routes>
            {/* START: Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            {/* END: Public routes */}

            {/* START: Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/diet-plans"  element={<DietPlanSelectionPage />} />
              <Route path="/diagnosis/questions" element={<DiagnosingQAPage />} />

              {/* STARTL Admin routes */}
              <Route element={<AdminRoute />}>
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                <Route path="/admin/categories" element={<CategoriesPage />} />
                <Route path="/admin/problems" element={<ProblemManagementPage />} />
                <Route path="/admin/rules" element={<RulesAndFactsPage />} />
                <Route path="/admin/reports" element={<AdminReportsPage />} />
                <Route path="/admin/settings" element={<AdminSettingsPage />} />
              </Route>
              {/* END: Admin routes */}
            </Route>
            {/* END: Protected routes */}
        </Routes>
      </AuthProvider>
    </SnackbarProvider>
  )
}