import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Divider, Form, Input, notification } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authentication } from "../../../api/UserAPI";
import Cookies from "js-cookie";

export const LoginPageComponent = () => {
  const [form] = Form.useForm();
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (values) => {
    if (values === "error") {
      api["error"]({
        message: "Đăng nhập không thành công",
        description: "Tài khoản không đúng hoặc không tồn tại trong hệ thống!",
      });
    } else {
      api["success"]({
        message: "Đăng nhập thành công",
        description: "Đăng nhập thành công!",
      });
    }
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    if (handleLogin(values)) {
      form.resetFields();
    }
  };

  const handleRememberUser = (values) => {
    if (values) {
      localStorage.setItem("username", values.username);
      localStorage.setItem("password", values.password);
    } else {
      // Nếu không ghi nhớ, xóa thông tin khỏi localStorage
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }
  };

  const handleLogin = async (values) => {
    try {
      const result = await authentication(values);
      if (result) {
        setToken(result);
        openNotificationWithIcon("success");
        if (values.remember) {
          handleRememberUser(values);
        } else {
          localStorage.removeItem("username");
          localStorage.removeItem("password");
        }
        navigate("/admin");
        return true;
      } else {
        openNotificationWithIcon("error");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // useEffect
  useEffect(() => {
    if (token) {
      // set Cookies expires in 1 day
      Cookies.set("token", token, { expires: 1 });
    }
  }, [token]);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    if (savedUsername && savedPassword) {
      form.setFieldsValue({
        username: savedUsername,
        password: savedPassword,
        remember: true,
      });
    }
  }, [form]);

  return (
    <>
      <Divider style={{ fontWeight: "bolder", fontSize: 40 }}>
        Đăng Nhập
      </Divider>
      {contextHolder}
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
