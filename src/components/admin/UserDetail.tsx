import React, { useContext } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import styles from "../../App.module.scss";
import myContext from "../../context/myContext";
import { Props } from "../../pages/registration/Signup";

interface DataType {
  key: number;
  name: string;
  email: string;
  uid: string;
  role: string;
  date: string;
}

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const UserDetail: React.FC = () => {
  // my context
  const context = useContext(myContext) as Props;
  const { getAllUser } = context;

  const columns: TableColumnsType<DataType> = [
    {
      title: "S.No.",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Uid",
      dataIndex: "uid",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
  ];

  const data: DataType[] = getAllUser.map((user, index: number) => {
    return {
      key: index,
      name: user.name,
      email: user.email,
      uid: user.uid,
      role: user.role,
      date: user.date,
    };
  });
  return (
    <div className={styles.table}>
      <h2 style={{ textAlign: "center" }}> All User </h2>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
};

export default UserDetail;
