/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import styles from "./Register.module.scss";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";

export interface Props {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const Login = () => {
  const context = useContext(myContext) as Props;
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  // user signup state
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  console.log(userSignup);

  // user sign up function
  const userSignupFunction = async () => {
    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );
      console.log(users);
      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };
      console.log(user);
      const userRefrence = collection(fireDB, "user");
      addDoc(userRefrence, user);
      setUserSignup({
        name: "",
        email: "",
        password: "",
        role: "user",
      });
      message.success("Signup Successfully");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // userSignupFunction();
  return (
    <div className={styles.regiterContainer}>
      <h2 className={styles.regiterTitle}>Sign Up</h2>
      {loading && <Loader />}
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        // wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={userSignupFunction}
        //   initialValues={initialValues}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={styles.regiterForm}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            placeholder="Username"
            value={userSignup.name}
            onChange={(e) => {
              setUserSignup({ ...userSignup, name: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email" },
          ]}
        >
          <Input
            placeholder="Email address"
            value={userSignup.email}
            onChange={(e) => {
              setUserSignup({ ...userSignup, email: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters long!" },
          ]}
        >
          <Input.Password
            placeholder="Password"
            value={userSignup.password}
            onChange={(e) => {
              setUserSignup({ ...userSignup, password: e.target.value });
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
          Have an account <Link to={"/login"}>Login</Link>
        </p>
      </Form>
    </div>
  );
};

export default Login;
