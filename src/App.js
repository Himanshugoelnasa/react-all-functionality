import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Dashboard/Profile";
import Products from "./pages/Dashboard/Products";
import ProductDetail from "./pages/Dashboard/ProductDetail";
import ImageUpload from "./pages/Dashboard/ImageUpload";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Layout from "./Layout/Layout";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />

          {/* ✅ RELATIVE paths */}
          <Route path="profile" element={<Profile />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="image-upload" element={<ImageUpload />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
