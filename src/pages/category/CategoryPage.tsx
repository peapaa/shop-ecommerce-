import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Button, Card, Skeleton } from "antd";
import Meta from "antd/es/card/Meta";
import styles from "../../App.module.scss";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { Props } from "../registration/Signup";
import { Product } from "../../components/admin/UpdateProductPage";
import Loader from "../../components/loader/Loader";
import { User } from "../registration/Login";
import { addProductToCarts, useAppDispatch } from "../../redux/cartSlice";

const CategoryPage = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  console.log(categoryName);
  const dispatch = useAppDispatch();

  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  // context
  const context = useContext(myContext) as Props;
  const { getAllProduct, loading, setLoading } = context;

  let productCategory: Product[] = [];
  if (typeof categoryName === "string") {
    productCategory = getAllProduct.filter((product) =>
      product.category.includes(categoryName)
    );
  }
  console.log(productCategory);
  const productForCategoryBoolean = productCategory.length > 0;

  useEffect(() => {
    if (getAllProduct.length > 0) {
      setIsDataLoaded(true);
    } else {
      setLoading(true);
      setTimeout(() => {
        setIsDataLoaded(true);
        setLoading(false);
      }, 1000);
    }
  }, [getAllProduct, setLoading]);
  // get user from session storge
  const userString = sessionStorage.getItem("userSession");
  const user: User | null = userString ? JSON.parse(userString) : null;

  const [loadingAddCart, setLoadingAddCart] = useState<{
    [key: string]: boolean;
  }>({});

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
        <div>
          <h1 style={{ textAlign: "center" }}>{categoryName}</h1>
          <div className={styles.product__card__container}>
            {isDataLoaded && productForCategoryBoolean ? (
              <>
                {productCategory.map((item, index) => {
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
              </>
            ) : (
              isDataLoaded && <>No product</>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CategoryPage;
