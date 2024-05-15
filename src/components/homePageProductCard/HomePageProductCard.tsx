import { Button, Card } from "antd";
import styles from "../../App.module.scss";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useContext } from "react";
import { Props } from "../../pages/registration/Signup";
const { Meta } = Card;

const HomePageProductCard = () => {
  const navigate = useNavigate();
  // context
  const context = useContext(myContext) as Props;
  const { getAllProduct } = context;

  return (
    <div className={styles.product__card}>
      {/* Heading  */}
      <div className={styles.product__cardTitle}>
        <h1>Bestselling Products</h1>
      </div>

      {/* main  */}
      <section className={styles.product__card__container}>
        {getAllProduct.map((item, index) => {
          const { productImageUrl, title, price, id } = item;
          return (
            <Card
              key={index}
              className={styles.product__card__item}
              cover={
                <img
                  onClick={() => navigate(`/productinfo/${id}`)}
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
      </section>
    </div>
  );
};

export default HomePageProductCard;
