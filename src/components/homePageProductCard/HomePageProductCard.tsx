import { Button, Card, Skeleton } from "antd";
import styles from "../../App.module.scss";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useState } from "react";
import { Props } from "../../pages/registration/Signup";
import { useSelector } from "react-redux";
import {
  ProductCart,
  addProductToCarts,
  useAppDispatch,
} from "../../redux/cartSlice";

import { User } from "../../pages/registration/Login";

const { Meta } = Card;

const HomePageProductCard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const context = useContext(myContext) as Props;
  const { getAllProduct, loading } = context;

  const productCarts = useSelector((state: any) => state.cart);
  console.log("products", productCarts);

  // get user from session storage
  const userString = sessionStorage.getItem("userSession");
  const user: User | null = userString ? JSON.parse(userString) : null;

  // loading add cart
  const [loadingAddCart, setLoadingAddCart] = useState<{
    [key: string]: boolean;
  }>({});

  const addCart = async (item: ProductCart) => {
    setLoadingAddCart((prev) => ({ ...prev, [item.id ?? ""]: true }));
    try {
      await dispatch(addProductToCarts(item));
      setLoadingAddCart((prev) => ({ ...prev, [item.id ?? ""]: false }));
    } catch (err) {
      console.log(err);
      setLoadingAddCart((prev) => ({ ...prev, [item.id ?? ""]: false }));
    }
  };

  return (
    <div className={styles.product__card}>
      {/* Heading */}
      <div className={styles.product__cardTitle}>
        <h1>Bestselling Products</h1>
      </div>

      {/* Main */}
      <section className={styles.product__card__container}>
        {getAllProduct.map((item, index) => {
          const { productImageUrl, title, price, id } = item;
          return (
            <Card
              key={index}
              className={styles.product__card__item}
              cover={
                loading ? (
                  <Skeleton.Image
                    style={{ width: "100%", height: "260px" }}
                    active
                  />
                ) : (
                  <img
                    onClick={() => navigate(`/productinfo/${id}`)}
                    alt="product"
                    src={productImageUrl}
                    className={styles.product__card__item__img}
                  />
                )
              }
            >
              <Meta
                title={
                  loading ? (
                    <Skeleton
                      active
                      style={{ height: "20px" }}
                      paragraph={{ rows: 1 }}
                    />
                  ) : (
                    <>
                      <h1 className={styles.product__card__itemName}>
                        {title.substring(0, 25)}
                      </h1>
                      <h1 className={styles.product__card__itemPrice}>
                        ${price}
                      </h1>
                      {user && user.role === "user" ? (
                        <Button
                          className={styles.product__card__itemBtn}
                          onClick={() => addCart(item)}
                          loading={loadingAddCart[id ?? ""]}
                        >
                          Add To Cart
                        </Button>
                      ) : (
                        <Button
                          className={styles.product__card__itemBtn}
                          disabled
                        >
                          Add To Cart
                        </Button>
                      )}
                    </>
                  )
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
