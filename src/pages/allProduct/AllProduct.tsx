import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { Button, Card, Skeleton, message } from "antd";
import Meta from "antd/es/card/Meta";
import styles from "../../App.module.scss";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { Props } from "../registration/Signup";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { User } from "../registration/Login";

const AllProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get user from session storge
  const userString = sessionStorage.getItem("userSession");
  const user: User | null = userString ? JSON.parse(userString) : null;

  // loading add cart
  const [loadingAddCart, setLoadingAddCart] = useState<{
    [key: string]: boolean;
  }>({});

  const addCart = async (item: any) => {
    const productId = item.id;
    console.log(productId);
    dispatch(addToCart(item));
    // check loading theo id product
    setLoadingAddCart((prev: any) => ({ ...prev, [productId]: true }));
    try {
      await addDoc(collection(fireDB, "carts"), { ...item, uid: user?.uid });
      message.success("added to cart successfully");
      setLoadingAddCart((prev: any) => ({ ...prev, [productId]: false }));
    } catch (err) {
      console.log(err);
      setLoadingAddCart((prev: any) => ({
        ...prev,
        [productId]: false,
      }));
    }
    setLoadingAddCart((prev: any) => ({
      ...prev,
      [productId]: false,
    }));
  };
  // context
  const context = useContext(myContext) as Props;
  const { getAllProduct, loading } = context;
  return (
    <Layout>
      <div>
        <h1 style={{ textAlign: "center" }}>All Products</h1>
        <div className={styles.product__card__container}>
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
