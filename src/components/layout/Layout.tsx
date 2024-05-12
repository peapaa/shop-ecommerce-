import Navbar from "../navbar/Navbar";
import styles from "../../App.module.scss";

function Layout({ children }: { children: any }) {
  return (
    <div>
      <Navbar />
      <div className={styles.mainContent}>{children}</div>
    </div>
  );
}

export default Layout;
