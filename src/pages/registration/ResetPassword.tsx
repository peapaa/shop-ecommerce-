import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import styles from "./Register.module.scss";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";

import { Props } from "./Signup";

export interface User {
  name: string;
  email: string;
  uid: string;
  role: string;
  time: Date;
  date: string;
}

interface Email {
  email: string;
}

const ResetPassword = () => {
  const context = useContext(myContext) as Props;
  const { loading, setLoading } = context;
  const navigate = useNavigate();
  const [email, setEmail] = useState<Email>({
    email: "",
  });
  console.log("email", email);
  const ResetPasswordWithEmail = async () => {
    setLoading(true);
    try {
      if (typeof email.email === "string") {
        await sendPasswordResetEmail(auth, email.email);
      } else {
        message.error("Please enter a valid email address.");
        setLoading(false);
      }

      message.success("Forgot password successful");
      setLoading(false);

      navigate("/reset-password-finsh");
    } catch (err) {
      console.log(err);
      setLoading(false);
      message.error("Reset password failed");
    }
  };
  return (
    <div className={styles.regiterContainer}>
      <h2 className={styles.regiterTitle}>Login</h2>
      {loading && <Loader />}
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        style={{ maxWidth: 600 }}
        onFinish={ResetPasswordWithEmail}
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
            value={email.email}
            onChange={(e) => {
              setEmail({ email: e.target.value.trim() });
            }}
          />
        </Form.Item>

        <div className={styles.regiterBtn}>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.regiterBtnSubmit}
          >
            Reset password
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ResetPassword;
