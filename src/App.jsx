import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
    </Routes>
  );
}

export default App;
