import { Link } from "react-router-dom";
import { Space } from "antd";
import styles from "../../App.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Space align="center" style={{ justifyContent: "center" }}>
        <span className={styles.footer__title}>Shopee</span>
        <span
          style={{
            borderRight: "1px solid #fff",
            height: "30px",
            position: "relative",
            top: "1px",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        />
        <p className={styles.footer__text}>
          © Copyright: Dao Duc Thien
          <Link to={"/"} target="_blank">
            @shopee
          </Link>
        </p>
      </Space>

      {/* media icon  */}
      <Space size="large" className={styles.footer__link}>
        {/* facebook  */}
        <Link to={"https://www.facebook.com/"} target="_blank">
          <svg
            fill="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className={styles.footer__linkLogo}
            viewBox="0 0 24 24"
          >
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
          </svg>
        </Link>

        {/* twitter  */}
        <Link to={"https://twitter.com/"} target="_blank">
          <svg
            fill="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className={styles.footer__linkLogo}
            viewBox="0 0 24 24"
          >
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
          </svg>
        </Link>
        {/* instagram  */}
        <Link to={"https://www.instagram.com/"} target="_blank">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className={styles.footer__linkLogo}
            viewBox="0 0 24 24"
          >
            <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
          </svg>
        </Link>

        {/* linkedIn  */}
        <Link to={"https://www.linkedin.com/"} target="_blank">
          <svg
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0}
            className={styles.footer__linkLogo}
            viewBox="0 0 24 24"
          >
            <path
              stroke="none"
              d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
            />
          </svg>
        </Link>
      </Space>
    </div>
  );
};

export default Footer;
