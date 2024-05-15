import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import styles from "../../App.module.scss";
import { useContext } from "react";
import myContext from "../../context/myContext";
import { Props } from "../registration/Signup";

const AllProduct = () => {
  const navigate = useNavigate();
  // context
  const context = useContext(myContext) as Props;
  const { getAllProduct } = context;
  return (
    <Layout>
      <div>
        <h1 style={{ textAlign: "center" }}>All Products</h1>
        <div className={styles.product__card__container}>
          {getAllProduct.map((item, index) => {
            const { productImageUrl, title, price } = item;
            return (
              <Card
                key={index}
                className={styles.product__card__item}
                cover={
                  <img
                    onClick={() => navigate("/productinfo")}
                    alt="product"
                    src={productImageUrl}
                    className={styles.product__card__item__img}
                  />
                }
              >
                <Meta
                  title={
                    <>
                      <h1 className={styles.product__card__itemName}>
                        {title.substring(0, 25)}
                      </h1>
                      <h1 className={styles.product__card__itemPrice}>
                        ${price}
                      </h1>

                      <Button className={styles.product__card__itemBtn}>
                        Add To Cart
                      </Button>
                    </>
                  }
                />
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AllProduct;
