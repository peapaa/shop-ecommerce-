import { DeleteOutlined } from "@ant-design/icons";
import Layout from "../../components/layout/Layout";
import styles from "./CartPage.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  ProductCart,
  decreaseQuantity,
  deleteProductFromCart,
  incrementQuantity,
  useAppDispatch,
} from "../../redux/cartSlice";
import { useContext, useState } from "react";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import myContext from "../../context/myContext";
import { Props } from "../registration/Signup";
import { message } from "antd";
import { User } from "../registration/Login";
import { fireDB } from "../../firebase/FirebaseConfig";

export interface BuyProductOrder {
  address: string;
  name: string;
  phoneNumber: string;
  time: any;
  date: string;
}

const CartPage = () => {
  // get user from session storge
  const userString = sessionStorage.getItem("userSession");
  const user: User | null = userString ? JSON.parse(userString) : null;

  // my context
  const context = useContext(myContext) as Props;
  const { loading, setLoading, getAllProduct } = context;
  console.log("loading", loading);
  // get product from store
  const products = useSelector((state: RootState) => state.cart);

  console.log("products", products);

  // check quantity of cart vs total quantity products
  const checkQuantityCartValidate = products.every((product) => {
    if (product.quantity > product.totalQuantity) {
      return false;
    } else {
      return true;
    }
  });
  console.log("checkQuantityCartValidate", checkQuantityCartValidate);

  // delete quantity products after buy now
  const getAllProductsAfterBuy = async () => {
    setLoading(true);
    try {
      const parentProduct: ProductCart[] = getAllProduct;
      const childrenProduct: ProductCart[] = products;

      const resultProduct = parentProduct.map((parentItem) => {
        const childItem = childrenProduct.find(
          (childItem) => childItem.id === parentItem.id
        );
        if (childItem) {
          console.log("da vao child product");
          return {
            ...parentItem,
            totalQuantity: parentItem.totalQuantity - childItem.quantity,
          };
        }
        return parentItem;
      });
      console.log("resultProduct", resultProduct);
      const batch = writeBatch(fireDB);
      const collectionRef = collection(fireDB, "products");
      resultProduct.forEach((product) => {
        if (product.id) {
          const productRef = doc(collectionRef, product.id);
          batch.update(productRef, { totalQuantity: product.totalQuantity });
        }
      });
      await batch.commit();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    setLoading(false);
  };

  const cartItemTotal = products.length;
  const carthandle = (total: number, productCart: any) => {
    return (total += productCart.quantity * productCart.price);
  };
  const cartTotal = products.reduce(carthandle, 0);

  const [openModal, setOpenModal] = useState<boolean>(false);
  // dispatch
  const dispatch = useAppDispatch();

  // increment quantity
  const increaseCart = async (item: ProductCart) => {
    try {
      await dispatch(incrementQuantity(item));
      // console.log("dispatch success increase cart");
    } catch (err) {
      console.log(err);
    }
  };

  // decrement quantity
  const decreaseCart = async (item: ProductCart) => {
    try {
      await dispatch(decreaseQuantity(item));
      // console.log("dispatch success decrease cart");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCart = async (item: ProductCart) => {
    try {
      await dispatch(deleteProductFromCart(item));
      // console.log("dispatch success delete cart");
    } catch (err) {
      console.log(err);
    }
  };
  console.log("cartTotal", cartTotal);
  console.log("product", products);

  // send order info
  const [addressInfo, setAddressInfo] = useState<BuyProductOrder>({
    address: "",
    name: "",
    phoneNumber: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // buy products from cart function

  const buyProductsOrder = async () => {
    setLoading(true);
    try {
      const orderBuy = {
        products,
        addressInfo,
        userId: user?.uid,
        status: "confirmed",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      const orderBuyRef = await addDoc(collection(fireDB, "order"), orderBuy);
      const orderID = orderBuyRef.id;

      // update order infor
      await updateDoc(orderBuyRef, { orderID });

      setLoading(false);
      message.success("order successfully");
    } catch (err) {
      console.log("order error", err);
      setLoading(false);
      message.error("order failed");
    }
    setLoading(false);
  };

  return (
    <Layout>
      {openModal && (
        <BuyNowModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          addressInfo={addressInfo}
          setAddressInfo={setAddressInfo}
          loading={loading}
          buyProductsOrder={buyProductsOrder}
          getAllProductsAfterBuy={getAllProductsAfterBuy}
        />
      )}

      <h1 className={styles.cartTitle}>Shopping Cart</h1>
      <div className={styles.cartContainer}>
        <div role="list">
          {products.map((product) => (
            <div key={product.id} className={styles.cartProduct}>
              <div className={styles.cartProductItem}>
                <img
                  src={product.productImageUrl}
                  alt={product.title}
                  className={styles.cartProductImg}
                />

                <div className={styles.cartProductInfo}>
                  <a
                    href={`/productinfo/${product.id}`}
                    className={styles.cartProductName}
                  >
                    {product.title}
                  </a>

                  <div className={styles.text}>{product.category}</div>

                  <div className={styles.text}>
                    <b>{`$${product.price}`}</b>
                  </div>
                  <div className={styles.text}>
                    Total products:<b>{` ${product.totalQuantity}`}</b>
                  </div>
                </div>
              </div>

              <div className={styles.cartProductBtn}>
                <button
                  className={styles.cartProductBtnIcon}
                  onClick={() => decreaseCart(product)}
                >
                  -
                </button>

                <button
                  style={{
                    backgroundColor: "#fff",
                    border: "1px ",
                    fontSize: 16,
                  }}
                >
                  {product.quantity}
                </button>
                <button
                  className={styles.cartProductBtnIcon}
                  onClick={() => increaseCart(product)}
                >
                  +
                </button>

                <button
                  className={styles.cartProductBtnRemove}
                  style={{ marginLeft: 12 }}
                >
                  <DeleteOutlined style={{ paddingRight: 4 }} />
                  <span className="" onClick={() => deleteCart(product)}>
                    Remove
                  </span>
                </button>
              </div>
              <hr />
            </div>
          ))}
        </div>

        <div className={styles.cartTotal}>
          <h2>Price Details</h2>
          <div className={styles.cartTotalItem}>
            <span>Price ({cartItemTotal} item)</span>
            <span>$ {cartTotal}</span>
          </div>

          <div className={styles.cartTotalItem}>
            <span>Delivery Charges</span>
            <span>Free</span>
          </div>
          <div className={styles.cartTotalItem}>
            Total Amount
            <span>$ {cartTotal}</span>
          </div>
          <button
            className={styles.cartTotalItemBtn}
            onClick={() => {
              if (products.length > 0 && checkQuantityCartValidate === true) {
                setOpenModal(true);
              }

              if (products.length > 0 && checkQuantityCartValidate === false) {
                setOpenModal(false);
                message.error(
                  "quantity of cart must be less than the total quantity available"
                );
              }
              if (products.length === 0) {
                setOpenModal(false);
                message.error("Not a product, please select a product");
              }
            }}
          >
            Buy now
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
