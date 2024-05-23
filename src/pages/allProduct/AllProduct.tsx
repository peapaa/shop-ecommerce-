import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { Button, Card, Skeleton } from "antd";
import Meta from "antd/es/card/Meta";
import styles from "../../App.module.scss";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { Props } from "../registration/Signup";
import {
  ProductCart,
  addProductToCarts,
  useAppDispatch,
} from "../../redux/cartSlice";
import { User } from "../registration/Login";

const AllProduct = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // get user from session storge
  const userString = sessionStorage.getItem("userSession");
  const user: User | null = userString ? JSON.parse(userString) : null;

  // loading add cart
  const [loadingAddCart, setLoadingAddCart] = useState<{
    [key: string]: boolean;
  }>({});

  // dispatch function add cart
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
  // context
  const context = useContext(myContext) as Props;
  const { getAllProduct, loading } = context;
  return (
    <Layout>
      <div>
        <h1 style={{ textAlign: "center" }}>All Products</h1>
        <div className={styles.product__card__container}>
          {getAllProduct
            .filter((item) => item.totalQuantity > 0)
            .map((item, index) => {
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
                          {user && user?.role === "user" ? (
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
        </div>
      </div>
    </Layout>
  );
};

export default AllProduct;
