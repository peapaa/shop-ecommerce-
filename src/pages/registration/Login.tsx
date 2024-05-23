import _debounce from "lodash/debounce";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import styles from "./Register.module.scss";
import { useCallback, useContext, useState } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Props } from "./Signup";
import { getProductCarts, useAppDispatch } from "../../redux/cartSlice";

export interface User {
  name: string;
  email: string;
  uid: string;
  role: string;
  time: Date;
  date: string;
  expiration: number;
  avatar?: string;
  active: string;
}

interface UserLogin {
  email: string;
  password: string;
}

const Login = () => {
  const context = useContext(myContext) as Props;
  const { loading, setLoading } = context;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const userLoginFunction = async () => {
    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );
      console.log("user", users.user);
      try {
        const q = query(
          collection(fireDB, "user"),
          where("uid", "==", users.user.uid)
        );

        const data = onSnapshot(q, (QuerySnapshot) => {
          let user: User | null = null;
          QuerySnapshot.forEach((doc) => {
            user = doc.data() as User;
            return (user = {
              ...user,
              expiration: new Date().getTime() + 24 * 60 * 60 * 1000, // expiration 24 hours 24 * 60 * 60 * 1000
            });
          });
          console.log("user check active", user);
          // console.log("user check active", user?.avatar);
          if (user) {
            // Save user on session storage
            sessionStorage.setItem("userSession", JSON.stringify(user));
            const userString = sessionStorage.getItem("userSession");
            const userCurrent: User | null = userString
              ? JSON.parse(userString)
              : null;

            if (userCurrent?.active === "active") {
              setUserLogin({
                email: "",
                password: "",
              });
              message.success("Login successful");
              setLoading(false);
              // Dispatch function get data from firebase
              dispatch(getProductCarts());
              navigate("/");
            } else {
              sessionStorage.removeItem("userSession");
              message.error("Your account is not active");
              setLoading(false);
            }
          } else {
            message.error("User not found.");
            setLoading(false);
          }
        });

        return () => data;
      } catch (err) {
        console.log(err);
        setLoading(false);
        message.error("Login failed, please try again");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      message.error("Wrong email or password, please try again.");
    }
    setLoading(false);
  };

  // hạn chế việc call api login 1s 1 lần
  const debouncedLogin = useCallback(_debounce(userLoginFunction, 1000), [
    userLogin,
  ]);
  return (
    <div className={styles.regiterContainer}>
      <h2 className={styles.regiterTitle}>Login</h2>
      {loading && <Loader />}
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        style={{ maxWidth: 600 }}
        onFinish={debouncedLogin}
        autoComplete="off"
        className={styles.regiterForm}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            {
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Invalid email",
            },
          ]}
        >
          <Input
            placeholder="Email Address"
            value={userLogin.email}
            onChange={(e) => {
              setUserLogin({ ...userLogin, email: e.target.value.trim() });
            }}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            placeholder="Password"
            value={userLogin.password}
            onChange={(e) => {
              setUserLogin({ ...userLogin, password: e.target.value });
            }}
          />
        </Form.Item>
        <div className={styles.regiterBtn}>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.regiterBtnSubmit}
          >
            Submit
          </Button>
        </div>
        <div className={styles.regiterText}>
          <div style={{ margin: "12px 0px  12px 0px" }}>
            <Link to={"/reset-password"}>Forgot password</Link>
          </div>
          <div style={{ margin: "0px 0px  12px 0px" }}>
            Don't have an account <Link to={"/signup"}>SignUp</Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;
