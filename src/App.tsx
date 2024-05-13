import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import NoPage from "./pages/noPage/NoPage";
import ProductInfo from "./pages/productInfo/ProductInfo";
import ScrollTop from "./components/scrollTop/ScrollTop";
import CartPage from "./pages/cart/CartPage";
import AllProduct from "./pages/allProduct/AllProduct";
import Signup from "./pages/registration/Signup";
import Login from "./pages/registration/Login";
import styles from "./App.module.scss";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProductPage from "./components/admin/AddProductPage";
import UpdateProductPage from "./components/admin/UpdateProductPage";
import MyState from "./context/myState";
import ProtectedRouteForUser from "./protectedRoute/ProtectedRouteForUser";
import ProtectedRouteForAdmin from "./protectedRoute/ProtectedRouteForAdmin";

function App() {
  return (
    <MyState>
      <div className={styles.app}>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/productinfo" element={<ProductInfo />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRouteForUser>
                <UserDashboard />
              </ProtectedRouteForUser>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRouteForAdmin>
                <AdminDashboard />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/addproduct"
            element={
              <ProtectedRouteForAdmin>
                <AddProductPage />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/updateproduct"
            element={
              <ProtectedRouteForAdmin>
                <UpdateProductPage />
              </ProtectedRouteForAdmin>
            }
          />
        </Routes>
      </div>
    </MyState>
  );
}

export default App;
