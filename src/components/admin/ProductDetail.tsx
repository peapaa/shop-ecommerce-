import React, { useContext } from "react";
import { Table, message } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { Link } from "react-router-dom";
import styles from "../../App.module.scss";
import myContext from "../../context/myContext";
import { Props } from "../../pages/registration/Signup";
import Loader from "../loader/Loader";
import { fireDB } from "../../firebase/FirebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";

interface DataType {
  key?: number;
  title: string;
  category: string;
  date: string;
  description: string;
  id: string;
  price: number;
  productImageUrl: string;
  quantity: string | number;
  time: any;
}

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const ProductDetail: React.FC = () => {
  const context = useContext(myContext) as Props;
  const { loading, setLoading, getAllProduct, getAllProductFunction } = context;
  console.log(getAllProduct);

  // delete product
  const deleteProduct = async (id: string) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", id));
      getAllProductFunction();
      message.success("Product deleted successfully");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // data table
  const data: DataType[] = getAllProduct.map((product, index) => {
    return {
      key: index,
      title: product.title,
      category: product.category,
      date: product.date,
      description: product.description,
      id: product.id as string,
      price: parseInt(product.price),
      productImageUrl: product.productImageUrl,
      quantity: product.quantity,
      time: product.time,
    };
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "S.No.",
      dataIndex: "key",
    },
    {
      title: "Product Image",
      dataIndex: "productImageUrl",
      render: (productImageUrl) => (
        <img
          src={productImageUrl}
          style={{ width: 60, objectFit: "contain" }}
          alt="productImageUrl"
        />
      ),
    },
    {
      title: "Product Title",
      dataIndex: "title",
      filterSearch: true,
      onFilter: (value, record: DataType) =>
        record.title.startsWith(value as string),
    },
    {
      title: "Product Category",
      dataIndex: "category",
      filterSearch: true,
      onFilter: (value, record: DataType) =>
        record.category.startsWith(value as string),
    },
    {
      title: "Product Price",
      dataIndex: "price",
      sorter: (a: DataType, b: DataType) => a.price - b.price,
    },
    {
      title: "Product Date",
      dataIndex: "date",
      sorter: (a: DataType, b: DataType) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateA.getTime() - dateB.getTime();
      },
    },
    {
      title: "Actions",
      render: (record: DataType) => {
        return (
          <Link to={`/updateproduct/${record.id}`}>
            <div style={{ color: "red", marginLeft: 12, cursor: "pointer" }}>
              Edit
            </div>
          </Link>
        );
      },
    },
    {
      title: "Actions",
      render: (record: DataType) => {
        return (
          <div
            style={{ color: "red", marginLeft: 12, cursor: "pointer" }}
            onClick={() => deleteProduct(record.id)}
          >
            Delete
          </div>
        );
      },
    },
  ];
  return (
    <div className={styles.table}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <h2>All product</h2>
        {loading && <Loader />}
        <Link to={"/addproduct"}>
          <button className={styles.product__card__itemBtn}>Add Product</button>
        </Link>
      </div>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
};

export default ProductDetail;
