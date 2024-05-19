import { Input, Modal, Space, message } from "antd";
import { Timestamp } from "firebase/firestore";
import React from "react";
import { BuyProductOrder } from "../../pages/cart/CartPage";
import Loader from "../loader/Loader";
import { useNavigate } from "react-router-dom";
interface BuyNowModalProps {
  loading: boolean;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  addressInfo: {
    address: string;
    name: string;
    phoneNumber: string;
    time: Timestamp;
    date: string;
  };
  setAddressInfo: React.Dispatch<
    React.SetStateAction<{
      address: string;
      name: string;
      phoneNumber: string;
      time: Timestamp;
      date: string;
    }>
  >;
  buyProductsOrder: () => Promise<void>;
}

const BuyNowModal: React.FC<BuyNowModalProps> = ({
  openModal,
  setOpenModal,
  addressInfo,
  setAddressInfo,
  loading,
  buyProductsOrder,
}) => {
  console.log("addressInfo", addressInfo);
  console.log(loading);
  const navigate = useNavigate();
  return (
    <div>
      <Modal
        title="Buy Products"
        open={openModal}
        okText="Yes"
        okType="danger"
        onCancel={() => {
          setOpenModal(false);
          setAddressInfo({
            address: "",
            name: "",
            phoneNumber: "",
            time: Timestamp.now(),
            date: new Date().toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
          });
        }}
        onOk={() => {
          // call function order send order to firebase
          if (
            addressInfo.address === "" ||
            addressInfo.name === "" ||
            addressInfo.phoneNumber === ""
          ) {
            setOpenModal(true);
            message.error("please enter input filed");
          } else {
            buyProductsOrder();
            setOpenModal(false);
            setAddressInfo({
              address: "",
              name: "",
              phoneNumber: "",
              time: Timestamp.now(),
              date: new Date().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }),
            });
            navigate("/user-dashboard");
          }
        }}
      >
        {loading && <Loader />}

        <Space style={{ display: "block" }}>
          <span>Name: </span>
          <Input
            value={addressInfo.name}
            onChange={(e) => {
              setAddressInfo((pre: BuyProductOrder) => {
                return { ...pre, name: e.target.value };
              });
            }}
            placeholder="Enter your name"
          />
        </Space>
        <Space style={{ display: "block" }}>
          <span>Address: </span>
          <Input
            value={addressInfo.address}
            onChange={(e) => {
              setAddressInfo((pre: BuyProductOrder) => {
                return { ...pre, address: e.target.value };
              });
            }}
            placeholder="Enter your address"
          />
        </Space>
        <Space style={{ display: "block" }}>
          <span>Phone: </span>
          <Input
            value={addressInfo.phoneNumber}
            onChange={(e) => {
              setAddressInfo((pre: BuyProductOrder) => {
                return { ...pre, phoneNumber: e.target.value };
              });
            }}
            placeholder="Enter your phone"
          />
        </Space>
      </Modal>
    </div>
  );
};

export default BuyNowModal;
