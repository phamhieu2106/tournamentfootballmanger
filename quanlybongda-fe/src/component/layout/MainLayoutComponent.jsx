import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Footer } from "antd/es/layout/layout";
import { theme } from "antd";

const { Header, Sider, Content } = Layout;

const MainLayoutComponent = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    {
      key: "0",
      icon: <UserOutlined />,
      label: <Link>User</Link>,
      children: [
        {
          key: "-1",
          label: "Đăng xuất",
        },
      ],
    },
    {
      key: "1",
      icon: <UserOutlined />,
      label: <Link to="/">Trang Chủ</Link>,
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: <Link to="/admin/tournaments">Giải Đấu</Link>,
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: <Link to="/admin/nations">Quốc Gia</Link>,
    },
    {
      key: "4",
      icon: <VideoCameraOutlined />,
      label: <Link to="/admin/coaches">Huấn Luyện Viên</Link>,
    },
    {
      key: "5",
      icon: <VideoCameraOutlined />,
      label: <Link to="/admin/teams">Đội Bóng</Link>,
    },
    {
      key: "6",
      icon: <VideoCameraOutlined />,
      label: <Link to="/admin/stadiums">Sân Vận Động</Link>,
    },
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "red",
          }}
          className="demo-logo-vertical"
        ></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Website Quản Lý Giải Đấu Bóng Đá ©{new Date().getFullYear()} Được Tạo
          Bởi Phieu2106
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayoutComponent;
