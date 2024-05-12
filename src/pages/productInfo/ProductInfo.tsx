import { Rate } from "antd";
import Layout from "../../components/layout/Layout";
import styles from "./ProductInfo.module.scss";

const ProductInfo = () => {
  return (
    <Layout>
      <div className={styles.productContainer}>
        <img
          src="https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg"
          className={styles.productImg}
        />
        <div className={styles.productInfo}>
          <h2 className={styles.productTitle}>
            Intel® Core™ i5-12600HX Processor (18M Cache, up to 4.60 GHz)
          </h2>

          <Rate allowClear />

          <div>
            <h2 className="">Description:</h2>
            <p className={styles.productDesc}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa,
              explicabo enim ratione voluptatum at cupiditate delectus nemo
              dolorum officia esse beatae optio ut mollitia sit omnis, possimus
              nesciunt voluptas natus! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Provident rerum ad rem reprehenderit qui, omnis
              nam distinctio, dignissimos nisi quidem aliquam, sapiente delectus
              commodi! Perspiciatis provident illo autem quidem ad! Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Beatae reiciendis eum
              dolorum cupiditate
            </p>
          </div>
          <button className={styles.productAddCartBtn}>Add to cart</button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductInfo;
