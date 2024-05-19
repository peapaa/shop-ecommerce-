import {
  OrderedListOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styles from "./AdminDashboard.module.scss";

import { Tab, Tabs, TabPanel, TabList } from "react-tabs";
import ProductDetail from "../../components/admin/ProductDetail";
import OrderDetail, { DataType } from "../../components/admin/OrderDetail";
import UserDetail from "../../components/admin/UserDetail";
import { User } from "../registration/Login";
import { useContext } from "react";
import myContext from "../../context/myContext";
import { Props } from "../registration/Signup";
import { Link } from "react-router-dom";
import { Product } from "../../components/admin/UpdateProductPage";
const AdminDashboard = () => {
  // take info user  in sessionStorage
  const userString = sessionStorage.getItem("userSession");
  const user: User | null = userString ? JSON.parse(userString) : null;

  // context
  const context = useContext(myContext) as Props;
  const { getAllProduct, getAllOrder, getAllUser } = context;

  // get data order product
  const dataOrder: DataType[] = getAllOrder.map((orders) => {
    return orders.products.map((product: Product) => {
      return {
        orderId: product.id,
      };
    });
  });
  const dataOrderProduct: DataType[] = dataOrder.flat(Infinity);

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminHeader}>
        <h1 className={styles.adminHeaderTitle}>Admin Dashboard</h1>
      </div>
      <div className={styles.adminHeader} style={{ padding: 18 }}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
          alt=""
        />
        <div>
          <b>Name :</b> {user?.name}
        </div>
        <div>
          <b>Email :</b> {user?.email}
        </div>
        <div>
          <b>Date :</b> {user?.date}
        </div>
        <div>
          <b>Role :</b> {user?.role}
        </div>
        <div>
          <button className={styles.changePassword}>
            <Link to={"/change-password"}>Change Password</Link>
          </button>
        </div>
      </div>
      {/* Bottom */}
      <Tabs>
        <TabList>
          <div className={styles.adminContent}>
            <Tab>
              <div className={styles.adminContentDetail}>
                <ShoppingCartOutlined className={styles.icon} />
                <h2 style={{ margin: 8 }}>{getAllProduct.length}</h2>
                <span>
                  <b>Total Products </b>
                </span>
              </div>
            </Tab>

            <Tab>
              <div className={styles.adminContentDetail}>
                <OrderedListOutlined className={styles.icon} />
                <h2 style={{ margin: 8 }}>{dataOrderProduct.length}</h2>
                <span>
                  <b>Total Order</b>
                </span>
              </div>
            </Tab>

            <Tab>
              <div className={styles.adminContentDetail}>
                <UserOutlined className={styles.icon} />
                <h2 style={{ margin: 8 }}>{getAllUser.length}</h2>
                <span>
                  <b>Total User</b>
                </span>
              </div>
            </Tab>
          </div>
        </TabList>
        <TabPanel>
          <ProductDetail />
        </TabPanel>

        <TabPanel>
          <OrderDetail />
        </TabPanel>

        <TabPanel>
          <UserDetail />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
