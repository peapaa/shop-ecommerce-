import { Button, Card, Skeleton, message } from "antd";
import styles from "../../App.module.scss";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useState } from "react";
import { Props } from "../../pages/registration/Signup";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { cartItem } from "../../redux/selector";
import {
  addDoc,
  collection,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { User } from "../../pages/registration/Login";

const { Meta } = Card;

const HomePageProductCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useContext(myContext) as Props;
  const { getAllProduct, loading } = context;

  const products = useSelector((state: any) => state.cart);
  console.log("products", products);

  // get user from session storage
  const userString = sessionStorage.getItem("userSession");
  const user: User | null = userString ? JSON.parse(userString) : null;

  // loading add cart
  const [loadingAddCart, setLoadingAddCart] = useState<{
    [key: string]: boolean;
  }>({});

  const addCart = async (item: any) => {
    const productId = item.id;
    dispatch(addToCart(item));

    setLoadingAddCart((prev: any) => ({ ...prev, [productId]: true }));
    try {
      if (user) {
        const q = query(
          collection(fireDB, "carts"),
          where("id", "==", item.id),
          where("uid", "==", user.uid)
        );
        const productCarts = await getDocs(q);

        if (productCarts.empty) {
          await addDoc(collection(fireDB, "carts"), { ...item, uid: user.uid });
        } else {
          productCarts.forEach((doc) => {
            setDoc(doc.ref, {
              ...doc.data(),
              quantity: doc.data().quantity + 1,
            });
          });
        }
        setLoadingAddCart((prev: any) => ({ ...prev, [productId]: false }));
        message.success("Added to cart successfully");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      setLoadingAddCart((prev: any) => ({ ...prev, [productId]: false }));
      message.error("add cart failed");
    }

    setLoadingAddCart((prev: any) => ({ ...prev, [productId]: false }));
  };

  // Context
  const cartItems = useSelector(cartItem);
  console.log("cartItems", cartItems);
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
