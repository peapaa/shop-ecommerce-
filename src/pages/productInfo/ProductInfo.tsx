import { Button, Rate } from "antd";
import Layout from "../../components/layout/Layout";
import styles from "./ProductInfo.module.scss";
import { useCallback, useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { Props } from "../registration/Signup";
import Loader from "../../components/loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { Product } from "../../components/admin/UpdateProductPage";
import { User } from "../registration/Login";
import { addProductToCarts, useAppDispatch } from "../../redux/cartSlice";

const ProductInfo = () => {
  // context
  const context = useContext(myContext) as Props;
  const { loading, setLoading } = context;
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // get user from session storge
  const userString = sessionStorage.getItem("userSession");
  const user: User | null = userString ? JSON.parse(userString) : null;

  const [loadingAddCart, setLoadingAddCart] = useState<{
    [key: string]: boolean;
  }>({});

  // product state
  const [product, setProduct] = useState<Product>({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    quantity: 1,
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    id: "",
  });
  // get product info
  const getProductInfo = useCallback(async () => {
    if (!id) {
      console.error("ID is not defined");
      return;
    }
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      const product = productTemp.data();
      console.log(product);
      if (!product) {
        return navigate("/nopage");
      }
      setProduct({
        title: product?.title,
        price: product?.price,
        productImageUrl: product?.productImageUrl,
        category: product?.category,
        description: product?.description,
        quantity: product?.quantity,
        date: product?.date,
        id: productTemp?.id, // id of the product from firebase
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [id, setLoading, navigate]);

  useEffect(() => {
    if (id) {
      getProductInfo();
    }
  }, [id, getProductInfo]);
  console.log("product", product);
  // dispatch actions add to cart
  const addCart = async (item: Product) => {
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
    <Layout>
      <div className={styles.productContainer}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <img
              src={product.productImageUrl}
              className={styles.productImg}
              alt="productImg"
            />
            <div className={styles.productInfo}>
              <h2 className={styles.productTitle}>{product.title}</h2>

              <Rate allowClear />
              <h2 className={styles.productTitle}>{product.price}$</h2>

              <div>
                <h2 className="">Description:</h2>
                <p className={styles.productDesc}>{product.description}</p>
              </div>
              {user && user?.role === "user" ? (
                <Button
                  className={styles.productAddCartBtn}
                  onClick={() => addCart(product)}
                  loading={loadingAddCart[id ?? ""]}
                >
                  Add To Cart
                </Button>
              ) : (
                <Button className={styles.productAddCartBtn} disabled>
                  Add To Cart
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProductInfo;
