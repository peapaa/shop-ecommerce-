import {
  OrderedListOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styles from "./AdminDashboard.module.scss";

import { Tab, Tabs, TabPanel } from "react-tabs";
import ProductDetail from "../../components/admin/ProductDetail";
import OrderDetail from "../../components/admin/OrderDetail";
import UserDetail from "../../components/admin/UserDetail";
const AdminDashboard = () => {
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
          <b>Name :</b> Kamal Nayan Upadhyay
        </div>
        <div>
          <b>Email :</b> test@gmail.com
        </div>
      </div>
      {/* Bottom */}
      <Tabs>
        <div className={styles.adminContent}>
          <Tab>
            <div className={styles.adminContentDetail}>
              <ShoppingCartOutlined className={styles.icon} />
              <h2 style={{ margin: 8 }}>10</h2>
              <span>
                <b>Total Products </b>
              </span>
            </div>
          </Tab>

          <Tab>
            <div className={styles.adminContentDetail}>
              <OrderedListOutlined className={styles.icon} />
              <h2 style={{ margin: 8 }}>10</h2>
              <span>
                <b>Total Order</b>
              </span>
            </div>
          </Tab>

          <Tab>
            <div className={styles.adminContentDetail}>
              <UserOutlined className={styles.icon} />
              <h2 style={{ margin: 8 }}>10</h2>
              <span>
                <b>Total User</b>
              </span>
            </div>
          </Tab>
        </div>
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
