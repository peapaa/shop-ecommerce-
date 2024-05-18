import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import styles from "./UserDashboard.module.scss";
import { User } from "../registration/Login";
import { message } from "antd";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, query, collection, where, getDocs } from "firebase/firestore";
import { storage, fireDB } from "../../firebase/FirebaseConfig";

const UserDashboard = () => {
  const userString = sessionStorage.getItem("userSession");
  const user: User | null = userString ? JSON.parse(userString) : null;
  const [imageUrl, setImageUrl] = useState<string>("");
  console.log("imageUrl", imageUrl);
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

  const products = [
    {
      id: 1,
      name: "Nike Air Force 1 07 LV8",
      imageSrc:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png",
      href: "#",
      price: "₹61,999",
      color: "Orange",
      imageAlt: "Nike Air Force 1 07 LV8",
      quantity: 1,
    },
  ];

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

          <div className={styles.orderContainer}>
            <div className={styles.orderInfoLeft}>
              <div className="">
                <b>Order Id</b>
              </div>
              <div className={styles.orderInformation}>#74557994327</div>

              <div>
                <b>Date</b>
              </div>
              <div className={styles.orderInformation}>4 March, 2023</div>

              <div>
                <b>Total Amount</b>
              </div>
              <div className={styles.orderInformation}>₹84,499</div>

              <div className="">
                <b>Order Status</b>
              </div>
              <div>Confirmed</div>
            </div>

            <div className={styles.orderInfoRight}>
              {products.map((product) => (
                <div key={product.id}>
                  <div className={styles.orderProductInfo}>
                    <img
                      className={styles.orderProductImg}
                      src={product.imageSrc}
                      alt={product.imageSrc}
                    />

                    <div className={styles.orderProductDetail}>
                      <div>
                        <div className="">
                          <b>{product.name}</b>
                        </div>
                        <p>{product.color}</p>
                        <p>x {product.quantity}</p>
                      </div>
                      <div>
                        <b className={styles.orderInfoProductPrice}>
                          {product.price}
                        </b>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
