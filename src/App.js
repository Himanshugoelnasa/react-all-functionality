import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Dashboard/Profile";
import Products from "./pages/Dashboard/Products";
import Chats from "./pages/Chats";
import NewChat from "./pages/Chats/NewChat";
import ProductDetail from "./pages/Dashboard/ProductDetail";
import ImageUpload from "./pages/Dashboard/FileUpload";
import Export from "./pages/Dashboard/Export";
import Payment from "./pages/Dashboard/Payment";
import Tracking from "./pages/Dashboard/Tracking";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Layout from "./Layout/Layout";
import AdminLayout from "./components/admin/AdminLayout";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>

        {/* independent pages with same layout  */}
        <Route path="/" element={<Layout />}>
          <Route path="chats" element={<Chats />} />
          <Route path="new-chat" element={<NewChat />} />
         
        </Route>

        {/* pages under dashboard with common layout */}
        <Route path="/dashboard" element={<Layout />}>
          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
          {/* ✅ RELATIVE paths */}
          <Route path="profile" element={<Profile />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="file-upload" element={<ImageUpload />} />
          <Route path="export" element={<Export />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="payment" element={<Payment />} />
          <Route path="product-details" element={<ProductDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
