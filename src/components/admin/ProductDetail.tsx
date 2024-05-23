import React, { useContext } from "react";
import { Table, Input, message } from "antd";
import type { TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import styles from "../../App.module.scss";
import myContext from "../../context/myContext";
import { Props } from "../../pages/registration/Signup";
import Loader from "../loader/Loader";
import { fireDB } from "../../firebase/FirebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import { FilterDropdownProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";

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
  totalQuantity: number;
}

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
    setLoading(false);
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
      totalQuantity: product.totalQuantity,
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
    },
    {
      title: "Product Category",
      dataIndex: "category",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
      }: FilterDropdownProps) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Search category"
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
              style={{ width: 140 }}
            ></Input>
          </>
        );
      },
      filterSearch: true,
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value: any, record: DataType) => {
        return record.category.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Product Price",
      dataIndex: "price",
      render: (price) => <>${price}</>,
      sorter: (a: DataType, b: DataType) => a.price - b.price,
    },
    {
      title: "Total Product",
      dataIndex: "totalQuantity",
      render: (totalQuantity) => <>{totalQuantity}</>,
      sorter: (a: DataType, b: DataType) => a.totalQuantity - b.totalQuantity,
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
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ProductDetail;
