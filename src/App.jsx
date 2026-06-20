import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { Dashboard } from "./pages/Dashboard";
import { CreateUpdateVendor } from "./pages/CreateUpdateVendor";
import { Vendor } from "./pages/Vendor";
import "./App.css";
import { ProtectedLayout } from "./components/ProtectedLayout";
import { CreateOrUpdateUser } from "./pages/CreateOrUpdateUser";
import { Users } from "./pages/Users";
import { Patients } from "./pages/Patients";
import { CreateOrUpdatePatient } from "./pages/CreateOrUpdatePatient";
import { MedicalTests } from "./pages/MedicalTests";
import { CreateOrUpdateMedicalTests } from "./pages/CreateOrUpdateMedicalTests";
import { Sidebar } from "./components/SideBar";
import Sidebar2 from "./pages/Sidebar2";
import { ManageTests } from "./pages/ManageTests";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedLayout />}>
        <Route element={<Sidebar />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/vendors" element={<Vendor />} />
          <Route path="/admin/vendor/:id/" element={<CreateUpdateVendor />} />
          <Route path="/admin/create-vendor" element={<CreateUpdateVendor />} />
          <Route path="/admin/create-user/" element={<CreateOrUpdateUser />} />
          <Route path="/user/:id/" element={<CreateOrUpdateUser />} />
          <Route path="/admin/users" element={<Users />} />

          <Route path="/admin/medical-tests" element={<MedicalTests />} />
          <Route
            path="/admin/create-medical-test"
            element={<CreateOrUpdateMedicalTests />}
          />
          <Route
            path="/admin/medical-test/:id/"
            element={<CreateOrUpdateMedicalTests />}
          />

          <Route path="/patients" element={<Patients />} />
          <Route path="/manage-tests" element={<ManageTests />} />
          <Route path="/create-patient" element={<CreateOrUpdatePatient />} />
          <Route path="/sample2" element={<Sidebar2 />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
