import Layout from "../../components/layout/Layout";
import styles from "./UserDashboard.module.scss";

const products = [
  {
    id: 1,
    name: "Nike Air Force 1 07 LV8",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png",
    href: "#",
    price: "₹61,999",
    color: "Orange",
    imageAlt: "Nike Air Force 1 07 LV8",
    quantity: 1,
  },
];

const UserDashboard = () => {
  return (
    <Layout>
      <div className={styles.userContainer}>
        <div className={styles.userContainerTop}>
          <div className="flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
              alt=""
            />
          </div>

          <p>
            <b>Name :</b> Kamal Nayan Upadhyay
          </p>
          <p>
            <b>Email :</b> test@gmail.com
          </p>
        </div>

        <div className={styles.userContainerBottom}>
          <h2 className={styles.OrderTitle}>Order Details</h2>

          <div className={styles.orderContainer}>
            {/* left */}
            <div className={styles.orderInfoLeft}>
              <div className="">
                <b>Order Id</b>
              </div>
              <div className={styles.orderInformation}>#74557994327</div>

              <div>
                <b>Date</b>
              </div>
              <div className={styles.orderInformation}>4 March, 2023</div>

              <div>
                <b>Total Amount</b>
              </div>
              <div className={styles.orderInformation}>₹84,499</div>

              <div className="">
                <b>Order Status</b>
              </div>
              <div>Confirmed</div>
            </div>

            {/* right */}
            <div className={styles.orderInfoRight}>
              {products.map((product) => (
                <div key={product.id}>
                  <div className={styles.orderProductInfo}>
                    <img
                      className={styles.orderProductImg}
                      src={product.imageSrc}
                      alt={product.imageSrc}
                    />

                    <div className={styles.orderProductDetail}>
                      <div>
                        <div className="">
                          <b>{product.name}</b>
                        </div>
                        <p>{product.color}</p>
                        <p>x {product.quantity}</p>
                      </div>
                      <div>
                        <b className={styles.orderInfoProductPrice}>
                          {product.price}
                        </b>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
