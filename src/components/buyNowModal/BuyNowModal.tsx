import { Input, Modal, Space, message } from "antd";
import { Timestamp } from "firebase/firestore";
import React from "react";
import { BuyProductOrder } from "../../pages/cart/CartPage";
import Loader from "../loader/Loader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  ProductCart,
  deleteProductFromCart,
  useAppDispatch,
} from "../../redux/cartSlice";
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
  getAllProductsAfterBuy: () => void;
}

const BuyNowModal: React.FC<BuyNowModalProps> = ({
  openModal,
  setOpenModal,
  addressInfo,
  setAddressInfo,
  loading,
  buyProductsOrder,
  getAllProductsAfterBuy,
}) => {
  console.log("addressInfo", addressInfo);
  console.log(loading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const products = useSelector((state: RootState) => state.cart);
  console.log("products from call buy modal", products);
  const clearCartAfterBuy = (products: ProductCart[]) => {
    if (products.length >= 1) {
      products.forEach((product) => {
        dispatch(deleteProductFromCart(product));
      });
    }
  };
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
            clearCartAfterBuy(products);
            getAllProductsAfterBuy();
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
