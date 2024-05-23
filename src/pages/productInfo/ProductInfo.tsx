import { Button, Card, Rate, Skeleton } from "antd";
import Layout from "../../components/layout/Layout";
import styles from "./ProductInfo.module.scss";
import { useCallback, useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { Props } from "../registration/Signup";
import Loader from "../../components/loader/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { Product } from "../../components/admin/UpdateProductPage";
import { User } from "../registration/Login";
import { addProductToCarts, useAppDispatch } from "../../redux/cartSlice";

const ProductInfo = () => {
  const { Meta } = Card;
  // context
  const context = useContext(myContext) as Props;
  const { loading, setLoading, getAllProduct } = context;
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
    totalQuantity: 1,
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
        totalQuantity: product?.totalQuantity,
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

  const categoryProductCurrent = product.category;
  const idProductCurrent = product.id;

  console.log("category", categoryProductCurrent);
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
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.productContainer}>
          <div className={styles.productDetails}>
            <img
              src={product.productImageUrl}
              className={styles.productImg}
              alt="productImg"
            />
            <div className={styles.productInfo}>
              <h2 className={styles.productTitle}>{product.title}</h2>

              <Rate allowClear style={{ margin: "0px 10px" }} />
              <h2 className={styles.productTitle}>Price: {product.price}$</h2>
              <h2 className={styles.productTitle}>
                Remaining quantity: {product.totalQuantity}
              </h2>

              <div>
                <h2 className={styles.productDescTitle}>Description:</h2>
                <p className={styles.productDesc}>{product.description}</p>
              </div>
              {user && user?.role === "user" ? (
                <div style={{ textAlign: "center" }}>
                  <Button
                    className={styles.productAddCartBtn}
                    onClick={() => addCart(product)}
                    loading={loadingAddCart[id ?? ""]}
                  >
                    Add To Cart
                  </Button>
                  <Button className={styles.productAddCartBtn}>
                    <Link to={"/cart"}>Buy Now</Link>
                  </Button>
                </div>
              ) : (
                <Button className={styles.productAddCartBtn} disabled>
                  Add To Cart
                </Button>
              )}
            </div>
          </div>
          <div>
            <h2 className={styles.OtherProduct}>Products of the same type: </h2>
            <section className={styles.product__card__container}>
              {getAllProduct
                .filter(
                  (product) =>
                    product.category === categoryProductCurrent &&
                    product.id !== idProductCurrent
                )
                .slice(0, 3)
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
        </div>
      )}
    </Layout>
  );
};

export default ProductInfo;
