import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { Dashboard } from "./pages/Dashboard";
import { CreateUpdateVendor } from "./pages/CreateUpdateVendor";
import { Vendor } from "./pages/Vendor";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { ProtectedLayout } from "./components/ProtectedLayout";
import { CreateOrUpdateUser } from "./pages/CreateOrUpdateUser";
import { Users } from "./pages/Users";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedLayout />}>
        <Route element={<Navbar />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/vendor" element={<Vendor />} />
          <Route path="/admin/vendor/:id/" element={<CreateUpdateVendor />} />
          <Route path="/admin/create-vendor" element={<CreateUpdateVendor />} />
          <Route path="/create-user/" element={<CreateOrUpdateUser />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
