import React, { useContext } from "react";
import { Input, Select, Table, message } from "antd";
import type { TableColumnsType } from "antd";
import styles from "../../App.module.scss";
import myContext from "../../context/myContext";
import { Props } from "../../pages/registration/Signup";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { collection, getDocs, query, setDoc, where } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
interface DataType {
  key: number;
  name: string;
  email: string;
  uid: string;
  role: string;
  date: string;
  active: string;
}

const UserDetail: React.FC = () => {
  // my context
  const context = useContext(myContext) as Props;
  const { getAllUser } = context;

  const handleChangeRole = async (record: DataType, value: string) => {
    console.log("record", record);
    try {
      const q = query(
        collection(fireDB, "user"),
        where("uid", "==", record.uid)
      );
      const user = await getDocs(q);
      console.log("user from admin dashbroad", user);

      user.forEach((doc) => {
        if (doc.exists()) {
          const updatedUser = {
            ...doc.data(),
            role: value,
          };
          setDoc(doc.ref, updatedUser);
          message.success(`Update role to ${value} successfully`);
        }
      });
    } catch (err) {
      console.log(err);
      message.error("Change role failed");
    }
  };

  const handleChangUserActive = async (record: DataType, value: string) => {
    console.log("record", record);
    try {
      const q = query(
        collection(fireDB, "user"),
        where("uid", "==", record.uid)
      );
      const user = await getDocs(q);
      console.log("user active from admin dashbroad", user);

      user.forEach((doc) => {
        if (doc.exists()) {
          const updatedUser = {
            ...doc.data(),
            active: value,
          };
          setDoc(doc.ref, updatedUser);
          message.success(`Update active user to ${value} successfully`);
        }
      });
    } catch (err) {
      console.log(err);
      message.error("Change active user failed");
    }
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "S.No.",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
      }: FilterDropdownProps) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Search name"
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
        return record.name.toLowerCase().includes(value.toLowerCase());
      },
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
      render: (record: DataType) => {
        return (
          <div style={{ color: "red", marginLeft: 12, cursor: "pointer" }}>
            <Select
              defaultValue={record.role}
              style={{ width: 120 }}
              onChange={(value) => handleChangeRole(record, value)}
              options={[
                { value: "admin", label: "admin" },
                { value: "user", label: "user" },
              ]}
            />
          </div>
        );
      },
    },
    {
      title: "Active ",
      render: (record: DataType) => {
        return (
          <div style={{ color: "red", marginLeft: 12, cursor: "pointer" }}>
            <Select
              defaultValue={record.active}
              style={{ width: 120 }}
              onChange={(value) => handleChangUserActive(record, value)}
              options={[
                { value: "active", label: "active" },
                { value: "un active", label: "un active" },
              ]}
            />
          </div>
        );
      },
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
      active: user.active,
    };
  });
  return (
    <div className={styles.table}>
      <h2 style={{ textAlign: "center" }}> All User </h2>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default UserDetail;
