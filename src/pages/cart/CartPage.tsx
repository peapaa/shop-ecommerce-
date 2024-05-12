import { DeleteOutlined } from "@ant-design/icons";
import Layout from "../../components/layout/Layout";
import styles from "./CartPage.module.scss";
const products = [
  {
    id: 1,
    name: "Nike Air Force 1 07 LV8",
    href: "#",
    price: "₹47,199",
    originalPrice: "₹48,900",
    discount: "5% Off",
    color: "Orange",
    size: "8 UK",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png",
  },
  {
    id: 2,
    name: "Nike Blazer Low 77 SE",
    href: "#",
    price: "₹1,549",
    originalPrice: "₹2,499",
    discount: "38% off",
    color: "White",
    leadTime: "3-4 weeks",
    size: "8 UK",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e48d6035-bd8a-4747-9fa1-04ea596bb074/blazer-low-77-se-shoes-0w2HHV.png",
  },
  {
    id: 3,
    name: "Nike Air Max 90",
    href: "#",
    price: "₹2219 ",
    originalPrice: "₹999",
    discount: "78% off",
    color: "Black",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/dunk-high-retro-shoe-DdRmMZ.png",
  },
];

const CartPage = () => {
  return (
    <Layout>
      <h1 className={styles.cartTitle}>Shopping Cart</h1>
      <div className={styles.cartContainer}>
        <div role="list">
          {products.map((product) => (
            <div key={product.id} className={styles.cartProduct}>
              <div className={styles.cartProductItem}>
                <img
                  src={product.imageSrc}
                  alt={product.name}
                  className={styles.cartProductImg}
                />

                <div className={styles.cartProductInfo}>
                  <a href={product.href} className={styles.cartProductName}>
                    {product.name}
                  </a>
                  <div>
                    <span className="">{product.color}</span>
                    {product.size ? (
                      <span style={{ paddingLeft: 8 }}>|{product.size}</span>
                    ) : null}
                  </div>
                  <del>
                    <span>{product.originalPrice}</span>
                  </del>
                  <span className="">&nbsp;&nbsp;{product.price}</span>
                  &nbsp;&nbsp;
                  <span className="">{product.discount}</span>
                </div>
              </div>

              <div className={styles.cartProductBtn}>
                <button className={styles.cartProductBtnIcon}>-</button>
                <input
                  type="text"
                  className={styles.cartProductInput}
                  defaultValue={1}
                />
                <button className={styles.cartProductBtnIcon}>+</button>

                <button
                  className={styles.cartProductBtnRemove}
                  style={{ marginLeft: 12 }}
                >
                  <DeleteOutlined style={{ paddingRight: 4 }} />
                  <span className="">Remove</span>
                </button>
              </div>
              <hr />
            </div>
          ))}
        </div>

        <div className={styles.cartTotal}>
          <h2>Price Details</h2>
          <div className={styles.cartTotalItem}>
            <span>Price (3 item)</span>
            <span>₹ 52,398</span>
          </div>
          <div className={styles.cartTotalItem}>
            <span>Discount</span>
            <span>- ₹ 3,431</span>
          </div>
          <div className={styles.cartTotalItem}>
            <span>Delivery Charges</span>
            <span>Free</span>
          </div>
          <div className={styles.cartTotalItem}>
            Total Amount
            <span>₹ 48,967</span>
          </div>
          <button className={styles.cartTotalItemBtn}>Buy now</button>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
