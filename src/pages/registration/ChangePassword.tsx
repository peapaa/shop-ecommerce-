import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import styles from "./Register.module.scss";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { auth } from "../../firebase/FirebaseConfig";
import { Props } from "./Signup";
import { updatePassword } from "firebase/auth";

export interface User {
  name: string;
  email: string;
  uid: string;
  role: string;
  time: Date;
  date: string;
}

interface NewPassword {
  password: string;
}

const ChangePassword = () => {
  const context = useContext(myContext) as Props;
  const { loading, setLoading } = context;
  const navigate = useNavigate();
  const [password, setPassword] = useState<NewPassword>({
    password: "",
  });

  const userChangePassword = async () => {
    setLoading(true);
    const users = auth.currentUser;
    if (users) {
      try {
        console.log("users", users);
        await updatePassword(users, password.password);
        message.success("Password updated successfully");

        setPassword({
          password: "",
        });

        setLoading(false);
        navigate("/");
      } catch (err) {
        console.log(err);
        setLoading(false);
        message.error("change password failed, please try again");
      }
    }
  };

  return (
    <div className={styles.changePasswordContainer}>
      <h2 className={styles.regiterTitle}>Change Password</h2>
      {loading && <Loader />}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        style={{ maxWidth: 600 }}
        onFinish={userChangePassword}
        autoComplete="off"
        className={styles.regiterForm}
      >
        <Form.Item
          label="New Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters long!" },
          ]}
        >
          <Input.Password
            placeholder="Password"
            value={password.password}
            onChange={(e) => {
              setPassword({ password: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <div className={styles.regiterBtn} style={{ paddingBottom: 10 }}>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.regiterBtnSubmit}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChangePassword;
