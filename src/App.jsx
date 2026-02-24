import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { Dashboard } from "./pages/Dashboard";
import { CreateVendor } from "./pages/CreateVendor";
import { Vendor } from "./pages/Vendor";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { ProtectedLayout } from "./components/ProtectedLayout";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedLayout />}>
        <Route element={<Navbar />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/vendor" element={<Vendor />} />
          <Route path="/admin/vendor/:id/" element={<CreateVendor />} />
          <Route path="/admin/create-vendor" element={<CreateVendor />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
