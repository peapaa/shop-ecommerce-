import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import styles from "./Register.module.scss";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Props } from "./Signup";

export interface User {
  name: string;
  email: string;
  uid: string;
  role: string;
  time: Date;
  date: string;
}

interface UserLogin {
  email: string;
  password: string;
}

const Login = () => {
  const context = useContext(myContext) as Props;
  const { loading, setLoading } = context;
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState<UserLogin>({
    email: "",
    password: "",
  });
  console.log("userLogin", userLogin);
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
        console.log("q", q);

        const data = onSnapshot(q, (QuerySnapshot) => {
          let user: User | null = null;
          QuerySnapshot.forEach((doc) => (user = doc.data() as User));
          if (user !== null) {
            localStorage.setItem("user", JSON.stringify(user));
          }
          setUserLogin({
            email: "",
            password: "",
          });
          message.success("Login successful");
          setLoading(false);
          // if (user && user?.role === "user") {
          //   navigate("/user-dashboard");
          // } else {
          //   navigate("/admin-dashboard");
          // }
          navigate("/");
          console.log("QuerySnapshot", QuerySnapshot);
        });

        return () => data;
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <div className={styles.regiterContainer}>
      <h2 className={styles.regiterTitle}>Login</h2>
      {loading && <Loader />}
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        // wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={userLoginFunction}
        //   initialValues={initialValues}
        // onFinishFailed={onFinishFailed}
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
        <p className={styles.regiterText}>
          Don't have an account <Link to={"/signup"}>SignUp</Link>
        </p>
      </Form>
    </div>
  );
};

export default Login;
