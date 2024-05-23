import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import styles from "./UserDashboard.module.scss";
import { User } from "../registration/Login";
import { message } from "antd";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  setDoc,
  query,
  collection,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { storage, fireDB } from "../../firebase/FirebaseConfig";
import myContext from "../../context/myContext";
import { Props } from "../registration/Signup";
import { Product } from "../../components/admin/UpdateProductPage";
import { DeleteOutlined } from "@ant-design/icons";
import Loader from "../../components/loader/Loader";

const UserDashboard = () => {
  // get user information from session storage
  const userString = sessionStorage.getItem("userSession");
  const user: User | null = userString ? JSON.parse(userString) : null;

  // get getAllOrder from context
  const context = useContext(myContext) as Props;
  const { getAllOrder, setLoading, loading } = context;

  // filter products ordered
  const productOrders = getAllOrder.filter((item) => item.userId === user?.uid);
  console.log("productOrders", productOrders);

  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const q = query(
            collection(fireDB, "user"),
            where("uid", "==", user.uid)
          );
          const userDocRef = await getDocs(q);
          const userCurrent = userDocRef.docs.map((doc) => doc.data());
          console.log("data", userCurrent);
          if (userCurrent) {
            setImageUrl(userCurrent[0].avatar);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [user]);

  const handleUploadClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".png, .jpg";
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files && target.files[0];
      if (file) {
        handleUpload(file);
      }
    };
    input.click();
  };

  const handleUpload = (file: any) => {
    if (!user) return;
    const storageRef = ref(storage, `avatars/${user.uid}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error("Upload failed:", error);
        message.error("Upload failed!");
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUrl(downloadURL);
          const q = query(
            collection(fireDB, "user"),
            where("uid", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDocRef = querySnapshot.docs[0].ref;
            const userData = querySnapshot.docs[0].data();

            const updatedUserData = {
              ...userData,
              avatar: downloadURL,
            };

            await setDoc(userDocRef, updatedUserData, { merge: true });
            message.success("Upload successful!");
          }
        } catch (error) {
          console.error("Failed to update user avatar:", error);
          message.error("Failed to update user avatar!");
        }
      }
    );
  };

  // delete order
  const handleDeleteOrder = async (productID: string, orderID: string) => {
    console.log("Delete Order ID", productID);
    console.log("orderID Order ID", orderID);

    setLoading(true);
    try {
      const q = query(
        collection(fireDB, "order"),
        where("orderID", "==", orderID)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        const orderRef = doc.ref;
        const orderData = doc.data();
        console.log("Order data: ", orderData);
        if (orderData.products.length > 1) {
          const updatedOrderProducts = orderData.products.filter(
            (product: Product) => product.id !== productID
          );
          await updateDoc(orderRef, { products: updatedOrderProducts });
        } else {
          await deleteDoc(orderRef);
        }
        message.success("Delete order successfully");
      });

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      message.error(" Delete order failed");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className={styles.userContainer}>
        <div className={styles.userContainerTop}>
          <div>
            {imageUrl ? (
              <div style={{ marginTop: 16 }}>
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: 50,
                    cursor: "pointer",
                  }}
                  onClick={handleUploadClick}
                />
              </div>
            ) : null}
          </div>

          <div>
            <b>Name :</b> {user?.name}
          </div>
          <div>
            <b>Email :</b> {user?.email}
          </div>
          <div>
            <b>Date :</b> {user?.date}
          </div>
          <div>
            <b>Role :</b> {user?.role}
          </div>
          <div>
            <button className={styles.changePassword}>
              <Link to={"/change-password"}>Change Password</Link>
            </button>
          </div>
        </div>

        <div className={styles.userContainerBottom}>
          <h2 className={styles.OrderTitle}>Order Details</h2>
          {loading && <Loader />}
          {productOrders.map((orders) => {
            const { status, orderID, date } = orders;
            return orders.products.map((product: Product) => {
              const productID = product.id;
              return (
                <div className={styles.orderContainer} key={product.id}>
                  <div className={styles.orderInfoLeft}>
                    <div className="">
                      <b>Order Id</b>
                    </div>
                    <div className={styles.orderInformation}>{orderID}</div>

                    <div>
                      <b>Date</b>
                    </div>
                    <div className={styles.orderInformation}>{date}</div>

                    <div>
                      <b>Total Price</b>
                    </div>
                    <div className={styles.orderInformation}>
                      ${parseInt(product.price) * product.quantity}
                    </div>

                    <div className="">
                      <b>Order Status</b>
                    </div>
                    <div>{status}</div>
                  </div>

                  <div className={styles.orderInfoRight}>
                    <div>
                      <div className={styles.orderProductInfo}>
                        <img
                          className={styles.orderProductImg}
                          src={product.productImageUrl}
                          alt={product.title}
                        />

                        <div className={styles.orderProductDetail}>
                          <div>
                            <div className="">
                              <b>{product.title}</b>
                            </div>
                            <p>x {product.quantity}</p>
                            <b className={styles.orderInfoProductPrice}>
                              Price: ${product.price}
                            </b>
                          </div>
                          <div className={styles.deleteOrderIcon}>
                            <DeleteOutlined
                              onClick={() => {
                                if (productID) {
                                  handleDeleteOrder(productID, orderID);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            });
          })}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
