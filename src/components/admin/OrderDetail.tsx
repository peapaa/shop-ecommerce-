import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import styles from "../../App.module.scss";
interface DataType {
  key: React.Key;
  name: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "S.No.",
    dataIndex: "key",
  },
  {
    title: "Location Name",
    dataIndex: "name",
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value as string),
    width: "30%",
  },
  {
    title: "Actions",
    render: (record: DataType) => {
      return <div style={{ color: "red", marginLeft: 12 }}>Edit</div>;
    },
  },
  {
    title: "Actions",
    render: (record: DataType) => {
      return <div style={{ color: "red", marginLeft: 12 }}>Delete</div>;
    },
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
  },
  {
    key: "2",
    name: "Jim Green",
  },
  {
    key: "3",
    name: "Joe Black",
  },
  {
    key: "4",
    name: "Jim Red",
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const OrderDetail: React.FC = () => (
  <div className={styles.table}>
    <h2>Order detail</h2>
    <Table columns={columns} dataSource={data} onChange={onChange} />
  </div>
);

export default OrderDetail;
