import { RollbackOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Tooltip } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export const ChangePasswordPageComponent = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <>
      <Divider style={{ fontWeight: "bolder", fontSize: 40 }}>
        Thay Đổi Mật Khẩu
      </Divider>
      <Form
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
        <Form.Item style={{ display: "flex", justifyContent: "end" }}>
          <Link to={"/login"}>
            <Tooltip title="Quay lại">
              <Button
                type="primary"
                shape="circle"
                icon={<RollbackOutlined />}
              ></Button>
            </Tooltip>
          </Link>
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPasssword"
          rules={[
            {
              required: true,
              message: "New Password is required!",
            },
          ]}
        >
          <Input.Password
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="New password"
          />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPasssword"
          rules={[
            {
              required: true,
              message: "Confirm Password is required!",
            },
          ]}
        >
          <Input.Password
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Confirm new password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
          >
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
