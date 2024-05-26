import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Divider, Form, Input, message } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authentication } from "../../../api/UserAPI";

export const LoginPageComponent = () => {
  const [form] = Form.useForm();
  const [token, setToken] = useState(null);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    if (handleLogin(values)) {
      form.resetFields();
    }
  };

  const handleLogin = async (values) => {
    try {
      const result = await authentication(values);
      if (result) {
        setToken(result);
        message.success("Đăng nhập thành công!");
        return true;
      }
    } catch (error) {
      console.error(error);
      message.error("Error when trying login:", error);
      return false;
    }
  };
  return (
    <>
      <Divider style={{ fontWeight: "bolder", fontSize: 40 }}>
        Đăng Nhập
      </Divider>
      <Form
        form={form}
        style={{
          maxWidth: "300px",
          margin: "auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Link to={"/forgotpassword"}>Forgot password</Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
