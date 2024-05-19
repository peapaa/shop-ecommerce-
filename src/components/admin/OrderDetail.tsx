import React, { useContext } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import styles from "../../App.module.scss";
import myContext from "../../context/myContext";
import { Props } from "../../pages/registration/Signup";
import { Product } from "./UpdateProductPage";
import Loader from "../loader/Loader";

export interface DataType {
  key: number;
  orderId: string;
  totalPrice: number;
  status: string;
  userName: string;
  userAddress: string;
  title: string;
  category: string;
  id: string;
  price: number;
  productImageUrl: string;
  quantity: number;
}

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const OrderDetail: React.FC = () => {
  const context = useContext(myContext) as Props;
  const { loading, getAllOrder } = context;
  console.log("getAllOrder", getAllOrder);

  // data table
  let counter = 0;
  const datas: DataType[] = getAllOrder.map((orders) => {
    const { status } = orders;
    const address = orders.addressInfo.address;
    const name = orders.addressInfo.name;
    return orders.products.map((product: Product) => {
      return {
        key: counter++,
        orderId: product.id,
        totalPrice: product.quantity * parseInt(product.price),
        title: product.title,
        category: product.category,
        status: status,
        address: address,
        name: name,
        price: parseInt(product.price),
        productImageUrl: product.productImageUrl,
        quantity: product.quantity,
      };
    });
  });
  const data: DataType[] = datas.flat(Infinity);
  console.log("data", data);

  // delete product
  // const deleteOderProduct = (orderId: string) => {

  // };

  // columns create
  const columns: TableColumnsType<DataType> = [
    {
      title: "S.No.",
      dataIndex: "key",
    },
    {
      title: "Order Id",
      dataIndex: "orderId",
    },
    {
      title: "Image",
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
      title: " Title",
      dataIndex: "title",
      filterSearch: true,
      onFilter: (value, record: DataType) =>
        record.title.startsWith(value as string),
    },
    {
      title: "Category",
      dataIndex: "category",
      filterSearch: true,
      onFilter: (value, record: DataType) =>
        record.category.startsWith(value as string),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => <>${price}</>,
      sorter: (a: DataType, b: DataType) => a.price - b.price,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      render: (totalPrice) => <>${totalPrice}</>,
      sorter: (a: DataType, b: DataType) => a.totalPrice - b.totalPrice,
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];
  return (
    <div className={styles.table}>
      <div>
        <h2 style={{ textAlign: "center" }}>All Orders </h2>
        {loading && <Loader />}
      </div>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
};

export default OrderDetail;
