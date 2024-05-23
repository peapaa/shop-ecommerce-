import { Button, Form, FormProps, Input, Select, message } from "antd";
import styles from "../../pages/registration/Register.module.scss";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { Props } from "../../pages/registration/Signup";
import Loader from "../loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
export interface Product {
  title: string;
  price: string;
  productImageUrl: string;
  category: string;
  description: string;
  totalQuantity: number;
  quantity: number;
  date: string;
  id?: string;
}
const AddProductPage = () => {
  // context
  const context = useContext(myContext) as Props;
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  //  product
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
  });
  console.log(product);
  // type form add product
  type FieldType = {
    title?: string;
    price?: string;
    imgUrl?: string;
    typeFashion?: string;
    description?: string;
    totalQuantity?: number;
  };
  const handleChosenFashion = (value: string) => {
    setProduct({ ...product, category: value.trim() });
  };

  // add product function
  const onSubmitAddProduct: FormProps<FieldType>["onFinish"] = async () => {
    setLoading(true);
    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, product);
      message.success("added product successfully");
      setLoading(false);
      navigate("/admin-dashboard");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const onSubmitAddProductFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={styles.updateProductContainer}>
      <h2 className={styles.regiterTitle}>Add Product</h2>
      {loading && <Loader />}
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        style={{ maxWidth: 600 }}
        onFinish={onSubmitAddProduct}
        onFinishFailed={onSubmitAddProductFailed}
        autoComplete="off"
        className={styles.regiterForm}
      >
        <Form.Item<FieldType>
          name="title"
          label="Title"
          rules={[
            { required: true, message: "Please input your username!" },
            {
              max: 50,
              message: "Username cannot be longer than 50 characters!",
            },
          ]}
        >
          <Input
            placeholder="Product Title"
            value={product.title}
            onChange={(e) => {
              setProduct({
                ...product,
                title: e.target.value.trim(),
              });
            }}
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please input your price!" }]}
        >
          <Input
            placeholder="Product Price"
            value={product.price}
            onChange={(e) => {
              setProduct({
                ...product,
                price: e.target.value.trim(),
              });
            }}
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="imgUrl"
          label="Url image"
          rules={[{ required: true, message: "Please input your imgUrl!" }]}
        >
          <Input
            placeholder="Product Image Url"
            value={product.productImageUrl}
            onChange={(e) => {
              setProduct({
                ...product,
                productImageUrl: e.target.value.trim(),
              });
            }}
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="totalQuantity"
          label="Total Quantity"
          rules={[{ required: true, message: "Please input your quantity!" }]}
        >
          <Input
            placeholder="Product quantity"
            value={product.totalQuantity}
            onChange={(e) => {
              setProduct({
                ...product,
                totalQuantity: parseInt(e.target.value.trim(), 10),
              });
            }}
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="typeFashion"
          label="Category"
          rules={[
            { required: true, message: "Please input your type of product!" },
          ]}
        >
          <Select
            placeholder="Select Option "
            style={{ width: "100%" }}
            value={product.category}
            onChange={handleChosenFashion}
            options={[
              { value: "fashion", label: "fashion" },
              { value: "shirt", label: "shirt" },
              { value: "jacket", label: "jacket" },
              { value: "mobile", label: "mobile" },
              { value: "laptop", label: "laptop" },
              { value: "shoes", label: "shoes" },
              { value: "home", label: "home" },
              { value: "books", label: "books" },
            ]}
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please input your description!" },
            {
              min: 4,
              message: "Description must be at least 4 characters long!",
            },
            {
              max: 1000,
              message: "Username cannot be longer than 1000 characters!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Product description"
            rows={4}
            maxLength={1000}
            value={product.description}
            onChange={(e) => {
              setProduct({
                ...product,
                description: e.target.value.trim(),
              });
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.regiterBtnSubmit}
            style={{ display: "block", margin: "auto" }}
          >
            Add Product
          </Button>
          <Button
            className={styles.regiterBtnSubmit}
            style={{ display: "block", margin: "auto", marginTop: 12 }}
          >
            <Link to={"/admin-dashboard"}>Cancel</Link>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProductPage;
