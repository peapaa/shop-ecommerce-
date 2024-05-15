import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import styles from "../../App.module.scss";
import { useContext } from "react";
import myContext from "../../context/myContext";
import { Props } from "../registration/Signup";
import { Product } from "../../components/admin/UpdateProductPage";
import Loader from "../../components/loader/Loader";

const CategoryPage = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  console.log(categoryName);
  // context
  const context = useContext(myContext) as Props;
  const { getAllProduct, loading } = context;
  let productCategory: Product[] = [];
  if (typeof categoryName === "string") {
    productCategory = getAllProduct.filter((product) =>
      product.category.includes(categoryName)
    );
  }
  console.log(productCategory);
  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1 style={{ textAlign: "center" }}>{categoryName}</h1>
          <div className={styles.product__card__container}>
            {productCategory.length > 0 ? (
              <>
                {productCategory.map((item, index) => {
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
              </>
            ) : (
              <>No product</>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CategoryPage;
