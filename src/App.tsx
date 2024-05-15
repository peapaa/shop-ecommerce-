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

import CategoryPage from "./pages/category/CategoryPage";
import ResetPassword from "./pages/registration/ResetPassword";
import ResetPasswordFinish from "./pages/registration/ResetPasswordFinish";
import ChangePassword from "./pages/registration/ChangePassword";
import ProtectedRouteWithSession from "./protectedRoute/ProtectedRouteWithSession";

function App() {
  return (
    <MyState>
      <div className={styles.app}>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route
            path="/cart"
            element={
              <ProtectedRouteWithSession>
                <CartPage />
              </ProtectedRouteWithSession>
            }
          />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/change-password"
            element={
              <ProtectedRouteWithSession>
                <ChangePassword />
              </ProtectedRouteWithSession>
            }
          />

          <Route
            path="/reset-password-finsh"
            element={<ResetPasswordFinish />}
          />

          <Route
            path="/user-dashboard"
            element={
              <ProtectedRouteWithSession>
                <ProtectedRouteForUser>
                  <UserDashboard />
                </ProtectedRouteForUser>
              </ProtectedRouteWithSession>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRouteWithSession>
                <ProtectedRouteForAdmin>
                  <AdminDashboard />
                </ProtectedRouteForAdmin>
              </ProtectedRouteWithSession>
            }
          />
          <Route
            path="/addproduct"
            element={
              <ProtectedRouteWithSession>
                <ProtectedRouteForAdmin>
                  <AddProductPage />
                </ProtectedRouteForAdmin>
              </ProtectedRouteWithSession>
            }
          />
          <Route
            path="/updateproduct/:id"
            element={
              <ProtectedRouteWithSession>
                <ProtectedRouteForAdmin>
                  <UpdateProductPage />
                </ProtectedRouteForAdmin>
              </ProtectedRouteWithSession>
            }
          />
        </Routes>
      </div>
    </MyState>
  );
}

export default App;
