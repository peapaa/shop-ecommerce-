import { Button, Form, FormProps, Input, Select, message } from "antd";
import styles from "../../pages/registration/Register.module.scss";
import { useCallback, useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { Props } from "../../pages/registration/Signup";
import Loader from "../loader/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

export interface Product {
  title: string;
  price: string;
  productImageUrl: string;
  category: string;
  description: string;
  quantity: number;
  date: string;
  id?: string;
  uid?: string;
  totalQuantity: number;
}
const UpdateProductPage = () => {
  // context
  const context = useContext(myContext) as Props;
  const { loading, setLoading } = context;
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [form] = Form.useForm();

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
  console.log("product", product);
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

  // get single product
  const getSingleProduct = useCallback(async () => {
    if (!id) {
      console.error("ID is not defined");
      return;
    }
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      const product = productTemp.data();
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
        totalQuantity: product?.totalQuantity,
      });

      form.setFieldsValue({
        title: product?.title,
        price: product?.price,
        imgUrl: product?.productImageUrl,
        typeFashion: product?.category,
        description: product?.description,
        totalQuantity: product?.totalQuantity,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [id, setLoading, form, navigate]);
  // add product function
  const updateProduct: FormProps<FieldType>["onFinish"] = async () => {
    if (!id) {
      console.error("ID is not defined");
      return;
    }
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", id), product);
      message.success("update product successfully");
      // getAllProduct();
      setLoading(false);
      navigate("/admin-dashboard");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // run getSingleProduct();
  useEffect(() => {
    if (id) {
      getSingleProduct();
    }
  }, [id, getSingleProduct]);

  const onSubmitAddProductFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.updateProductContainer}>
      {loading && <Loader />}
      <h2 className={styles.regiterTitle}>Update Product</h2>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 5 }}
        style={{ maxWidth: 600 }}
        onFinish={updateProduct}
        onFinishFailed={onSubmitAddProductFailed}
        autoComplete="off"
        className={styles.regiterForm}
        initialValues={{
          title: product.title,
          price: product.price,
          imgUrl: product.productImageUrl,
          typeFashion: product.category,
          description: product.description,
          totalQuantity: product.totalQuantity,
        }}
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
            Update Product
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

export default UpdateProductPage;
